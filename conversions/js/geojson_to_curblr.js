// curblrizes a geojson output from sharedstreets-js

const fs = require('fs');
const path = require('path');

const inputGeojson = fs.readFileSync(path.join(process.cwd(), process.argv.slice(2)[0]),'utf-8');
const input = JSON.parse(inputGeojson);
var k = 0
//var feature = input.features[k];

// used later. regulations are not in effect on public holidays, except for time-bound effectiveDates (e.g. construction)
const apply = "except during";
const name = "holidays";

var geojson = {};
geojson['type'] = 'FeatureCollection';
geojson['features'] = [];

for (var feature of input.features) {

    // used later for complex timespans
    const timespans = [];

      // var feature = input.features[];

      // maps variables between geojson matched input and output CurbLR feed
      let {
        referenceId: shstRefId,
        sideOfStreet: sideOfStreet,
        pp_bays_angle: baysAngle,
        pp_activity: activity,
        pp_max_stay: maxStay,
        pp_payment: payment,
        pp_priority_category: priorityCategory,
        pp_user_classes: classes,
        pp_user_subclasses: subclasses,
        pp_asset_type: assetType,
        pp_asset_subtype: assetSubtype,
        pp_opening_hours: opening_hours,
        pp_payment_zone: deviceIds,
        pp_payment_form: forms,
        pp_payment_phone: phone,
        pp_payment_method: methods,
        pp_payment_rate_fees: fees,
        pp_payment_rate_durations: durations,
        section: [shstLocationStart, shstLocationEnd],
       // establishes some extra empty fields that will be used later to split up complex timespans into multiple diff properties / sets of properties
        effectiveDatesFrom,
        effectiveDatesTo,
        days,
        timesOfDayFrom,
        timesOfDayTo,
        timespan1,
        timespan2,
        secondDays,
        secondTimesFrom,
        secondTimesTo,
        thirdTimesFrom,
        thirdTimesTo,
        fourthTimesFrom,
        fourthTimesTo,
        timesOfDay2,
        timesOfDay3,
        timesOfDay4
      } = feature.properties

      //replaces underscores created for the OSM tag with spaces, per CurbLR convention. only tackles the first character to be replaced
      //activity = activity.replace('_',' ')

      //replace only tackles the first character to be replaced. if there are mutliple underscores (chars to be replaced) in a field, use a regex:
      activity = activity.replace(/_/g,' ');
      priorityCategory = priorityCategory.replace(/_/g,' ')

      // don't show the properties that are null
      if (payment === "true") {
        payment = true;
      } else {
        payment = undefined
      }

      maxStay = Number(maxStay) || undefined
      baysAngle = baysAngle || undefined
      assetType = assetType || undefined
      assetSubtype = assetSubtype || undefined
      phone = phone || undefined
      maxStay = maxStay || undefined

      // if the above didn't work, we'd need an if/else like the one for payment (can also be written with ternary operator ("? and :"))


  // handles specifics to the PBOT data that aren't fully captured in the JOSM data
      if (deviceIds) {
        deviceIds = ["zone " + deviceIds];
      } else {
        deviceIds = undefined
      }

      if (fees) {
        var operator = "PBOT";
      } else {
        operator = undefined
      }

      // splits up arrays, if they exist, otherwise doesn't write out the null.
      if (classes) {
        classes = classes.split(',').map(x => x.trim());
      } else {
        classes = undefined
      }

      if (subclasses) {
        subclasses = subclasses.split(',').map(x => x.trim());
      } else {
        subclasses = undefined
      }

      if (forms) {
        forms = forms.split(',').map(x => x.trim());
      } else {
        forms = undefined
      }

      if (methods) {
        methods = methods.split(',').map(x => x.trim());
      } else {
        methods = undefined
      }

      if (fees) {
        fees = fees.split(',').map(x => Number(x.trim()));
      } else {
        fees = undefined
      }

      if (durations) {
        durations = durations.split(',').map(x => Number(x.trim()));
      } else {
        durations = undefined
      }

      // handles opening_hours. in the absence of a general parser, this translates the ~10 cases in this PDX dataset.



      if (opening_hours === "Oct 31, 2019 - Feb 27, 2020") {
        effectiveDatesFrom = "2019-10-31";
        effectiveDatesTo = "2020-02-27";

        timespans.push({
          effectiveDates:[
            {
            from:effectiveDatesFrom,
            to:effectiveDatesTo
            }
          ]
        });

      } else if (opening_hours === "Oct 28, 2019 - Jan 17, 2020; Mo-Fr 06:00-16:00") {
        effectiveDatesFrom = "2019-10-28";
        effectiveDatesTo = "2020-01-17";
        days = ["mo", "tu", "we", "th", "fr"];
        timesOfDayFrom = "06:00";
        timesOfDayTo = "16:00";

        timespans.push({
          effectiveDates:[
            {
            from:effectiveDatesFrom,
            to:effectiveDatesTo
            }
          ],
          timesOfDay:[
            {
            from:timesOfDayFrom,
            to:timesOfDayTo
            }
          ],
          designatedPeriods:[
            {
              name,
              apply
            }
          ]
        });

      } else if (opening_hours === "Nov 25, 2019 - Nov 26, 2019") {
        effectiveDatesFrom = "2019-11-25";
        effectiveDatesTo = "2019-11-26";

        timespans.push({
          effectiveDates:[
            {
            from:effectiveDatesFrom,
            to:effectiveDatesTo
            }
          ]
        });

      } else if (opening_hours === "Jul 19, 2019 - Jan 10, 2020") {
        effectiveDatesFrom = "2019-07-19";
        effectiveDatesTo = "2020-01-10";

        timespans.push({
          effectiveDates:[
            {
            from:effectiveDatesFrom,
            to:effectiveDatesTo
            }
          ]
        });

      } else if (opening_hours === "Jul 01, 2019 - Jun 30, 2020") {
        effectiveDatesFrom = "2019-07-01";
        effectiveDatesTo = "2020-06-30";

        timespans.push({
          effectiveDates:[
            {
            from:effectiveDatesFrom,
            to:effectiveDatesTo
            }
          ]
        });

      } else if (opening_hours === "Nov 23, 2019, 07:00-19:00") {
        effectiveDatesFrom = "2019-11-23";
        effectiveDatesTo = "2019-11-23";
        timesOfDayFrom = "07:00";
        timesOfDayTo = "19:00";

        timespans.push({
          effectiveDates:[
            {
            from:effectiveDatesFrom,
            to:effectiveDatesTo
            }
          ],
          timesOfDay:[
            {
            from:timesOfDayFrom,
            to:timesOfDayTo
            }
          ]
        });

      } else if (opening_hours === "Mo-Sa 07:00-19:00") {
        days = ["mo", "tu", "we", "th", "fr", "sa"];
        timesOfDayFrom = "07:00";
        timesOfDayTo = "19:00";

        timespans.push({
          daysOfWeek: {
            days:days
          },
          timesOfDay:[
            {
            from:timesOfDayFrom,
            to:timesOfDayTo
            }
          ]
        });

      } else if (opening_hours === "Mo-Sa 07:00-11:00") {
        days = ["mo", "tu", "we", "th", "fr", "sa"];
        timesOfDayFrom = "07:00";
        timesOfDayTo = "11:00";

        timespans.push({
          daysOfWeek: {
            days:days
          },
          timesOfDay:[
            {
            from:timesOfDayFrom,
            to:timesOfDayTo
            }
          ]
        });

      } else if (opening_hours === "Mo-Sa 02:00-07:00") {
        days = ["mo", "tu", "we", "th", "fr", "sa"];
        timesOfDayFrom = "02:00";
        timesOfDayTo = "07:00";

        timespans.push({
          daysOfWeek: {
            days:days
          },
          timesOfDay:[
            {
            from:timesOfDayFrom,
            to:timesOfDayTo
            }
          ]
        });

      } else if (opening_hours === "Mo-Fr 07:00-18:00") {
        days = ["mo", "tu", "we", "th", "fr"];
        timesOfDayFrom = "07:00";
        timesOfDayTo = "18:00";

        timespans.push({
          daysOfWeek: {
            days:days
          },
          timesOfDay:[
            {
            from:timesOfDayFrom,
            to:timesOfDayTo
            }
          ]
        });

      } else if (opening_hours === "17:00-23:59") {
        timesOfDayFrom = "17:00";
        timesOfDayTo = "23:59";

        timespans.push({
          timesOfDay:[
            {
            from:timesOfDayFrom,
            to:timesOfDayTo
            }
          ]
        });

      } else if (opening_hours === "20:00-23:59, 00:00-10:00") {
        timesOfDayFrom = "20:00";
        timesOfDayTo = "23:59";
        secondTimesFrom = "00:00";
        secondTimesTo = "10:00";

        timespans.push({
          timesOfDay:[
            {
            from:timesOfDayFrom,
            to:timesOfDayTo
            },
            {
            from:secondTimesFrom,
            to:secondTimesTo
            },
          ]
        });

      } else if (opening_hours === "Mo-Sa 00:00-08:00, 19:00-23:59; Su 00:00-13:00, 19:00-23:59") {
        days = ["mo","tu","we","th","fr","sa"];
        timesOfDayFrom = "00:00";
        timesOfDayTo = "08:00";
        secondTimesFrom = "19:00";
        secondTimesTo = "23:59";
        secondDays = ["su"];
        thirdTimesFrom = "00:00";
        thirdTimesTo = "13:00";
        fourthTimesFrom = "19:00";
        fourthTimesTo = "23:59";

        timespans.push({
          daysOfWeek: {
            days:days
          },
          timesOfDay:[
            {
            from:timesOfDayFrom,
            to:timesOfDayTo
            },
            {
            from:secondTimesFrom,
            to:secondTimesTo
            },
          ]
        });

        timespans.push({
          daysOfWeek:{
            days:secondDays
          },
          timesOfDay:[
            {
              from:thirdTimesFrom,
              to:thirdTimesTo
            },
            {
            from:fourthTimesFrom,
            to:fourthTimesTo
            }
          ]
        });

        } else if (opening_hours === "Mo-Sa 07:00-18:00") {
          days = ["mo", "tu", "we", "th", "fr", "sa"];
          timesOfDayFrom = "07:00";
          timesOfDayTo = "18:00";

          timespans.push({
            daysOfWeek: {
              days:days
            },
            timesOfDay:[
              {
              from:timesOfDayFrom,
              to:timesOfDayTo
              }
            ]
          });


      } else if (opening_hours === "Mo-Sa 08:00-19:00; Su 13:00-19:00") {
        days = ["mo","tu","we","th","fr","sa"];
        timesOfDayFrom = "08:00";
        timesOfDayTo = "19:00";
        secondDays = ["su"];
        thirdTimesFrom = "13:00";
        thirdTimesTo = "19:00";

        timespans.push({
          daysOfWeek: {
            days:days
          },
          timesOfDay:[
            {
            from:timesOfDayFrom,
            to:timesOfDayTo
            }
          ],
          designatedPeriods:[
            {
              name,
              apply
            }
          ]
        });

        timespans.push({
          daysOfWeek:{
            days:secondDays
          },
          timesOfDay:[
            {
              from:thirdTimesFrom,
              to:thirdTimesTo
            }
          ],
          designatedPeriods:[
            {
              name,
              apply
            }
          ]
        });
      }



      // toFixed function converts to a string, wrapping in Number function changes it back
      shstLocationStart = Number(shstLocationStart.toFixed(1))
      shstLocationEnd = Number(shstLocationEnd.toFixed(1))

      // better way to filter out null properties:
      // const properties = Object.fromEntries(
      //   Object.entries(feature.properties)
      //     .filter(([k, v]) => v != null)
      // );

    var newTargetFeature = {
        ...feature,
        properties:{
          location:{
            shstRefId,
            sideOfStreet,
            shstLocationStart,
            shstLocationEnd,
            assetType,
            assetSubtype,
            baysAngle
          },
          regulations:[{
            rule:{
              activity,
              priorityCategory,
              maxStay,
              payment
            },
            userClasses:[{
              classes,
              subclasses,
            }],
            timeSpans:timespans,
            payment:{
              rates:{
                fees,
                durations,
              },
              methods,
              forms,
              phone,
              operator,
              deviceIds
          }
        }]
      }
    }
  geojson['features'].push(newTargetFeature);
}
// console.log(geojson.features.length);
console.log(JSON.stringify(geojson, null, 2))
