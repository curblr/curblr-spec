import * as fs from "fs";

import * as curblr from './curblr'
import { CurbFeature, Location, Regulation, Rule, UserClass, TimeSpan, TimesOfDay, DaysOfWeek, Payment, Rates } from "./curblr";


var geoJsonData = fs.readFileSync("test.out.buffered.merged.geojson", "utf8");

var featureCollection = JSON.parse(geoJsonData);

// map refId:start:end:side:priority
var curbFeatures:Map<string,curblr.CurbFeature> = new Map();

for(var feature of featureCollection.features) {
    var featureKey = feature.properties['referenceId'] + ':' + feature.properties['section'][0] + ':' + feature.properties['section'][1] + '' + feature.properties['sideOfStreet'] + feature.properties['pp_priority']

    var curbFeature:CurbFeature;
    if(curbFeatures.has(featureKey))
        curbFeature = curbFeatures.get(featureKey);
    else {
        curbFeature = new CurbFeature();

        // build location
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
        rule.maxStay = parseInt(feature.properties['pp_timelimit']);
    
    if(feature.properties['pp_payment'])
        rule.payment = (feature.properties['pp_payment'] == 'true');
    
    regulation.rule = rule;

    // build userClass
    if(feature.properties['pp_classes']) {
        var userClass = new UserClass();
        userClass.classes = [feature.properties['pp_classes']];
        regulation.userClass = userClass;
    }
    
    // build timeSpans
    // LA data has timeSpans suffixed with '_a' through '_d' in CSV 
    for(var timeSuffix of ['_a', '_b', '_c', '_d']) {

        var timeSpan = new TimeSpan();
        if(feature.properties['pp_days_of_week.days'] + timeSuffix) {

            var daysOfWeek = new DaysOfWeek();
            var days:any[] = (feature.properties['pp_days_of_week.days'] + timeSuffix).split(','); // TODO check valid days names?
            daysOfWeek.days = days.filter((day) => {day.toLocaleLowerCase()});
            
            timeSpan.daysOfWeek = [daysOfWeek];
        }

        if(feature.properties['pp_time_of_day.from'] + timeSuffix) {
            timeSpan.timesOfDay = [];
            var  timesOfDay = new TimesOfDay();
            timesOfDay.from = feature.properties['pp_time_of_day.from'] + timeSuffix;
            timesOfDay.until = feature.properties['pp_time_of_day.to'] + timeSuffix; // csv is to -- spec is until?

            timeSpan.timesOfDay = [timesOfDay];
        }

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
            feature.properties['pp_payment_method'] = payment.method;

        regulation.payment = payment;
    }


    curbFeature.properties.regulations.push(regulation);
    
}   

console.log(curbFeatures.keys.length)

/*{
    "type": "Feature",
    "properties": {
      "referenceLength": 200.36,
      "geometryId": "4246a5f5d6f5c8c773716009e764e5be",
      "referenceId": "56e2f391da4f0cb8c9db40c2eb904feb",
      "sideOfStreet": "right",
      "section": [
        172.1533314219296,
        178.1533314219296
      ],
      "pp_days_of_week.days_a": "Mo, Tu, We, Th, Fr",
      "pp_days_of_week.days_b": "Mo, Tu, We, Th, Fr",
      "pp_priority": "3",
      "pp_reason": "tow-away zone",
      "pp_time_of_day.from_a": "6:00",
      "pp_time_of_day.from_b": "15:30",
      "pp_time_of_day.to_a": "9:00",
      "pp_time_of_day.to_b": "19:00",
      "pp_zone": "no standing",
      "pp_space_id": [
        "EN875"
      ],
      "shst_merged_point_count": 1,
      "shst_merged_buffer_length": 6
    },
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [
          -118.48829925605203,
          34.15694809479135
        ],
        [
          -118.48823486696689,
          34.156939573419834
        ]
      ]
    }
  }*/

/*
#extract regulations from a row
def get_regulations(row,number=None):
    suffix = "_"+str(number) if number else ""
     
    regulation = {}
   
    rule = {}
    
    if len(row.get('zone'+suffix)):
        rule['activity'] = row.get('zone'+suffix)
    
    if row.get('reason'+suffix):
        rule['reason'] = row.get('reason'+suffix)
    
    if row.get('timeLimit'+suffix):
        rule['maxStay'] = int(row.get('time_limit'+suffix))
        
    if row.get('payment'+suffix):
        rule['payment'] = bool(row.get('payment'+suffix))
    
    if len(rule):
        regulation['rule'] = rule


            
    userClass = {}
    
    if row.get('classes'+suffix):
        userClass['classes'] = [row.get('classes'+suffix)]
    
    if len(userClass):
        regulation['userClass'] = userClass
        
    timeSpans = {}
     
    #Start with the timing:
    if row.get('days_of_week.days'+suffix):
        timeSpans['daysOfWeek'] = {
            'days' : [x.strip() for x in row.get('days_of_week.days'+suffix).split(",")]
        }
        
    if row.get('time_of_day.from'+suffix):
        timeSpans['timesOfDay'] = [{
            'from':row.get('time_of_day.from'+suffix),
            'until'  :row.get('time_of_day.to'+suffix) #Could add defaults here if necessary
        }]
    
    if len(timeSpans):
        regulation['timeSpans'] = [timeSpans]
    else:
        regulation['timeSpans'] = []
        
    # Now check if there are other days or other times of day:
    for suffix2 in ['b','c','d','e','f','g','h','i']:
        new_timeSpans = {}
            
        if row.get('days_of_week.days'+suffix+suffix2):
            new_timeSpans['daysOfWeek'] = {
                'days': [x.strip() for x in row.get('days_of_week.days'+suffix+suffix2).split(",")]
            }


        if row.get('time_of_day.from'+suffix+suffix2):
            if 'daysOfWeek' in new_timeSpans and regulation['timeSpans'][len(regulation["timeSpans"])-1]['daysOfWeek'] == new_timeSpans['daysOfWeek']:
                regulation['timeSpans'][len(regulation["timeSpans"])-1]['timesOfDay'].append({
                    'from': row.get('time_of_day.from' + suffix + suffix2),
                    'until': row.get('time_of_day.to' + suffix + suffix2) # Could add defaults here if necessary
                })
                
                del new_timeSpans['daysOfWeek']
            else:
                new_timeSpans['timesOfDay'] = [{
                    'from':row.get('time_of_day.from'+suffix+suffix2),
                    'until'  :row.get('time_of_day.to'+suffix+suffix2) #Could add defaults here if necessary
                }]

        if new_timeSpans:
            regulation['timeSpans'].append(new_timeSpans)

    for ts in regulation['timeSpans']:
        if 'daysOfWeek' in ts:
            if len(ts['daysOfWeek']['days']) == 7:
                del ts['daysOfWeek']
            
    payment = {}
    
    if row.get('payment_min' + suffix):
        payment = {
            'rates': [
                {
                    'fees': list(map(float, filter(lambda x: x is not "", [row.get('payment_min' + suffix), row.get('payment_max' + suffix)]))),
                    'durations': list(map(int, filter(lambda x: x is not "", [row.get('payment_min_interval' + suffix), row.get('payment_max_interval' + suffix)])))
                }
            ]
        }
        
        if len(payment['rates'][0]['fees']) == 0:
            del payment['rates'][0]['fees']

        if len(payment['rates'][0]['durations']) == 0:
            del payment['rates'][0]['durations']

    if row.get('method'+suffix):
        payment['method'] = row.get('method'+suffix)
        
    if row.get('payment_form'+suffix):
        payment['paymentForm'] = row.get('payment_form'+suffix)
        
    if len(payment):
        regulation['payment'] = payment
        
    if row.get('priority'+suffix):
        regulation['priority'] = int(row.get('priority'+suffix))
    
    return [regulation]


*/