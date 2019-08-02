# No stopping

No Stopping is allowed by anyone at any time. Example location information is included.

### **Sign**

<img src="images/no_stopping.jpg" width="300">

### **CurbLR**
```json
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-112.12588548660278,33.45134313598914],
      [-112.12530076503754,33.45132075686167]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "324af8ba918d9a2921b1fe6f9723d729",
        "shstLocationSt": 51.61148912,
        "shstLocationEnd": 55.61148912,
        "sideOfStreet": "right",
        "objectID": "59463",
        "derivedFrom": ["b2045"],
        "marker": "sign",
        "streetName": "Madison Ave"
      },
      "restriction": {
          "rule": {
            "activity": "no stopping",
            "reason": "tow-away zone"
          },
          "priority": 4
        }
      }
    }
  }
```

# Snow emergency
No one may park during snow emergencies. Example location information is included.

### **Sign**

<img src="images/snow_emergency.jpg" width="300">

### **CurbLR**

```json
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-115.12588548660278,32.45134313598914],
      [-115.12530076503754,32.45132075686167]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "324af8ba918d9a2921b1fe6f9723d729",
        "shstLocationSt": 29.61148912,
        "shstLocationEnd": 34.61148912,
        "sideOfStreet": "left",
        "objectID": "49202",
        "derivedFrom": ["ks045"],
        "marker": "sign",
        "streetName": "Parkdale St"
      },
    "restriction": {
      "rule": {
        "activity": "no parking",
        "reason": "snow emergency zone"
      },
      "priority": 2,
      "timeSpans": [
        {
          "designatedPeriod": {
            "name": "snow emergency",
            "apply": "only_during"
          }
        }
      ]
    }
  }
}
```

# Car share vehicles
Only Enterprise CarShare vehicles may park. All others are prohibited at all times (this is implied and does not need to be specified).

### **Sign**

<img src="images/car_share.jpg" width="300">

### **CurbLR**

```json
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-112.12588548660278,33.45134313598914],
      [-112.12530076503754,33.45132075686167]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "908af8ba918d9a2921b1fe6f9723d729",
        "shstLocationSt": 14.71148912,
        "shstLocationEnd": 19.61148912,
        "sideOfStreet": "right",
        "objectID": "40163s",
        "derivedFrom": ["wo3045"],
        "marker": "sign",
        "streetName": "Reed Ave"
      },
    "restriction": {
      "rule": {
        "activity": "parking",
        "reason": "car share only"
      },
      "priority": 4,
      "userClass" : {
        "classes": ["car share"],
        "subclasses": ["Enterprise"]
      }
    }  
  }
}
```

# Temporary construction zone
All vehicles except permitted construction vehicles are prohibited from standing between 7am and 4pm on April 9th, 2018.

### **Sign**

<img src="images/temporary_construction_zone.jpg" width="300">

### **CurbLR**

```json
// defines a parking zone for construction vehicles
{  
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-129.12588548660278,33.45134313598914],
      [-129.12530076503754,33.45132075686167]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "224af8ba918d9a2921b1fe6f9723d729",
        "shstLocationSt": 20.61148912,
        "shstLocationEnd": 25.61148912,
        "sideOfStreet": "right",
        "objectID": "d59463",
        "derivedFrom": ["b2045"],
        "marker": "sign",
        "streetName": "Madison Ave"
      },
    "restriction": {
      "rule": {
        "activity": "parking",
        "reason": "construction vehicles only"
      },
      "priority": 4,
      "timeSpans": [
        {
          "effectiveDates": [
            {
              "from": "2018-04-09",
              "until": "2018-04-09"
            }
          ],
          "timesOfDay": [
            {
              "from": "07:00",
              "until": "16:00"
            }
          ]
        },
      ],
      "userClass" : {
        "class": "construction"
      }
    }  
  }
}

// defines a no standing zone for all other vehicles
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-129.12588548660278,33.45134313598914],
      [-129.12530076503754,33.45132075686167]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "224af8ba918d9a2921b1fe6f9723d729",
        "shstLocationSt": 20.61148912,
        "shstLocationEnd": 25.61148912,
        "sideOfStreet": "right",
        "objectID": "sg463",
        "derivedFrom": ["b2045"],
        "marker": "sign",
        "streetName": "Madison Ave"
      },
    "restriction": {
      "rule": {
        "activity": "standing",
        "reason": "construction vehicles only"
      },
      "priority": 4,
      "timeSpans": [
        {
          "effectiveDates": {
            "from": "2018-04-09",
            "until": "2018-04-09"
          },
          "timesOfDay": [
            {
              "from": "07:00",
              "until": "16:00"
            }
          ]
        }
      ],
      "userClass" : {
        "classes": ["construction"]
      }
    }  
  }
}
```


# Resident parking
Parking allowed only for resident permit holders Monday through Saturday, except holidays.

### **Sign**

<img src="images/resident_parking.jpg" width="300">

### **CurbLR**

```json
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-113.12588548660278,32.45134313598914],
      [-113.12530076503754,32.45132075686167]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "993dj8ba408d9a2921b1fe6f9723d729",
        "shstLocationSt": 5,
        "shstLocationEnd": 100,
        "sideOfStreet": "right",
        "objectID": "190-349s",
        "derivedFrom": ["w0434"],
        "marker": "sign",
        "streetName": "Bond St"
      },
    "restriction": {
      "rule": {
        "activity": "parking",
      },
      "priority": 4,
      "timeSpans": [
        {
          "daysOfWeek": {
            "days": [
              "Mo", "Tu", "We", "Th", "Fr", "Sa"
            ]
          },
          "designatedPeriods": [
            {
              "name": "holidays",
              "apply": "except_during"
            }
          ]
        }
      ],
      "userClass" : {
        "classes": ["permit"]
      }
    }  
  }
}
```
