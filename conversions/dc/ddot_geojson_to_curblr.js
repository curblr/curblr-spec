// curblrizes a geojson output from sharedstreets-js

const fs = require('fs');
const path = require('path');

const inputGeojson = fs.readFileSync('dc_polylines_wMUTCD_sample2.matched.geojson');
const input = JSON.parse(inputGeojson);
var k = 0

// used later. regulations are not in effect on public holidays, except for time-bound effectiveDates (e.g. construction)
const apply = "except during";
const name = "holidays";

var geojson = {};
geojson['type'] = 'FeatureCollection';
geojson['features'] = [];

for (var feature of input.features) {

    let {
        referenceId: shstRefId,
        sideOfStreet: sideOfStreet,
        section: [shstLocationStart, shstLocationEnd],
        pp_mutcd: mutcd,
        pp_startday: startDay,
        pp_endday: endDay,
        pp_starttime: startTime,
        pp_endtime: endTime,
        pp_signs: marker
    } = feature.properties
    
    shstLocationStart = Number(shstLocationStart.toFixed(1))
    shstLocationEnd = Number(shstLocationEnd.toFixed(1))

    if(startTime)
      startTime = Number(startTime.toFixed(1))
    if(endTime)
      endTime = Number(endTime.toFixed(1))

    if(startDay)
      startDay = Number(startDay.toFixed(1))
    if(endDay)
      endDay = Number(endDay.toFixed(1))

    let timeSpan = null;

    if(startDay && endDay && startDay != 8 && endDay != 8){
      days = [];
      dayValues = ["mo", "tu", "we", "th", "fr", "sa", 'su']
      for(i = 1; i <=7; i++) {
        if(startDay <= i && endDay >= i){
            days.push(dayValues[i-1])
        }
      }
      timeSpan = {daysOfWeek: {days}}
    }

    // zero pad numbers for HH
    const pad = (num, size) => {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    };

    // convert DDOT time codes to HH:MM
    const calcHHMM = (val) => {
      let mins = (val - 1) % 4;
      let hours = ((val - 1) - mins)
      if(hours < 0){
        hours = 0;
      }
      else {
        hours  = hours / 4;
      }
      var timeStr = pad(hours + 4, 2);

      if (mins == 0){
        timeStr = timeStr + ":00";
      }
      else if (mins == 1){
        timeStr = timeStr + ":15";
      }
      else if (mins == 2){
        timeStr = timeStr + ":30";
      }
      else if (mins == 3){
        timeStr = timeStr + ":45";
      }
      return timeStr;
    }

    if(startTime && endTime && startTime != 100 && endTime != 100 ) {
      if(timeSpan == null) {
        timeSpan = {}
      }
      let startTimeStr = calcHHMM(startTime);
      let endTimeStr = calcHHMM(endTime);
      timeSpan['timesOfDay'] = [{
        from:startTimeStr,
        to:endTimeStr
      }]
    }

    let timeSpans = [];
    if(timeSpan)
      timeSpans.push(timeSpan);


    

    if(mutcd === 'R8-3') {
        // no parking anytime

        let priority = 1;
        let activity = 'no parking';
        

        var newTargetFeature = {
            ...feature,
            properties:{
              location:{
                shstRefId,
                sideOfStreet,
                shstLocationStart,
                shstLocationEnd,
                marker
              },
              regulations:[{
                priority,
                rule:{
                  activity
                },
                timeSpans
            }]
          }
        }
      geojson['features'].push(newTargetFeature);
    }
    else if(mutcd === 'R-NS-056' || mutcd === 'R-DC-PMPBP') {
        // paid parking
        let priority = 2;
        let activity = 'parking';
        

        var newTargetFeature = {
            ...feature,
            properties:{
              location:{
                shstRefId,
                sideOfStreet,
                shstLocationStart,
                shstLocationEnd,
                marker
              },
              regulations:[{
                priority,
                rule:{
                  activity,
                  payment:true
                },
                timeSpans
            }]
          }
        }
      geojson['features'].push(newTargetFeature);

    }
    else if(mutcd === 'R-NS-RPP' || mutcd === 'R-NS_ROP') {
        // residential permit
        let priority = 3;
        let activity = 'parking';
        

        var newTargetFeature = {
            ...feature,
            properties:{
              location:{
                shstRefId,
                sideOfStreet,
                shstLocationStart,
                shstLocationEnd,
                marker
              },
              regulations:[{
                priority,
                rule:{
                  activity
                },
                timeSpans,
                userClasses : [
                    {
                      classes: ["permit"],
                    }
                  ]
                
            }]
          }
        }
      geojson['features'].push(newTargetFeature);

    }
    else if(mutcd === 'R-DC-2HROLD') {
        // two hour free parking
        let priority = 2;
        let activity = 'parking';
  
        var newTargetFeature = {
            ...feature,
            properties:{
              location:{
                shstRefId,
                sideOfStreet,
                shstLocationStart,
                shstLocationEnd,
                marker
              },
              regulations:[{
                priority,
                rule:{
                  activity,
                  maxStay: 120
                },
                timeSpans
            }]
          }
        }
      geojson['features'].push(newTargetFeature);

    }
}
// console.log(geojson.features.length);
console.log(JSON.stringify(geojson, null, 2))


