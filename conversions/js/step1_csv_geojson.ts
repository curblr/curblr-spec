import * as fs from "fs";
const parse = require('csv-parse/lib/sync')


// converts LADOT-derived CSV file of parking reg points into geojson:

var fields:Set<string> = new Set(["space_id","priority",
                "zone",
                "reason",
                "classes",
                "days_of_week.days_a",
                "time_of_day.from_a",
                "time_of_day.to_a",
                "days_of_week.days_b",
                "time_of_day.from_b",
                "time_of_day.to_b",
                "days_of_week.days_c",
                "time_of_day.from_c",
                "time_of_day.to_c",
                "days_of_week.days_d",
                "time_of_day.from_d",
                "time_of_day.to_d",
                "payment_min",
                "payment_min_interval",
                "payment_max",
                "payment_max_interval",
                "time_limit",
                "method",
                "payment_form"])


var csvData =  fs.readFileSync("prepped_data.csv", "utf8");

const records = parse(csvData, { columns: true, skip_empty_lines: true });

var features = [];
for(var obj of records){
    var feature = {type:'Feature', geometry: {type:'Point', coordinates:[parseFloat(obj['X']), parseFloat(obj['Y'])]}, properties:{}};

    for(var k = 1; k <= 4; k++) {
        var suffix = '_' + k;
        if(obj['zone' + suffix]) {
            var featureCopy = JSON.parse(JSON.stringify(feature));

            for(var field of Object.keys(obj)) {
                var cleanFieldname = field.replace(suffix, "_");
                
                if(cleanFieldname.endsWith("_"))
                    cleanFieldname = cleanFieldname.slice(0, -1);
                
                if(fields.has(cleanFieldname) && obj[field].trim()) {
                    featureCopy.properties[cleanFieldname] = obj[field];
                }
            }
            
            features.push(featureCopy)
        }
        
    }
}

var featureCollection = {type:"FeatureCollection", features:features};
console.log(JSON.stringify(featureCollection));

/* 
Y // point coord
X // point coord
space_id
coordinates
feature_id
marker
streetName
derived_from

priority
zone
reason
days_of_week.days_a
time_of_day.from_a
time_of_day.to_a
days_of_week.days_b
time_of_day.from_b
time_of_day.to_b
days_of_week.days_c
time_of_day.from_c
time_of_day.to_c
days_of_week.days_d
time_of_day.from_d
time_of_day.to_d
payment_min
payment_min_interval
payment_max
payment_max_interval
time_limit
method
payment_form

priority_2
zone_2
reason_2
payment_2
class_2
days_of_week.days_2
time_of_day.from_2
time_of_day.to_2
days_of_week.days_2b
time_of_day.from_2b
time_of_day.to_2b
days_of_week.days_2c
time_of_day.from_2c
time_of_day.to_2c
days_of_week.days_2d
time_of_day.from_2d
time_of_day.to_2d
payment_min_2
payment_min_interval_2
payment_max_2
payment_max_interval_2
time_limit_2
method_2
payment_form_2

agency_3
priority_3
zone_3
reason_3
payment_3
classes_3
days_of_week.days_3
time_of_day.from_3
time_of_day.to_3
days_of_week.days_3b
time_of_day.from_3b
time_of_day.to_3b
days_of_week.days_3c
time_of_day.from_3c
time_of_day.to_3c
days_of_week.days_3d
time_of_day.from_3d
time_of_day.to_3d
payment_min_3
payment_min_interval_3
payment_max_3
payment_max_interval_3
time_limit_3
method_3
payment_form_3

priority_4
zone_4
reason_4
payment_4
classes_4
days_of_week.days_4
time_of_day.from_4
time_of_day.to_4
days_of_week.days_4b
time_of_day.from_4b
time_of_day.to_4b
days_of_week.days_4c
time_of_day.from_4c
time_of_day.to_4c

*/
