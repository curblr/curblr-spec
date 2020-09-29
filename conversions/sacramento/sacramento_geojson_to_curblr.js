// curblrizes a geojson output from sharedstreets-js

const fs = require("fs");
const path = require("path");

const inputGeojson = fs.readFileSync("sacramento_parking.buffered.geojson");
const input = JSON.parse(inputGeojson);

var geojson = {};
geojson["type"] = "FeatureCollection";
geojson["features"] = [];

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// match what's in the input data to CurbLR fields... or at least name them so we can tweak them

for (var feature of input.features) {
  let {
    referenceId: shstRefId,
    sideOfStreet: sideOfStreet,
    section: [shstLocationStart, shstLocationEnd],
    pp_gisobjid: objectID,
    pp_pkgtype: pkgType,
    pp_timelimit: maxStay,
    pp_street: street,
    pp_suffix: stSuffix,
    pp_prefix: stPrefix,
    pp_pkgenday: days,
    pp_enbegin: timeOfDayFrom,
    pp_enend: timeOfDayTo,
    pp_pkgsday: sweepDay,
    pp_pkgswbeg: sweepStart,
    pp_pkgswend: sweepEnd
  } = feature.properties;

  // some fields do map to CurbLR but we need to tweak them slightly. let's do that first.

  shstLocationStart = Number(shstLocationStart.toFixed(1));
  shstLocationEnd = Number(shstLocationEnd.toFixed(1));

  // combine separate fields to make the composite street name (ex. 2nd St)
  const streetName = street + stSuffix + " " + stPrefix;

  // timeLimit is not in a consistent unit, let's change this. ignore "2+" bc I don't know what that means.
  if (maxStay?.match("Hour")) {
    maxStay = parseInt(maxStay) * 60;
  } else if (maxStay?.match("Minutes")) {
    maxStay = parseInt(maxStay);
  } else {
    maxStay = undefined;
  }

  let priorityCategory = pkgType.toLowerCase();

  // populate times of day

  // // hours from am/pm into 24 hr time... formatted as HH:MM. This would need to be more elegant if things started partway through an hour.
  if (timeOfDayFrom?.match("am") || timeOfDayFrom == "12 pm") {
    timeOfDayFrom = parseInt(timeOfDayFrom).toString();
  } else if (timeOfDayFrom?.match("pm")) {
    timeOfDayFrom = (parseInt(timeOfDayFrom) + 12).toString();
  } else {
    timeOfDayFrom = undefined;
  }

  if (timeOfDayFrom?.length == 1) {
    timeOfDayFrom = "0" + timeOfDayFrom + ":00";
  } else if (timeOfDayFrom?.length == 2) {
    timeOfDayFrom = timeOfDayFrom + ":00";
  }

  if (timeOfDayTo?.match("am") || timeOfDayTo == "12 pm") {
    timeOfDayTo = parseInt(timeOfDayTo).toString();
  } else if (timeOfDayTo?.match("pm")) {
    timeOfDayTo = (parseInt(timeOfDayTo) + 12).toString();
  } else {
    timeOfDayTo = undefined;
  }

  if (timeOfDayTo?.length == 1) {
    timeOfDayTo = "0" + timeOfDayTo + ":00";
  } else if (timeOfDayTo?.length == 2) {
    timeOfDayTo = timeOfDayTo + ":00";
  }

  // if there's a start time but no end time, end time assumed to be midnight. And vice versa.
  if (timeOfDayFrom?.length && !timeOfDayTo) {
    timeOfDayTo = "23:59";
  } else if (timeOfDayTo?.length && !timeOfDayFrom) {
    timeOfDayFrom = "00:00";
  }

  // populate days of week (common combinations only, otherwise it's not present)
  if (days?.match("MON-SAT")) {
    days = ["mo", "tu", "we", "th", "fr", "sa"];
  } else if (days?.match("MON-FRI")) {
    days = ["mo", "tu", "we", "th", "fr"];
  } else if (days?.match("SAT-SUN")) {
    days = ["sa", "su"];
  } else if (days?.match("SUN-SAT")) {
    days = ["su", "mo", "tu", "we", "th", "fr", "sa"];
  } else {
    days = undefined;
  }

  // some rules are only in effect for certain times of day. when not in effect, let's default to free, unrestricted parking.
  // we aren't required to add a timeSpan for this since it'll be layered on the bottom of the other rules
  // the following builds a regulation for this that we can drop in
  let defaultRegulation;
  if (days?.length || timeOfDayFrom?.length) {
    defaultRegulation = {
      rule: {
        activity: "parking",
        priorityCategory: "unrestricted parking by default"
      },
      timeSpans: []
    }
  }


  // now let's go through a handful of common parking rules. if they match the criteria we set, then we'll assign them some additional CurbLR properties beyond what's already assigned above.

  if (
    (maxStay === "No Parking Anytime") &
    (pkgType === "Driveway" ||
      pkgType === "Crosswalk" ||
      pkgType === "R X R" ||
      pkgType === "Alley")
  ) {
    // no standing anytime in a driveway, crosswalk, railroad crossing, or alley intersection
    let activity = "no standing";
    let priorityCategory = "no standing anytime";
    let assetType = "curb cut";

    var newTargetFeature = {
      ...feature,
      properties: {
        location: {
          shstRefId,
          sideOfStreet,
          shstLocationStart,
          shstLocationEnd,
          streetName,
          objectID,
          assetType,
        },
        regulations: [
          {
            rule: {
              activity,
              priorityCategory,
            }
          }
        ]
      }
    };
    geojson["features"].push(newTargetFeature);
  } else if (maxStay === "No Parking Anytime") {
    // some "No Parking Anytime" areas are actually bus stops. These are bus parking only.
    let activity = "parking";
    priorityCategory = "restricted parking";

    var newTargetFeature = {
      ...feature,
      properties: {
        location: {
          shstRefId,
          sideOfStreet,
          shstLocationStart,
          shstLocationEnd,
          streetName,
          objectID,
        },
        regulations: [
          {
            rule: {
              activity,
              priorityCategory,
            },
            userClasses: [{ classes: ["bus"] }]
          }
        ]
      }
    };
    geojson["features"].push(newTargetFeature);
 } else if (maxStay === "No Parking Anytime") {
    // all other "No Parking Anytime" areas are designated as no parking zones. This is an approximation and I'm not an expert on Sac's rules, so this is just a guess/example.
    let activity = "no parking";
    priorityCategory = "no parking";

    var newTargetFeature = {
      ...feature,
      properties: {
        location: {
          shstRefId,
          sideOfStreet,
          shstLocationStart,
          shstLocationEnd,
          streetName,
          objectID,
        },
        regulations: [
          {
            rule: {
              activity,
              priorityCategory,
            }
          }
        ]
      }
    };
    geojson["features"].push(newTargetFeature);
  } else if (priorityCategory === "yellow zone") {
    let activity = "loading";
    let assetType = "curb paint";
    let assetSubtype = "yellow";
    // some of these also have permit area designations but I can't tell if that's an additional permit required or if a permit means someone can park in the loading zone anyway. so I've left it out.
    var newTargetFeature = {
      ...feature,
      properties: {
        location: {
          shstRefId,
          sideOfStreet,
          shstLocationStart,
          shstLocationEnd,
          streetName,
          objectID,
          assetType,
          assetSubtype,
        },
        regulations: [
          {
            rule: {
              activity,
              priorityCategory,
              maxStay,
            },
            timeSpans: [
              {
                daysOfWeek: {
                  days: days,
                },
              },
              {
                timesOfDay: {
                  from: timeOfDayFrom,
                  to: timeOfDayTo,
                }
              }
            ]
          },
          defaultRegulation
        ]
      }
    };
    geojson["features"].push(newTargetFeature);
  } else if (priorityCategory === "time zone") {
    let activity = "parking";
    let priorityCategory = "parking";
    // some of these also have permit area designations but I can't tell if that's an additional permit required or if a permit means someone can park in the loading zone anyway. so I've left it out.
    var newTargetFeature = {
      ...feature,
      properties: {
        location: {
          shstRefId,
          sideOfStreet,
          shstLocationStart,
          shstLocationEnd,
          streetName,
          objectID,
        },
        regulations: [
          {
            rule: {
              activity,
              priorityCategory,
              maxStay,
            },
            timeSpans: [
              {
                daysOfWeek: {
                  days: days,
                },
              },
              {
                timesOfDay: {
                  from: timeOfDayFrom,
                  to: timeOfDayTo,
                }
              }
            ]
          },
          defaultRegulation
        ]
      }
    };
    geojson["features"].push(newTargetFeature);
  } else if (priorityCategory === "blue zone") {
    let activity = "parking";
    let priorityCategory = "restricted parking";
    let classes = "handicap";

    var newTargetFeature = {
      ...feature,
      properties: {
        location: {
          shstRefId,
          sideOfStreet,
          shstLocationStart,
          shstLocationEnd,
          streetName,
          objectID,
        },
        regulations: [
          {
            rule: {
              activity,
              priorityCategory,
              maxStay,
            },
            userClasses: [{ classes: ["handicap"] }],
            timeSpans: [
              {
                daysOfWeek: {
                  days: days,
                },
              },
              {
                timesOfDay: {
                  from: timeOfDayFrom,
                  to: timeOfDayTo,
                }
              }
            ]
          }
        ]
      }
    };
    geojson["features"].push(newTargetFeature);
  }

  // some features have a second regulation, like street sweeping, that applies periodically. 
  // Will do an example for that. You can either find those features and add a second object in the regulations array, or you can duplicate it to create the street sweeping rule. 
  // It's easier to write this script using the latter approach.


  // hours from am/pm into 24 hr time... formatted as HH:MM. This would need to be more elegant if things started partway through an hour.
  if (sweepStart?.match("am") || sweepStart == "12 pm") {
    sweepStart = parseInt(sweepStart).toString();
  } else if (sweepStart?.match("pm")) {
    sweepStart = (parseInt(sweepStart) + 12).toString();
  } else {
    sweepStart = undefined;
  }

  if (sweepStart?.length == 1) {
    sweepStart = "0" + sweepStart + ":00";
  } else if (sweepStart?.length == 2) {
    sweepStart = sweepStart + ":00";
  }

  if (sweepEnd?.match("am") || sweepEnd == "12 pm") {
    sweepEnd = parseInt(sweepEnd).toString();
  } else if (sweepEnd?.match("pm")) {
    sweepEnd = (parseInt(sweepEnd) + 12).toString();
  } else {
    sweepEnd = undefined;
  }

  if (sweepEnd?.length == 1) {
    sweepEnd = "0" + sweepEnd + ":00";
  } else if (sweepEnd?.length == 2) {
    sweepEnd = sweepEnd + ":00";
  }

  // if there's a start time but no end time, end time assumed to be midnight. And vice versa.
  if (sweepStart?.length && !sweepEnd) {
    sweepEnd = "23:59";
  } else if (sweepEnd === "24:00") {
    sweepEnd = "23:59"
  } else if (sweepEnd?.length && !sweepStart) {
    sweepStart = "00:00";
  }

  // populate days of week for street sweeping, include case to deal with "1st Wed", etc.

  sweepDay = sweepDay?.toLowerCase();

  let occurrencesInMonth;

  if (sweepDay?.match("1st")) {
      sweepDay = sweepDay.slice(4,6);
      occurrencesInMonth = "1st";
  } else if (sweepDay?.length == 4) {
      sweepDay = sweepDay.slice(0,2);
  }

  // if there's info for street sweeping, add a new feature for it
  if (sweepDay?.length) {
    let activity = "no parking";
    let priorityCategory = "street sweeping";
    var newTargetFeature = {
      ...feature,
      properties: {
        location: {
          shstRefId,
          sideOfStreet,
          shstLocationStart,
          shstLocationEnd,
          streetName,
          objectID,
        },
        regulations: [
          {
            rule: {
              activity,
              priorityCategory,
            },
            timeSpans: [
              {
                daysOfWeek: {
                  days: [sweepDay],
                  occurrencesInMonth: occurrencesInMonth
                },
              },
              {
                timesOfDay: {
                  from: sweepStart,
                  to: sweepEnd,
                }
              }
            ]
          }
        ]
      }
    };
    geojson["features"].push(newTargetFeature);
  }

}

console.log(JSON.stringify(geojson, null, 2));
