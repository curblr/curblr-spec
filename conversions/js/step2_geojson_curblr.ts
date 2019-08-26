import * as fs from "fs";

import * as curblr from './curblr'
import { CurbFeature, Location, Regulation, Rule, UserClass, TimeSpan, TimesOfDay, DaysOfWeek, Payment, Rates, CurbProperties } from "./curblr";
import { FeatureCollection, featureCollection } from "@turf/helpers";


var geoJsonData = fs.readFileSync("filtered_meters.buffered.merged.geojson", "utf8");

var fc = JSON.parse(geoJsonData);

// map refId:start:end:side:priority
var curbFeatures:Map<string,curblr.CurbFeature> = new Map();

for(var feature of fc.features) {
    var featureKey = feature.properties['referenceId'] + ':' + feature.properties['section'][0] + ':' + feature.properties['section'][1] + '' + feature.properties['sideOfStreet'] + feature.properties['pp_priority']

    var curbFeature:CurbFeature;
    if(curbFeatures.has(featureKey))
        curbFeature = curbFeatures.get(featureKey);
    else {
        curbFeature = new CurbFeature();

        // build location
        curbFeature.geometry = feature.geometry;

        curbFeature.properties = new CurbProperties;

        curbFeature.properties.location = new Location();
        curbFeature.properties.location.shstRefId = feature.properties['referenceId'];
        curbFeature.properties.location.shstLocationStart = feature.properties['section'][0];
        curbFeature.properties.location.shstLocationEnd = feature.properties['section'][1];
        curbFeature.properties.location.sideOfStreet = feature.properties['sideOfStreet'];

        curbFeatures.set(featureKey, curbFeature);
    }   

    // build regulation
    var regulation = new Regulation();

    regulation.priority = parseInt(feature.properties['pp_priority']);
    
    // build rule
    var rule = new Rule();

    if(feature.properties['pp_zone'])
        rule.activity = feature.properties['pp_zone'];

    if(feature.properties['pp_reason'])
        rule.reason = feature.properties['pp_reason'];
    
    if(feature.properties['pp_time_limit'])
        rule.maxStay = parseInt(feature.properties['pp_time_limit']);
    
    if(feature.properties['pp_payment'])
        rule.payment = (feature.properties['pp_payment'] == 'true');
    
    regulation.rule = rule;

    // build userClass
    if(feature.properties['pp_classes']) {
        var userClass = new UserClass();
        userClass.class = feature.properties['pp_classes'];
        regulation.userClasses = [userClass];
    }
    
    // build timeSpans
    // LA data has timeSpans suffixed with '_a' through '_d' in CSV 
    for(var timeSuffix of ['_a', '_b', '_c', '_d']) {

        var timeSpan = new TimeSpan();
        var includeTimespan = false;
        if(feature.properties['pp_days_of_week.days' + timeSuffix] ) {

            var daysOfWeek = new DaysOfWeek();
            var days:any[] = (feature.properties['pp_days_of_week.days' + timeSuffix]).split(','); // TODO check valid days names?
            daysOfWeek.days = days.map((d) => {return d.toLocaleLowerCase()});
            
            timeSpan.daysOfWeek = [daysOfWeek];
            includeTimespan =true;
        }

        if(feature.properties['pp_time_of_day.from' + timeSuffix]) {
            timeSpan.timesOfDay = [];
            var  timesOfDay = new TimesOfDay();
            timesOfDay.from = feature.properties['pp_time_of_day.from'+ timeSuffix];
            timesOfDay.to = feature.properties['pp_time_of_day.to' + timeSuffix]; // csv is to -- spec is until?

            timeSpan.timesOfDay = [timesOfDay];
            includeTimespan = true;
        }

        if(includeTimespan)
            regulation.timeSpans.push(timeSpan)
    }

    // build payment 
    if(feature.properties['pp_payment_min'] || feature.properties['pp_payment_min_interval'] || feature.properties['pp_payment_max'] 
        || feature.properties['pp_payment_max_interval'] || feature.properties['pp_method'] || feature.properties['pp_payment_form']) {
        
        var payment = new Payment();
        payment.rates = new Rates();
    
        if(feature.properties['pp_payment_min'])
            payment.rates.fees.push(parseFloat(feature.properties['pp_payment_min']));
        if(feature.properties['pp_payment_max'])
            payment.rates.fees.push(parseFloat(feature.properties['pp_payment_min']));
        if(feature.properties['payment_min_interval'])
            payment.rates.durations.push(parseInt(feature.properties['payment_min_interval']));
        if(feature.properties['payment_max_interval'])
            payment.rates.durations.push(parseInt(feature.properties['payment_max_interval']));
        
        if(feature.properties['pp_payment_form'])
            payment.forms.push(feature.properties['pp_payment_form']);

        if(feature.properties['pp_payment_method'])
            payment.methods = [feature.properties['pp_payment_method']];

        regulation.payment = payment;
    }

    curbFeature.properties.regulations.push(regulation);

}   

var collection:FeatureCollection = featureCollection([]);

for(var f of curbFeatures.values()) {
    collection.features.push(f);
}

console.log(JSON.stringify(collection));
