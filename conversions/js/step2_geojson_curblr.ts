import * as fs from "fs";

import * as curblr from './curblr'
import { CurbFeature, Location, Regulation, Rule, UserClass, TimeSpan, TimesOfDay, DaysOfWeek, Payment, Rates, CurbProperties, CurbFeatureCollection } from "./curblr";
import { FeatureCollection, featureCollection } from "@turf/helpers";

/// shst match filtered_meters.geojson --buffer-points --buffer-merge --buffer-merge-match-fields=priority,zone,reason,classes,days_of_week.days_a,time_of_day.from_a,time_of_day.to_a,days_of_week.days_b,time_of_day.from_b,time_of_day.to_b,days_of_week.days_c,time_of_day.from_c,time_of_day.to_c,days_of_week.days_d,time_of_day.from_d,time_of_day.to_d,payment_min,payment_min_interval,payment_max,payment_max_interval,time_limit,method,payment_form --buffer-merge-group-fields=space_id --offset-line=5 --search-radius=20 --buffer-points-length=6


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
            daysOfWeek.days = days.map((d) => {return d.trim().toLocaleLowerCase()});
            
            timeSpan.daysOfWeek = daysOfWeek;
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

var collection:CurbFeatureCollection = featureCollection([]);
collection.manifest = {
    "createdDate": "2019-08-26T11:40:45",
    "lastUpdatedDate": "2019-08-28T17:40:45",
    "timeZone": "America/Los_Angeles",
    "currency": "USD",
    "authority": {
      "name": "LADOT",
      "url": "https://ladot.lacity.org/"
    }
  };

for(var f of curbFeatures.values()) {
    collection.features.push(f);
}


fs.writeFileSync("la_curblr.geojson", JSON.stringify(collection, null, "  "), "utf8");
