The examples below include the regulation described by the sign, as well as sample GeoJSON coordinates and location properties.

# No stopping

No stopping is allowed by anyone at any time. Example location information is included.

### **Sign**

<img src="images/no_stopping.jpg" width="300">

### **CurbLR**
```javascript
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-112.125885,33.451343],
      [-112.125300,33.451320]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "324af8ba918d9a2921b1fe6f9723d729",
        "shstLocationSt": 51.6,
        "shstLocationEnd": 55.6,
        "sideOfStreet": "right",
        "objectID": "59463",
        "derivedFrom": ["b2045", "d0294"],
        "streetName": "Madison Ave"
      },
      "regulations": [
        {
            "rule": {
              "activity": "no stopping",
              "reason": "tow-away zone",
              "marker": "sign"
            },
            "priority": 4
          }
        ]
      }
    }
  }
```

# Snow emergency
No one may park during snow emergencies. Example location information is included.

### **Sign**

<img src="images/snow_emergency.jpg" width="300">

### **CurbLR**

```javascript
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-115.1258854,32.4513434],
      [-115.1253007,32.4513207]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "324af8ba918d9a2921b1fe6f9723d729",
        "shstLocationSt": 29.9,
        "shstLocationEnd": 34.1,
        "sideOfStreet": "left",
        "objectID": "49202",
        "derivedFrom": ["ks045", "q9372"],
        "streetName": "Parkdale St"
      },
    "regulations": [
      {
        "rule": {
          "activity": "no parking",
          "reason": "snow emergency zone",
          "marker": "sign"
        },
        "timeSpans": [
          {
            "designatedPeriod": {
              "name": "snow emergency",
              "apply": "only_during"
            }
          }
        ],
        "priority": 2
      }
    ]
  }
}
```

# Time-limited meter parking
Parking is limited to two hours between 8am and 8pm Monday through Saturday. Payment at multi-space meter is required.

### **Sign**

<img src="images/meter_parking_time_limit.jpg" width="300">

### **CurbLR**

```javascript
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-115.1258854,32.4513434],
      [-115.1253007,32.4513207]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "324af8ba918d9a2921b1fe6f9723d729",
        "shstLocationSt": 40,
        "shstLocationEnd": 60,
        "sideOfStreet": "right",
        "objectID": "2945",
        "derivedFrom": ["kj045", "o9372"],
        "streetName": "Mission St"
      },
    "regulations": [
      {
        "rule": {
          "activity": "parking",
          "payment": true,
          "marker": "sign"
        },
        "timeSpans": [
          {
            "daysOfWeek": {
              "days": ["Mo", "Tu", "We", "Th", "Fr", "Sa"]
            },
            "timesOfDay": [
              {"from": "08:00", "until": "20:00"}
            ]
          }
        ],
        {
          "payment":{
            "device": "meter"
          }
        }
        "priority": 4
      }
    ]
  }
}
```


# Car share vehicles
Only Enterprise CarShare vehicles may park. All others are prohibited at all times (this is implied and does not need to be specified).

### **Sign**

<img src="images/car_share.jpg" width="300">

### **CurbLR**

```javascript
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-112.125885,33.451343],
      [-112.125300,33.451320]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "908af8ba918d9a2921b1fe6f9723d729",
        "shstLocationSt": 14.7,
        "shstLocationEnd": 19.0,
        "sideOfStreet": "right",
        "objectID": "40163s",
        "derivedFrom": ["wo3045", "ty7649"],
        "streetName": "Reed Ave"
      },
    "regulations": [
      {
        "rule": {
          "activity": "parking",
          "reason": "car share only",
          "marker": "sign"
        },
        "userClass" : {
          "classes": ["car share"],
          "subclasses": ["Enterprise"]
        },
        "priority": 4
      }
    ]
  }
}
```

# Seasonal street cleaning
No parking allowed between 6am and 8am on the 2nd and 4th Wednesday of each month between April 1st and November 30th of every year.

### **Sign**

<img src="images/street_cleaning.jpg" width="300">

### **CurbLR**

```javascript
{  
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-126.1258854,33.4513431],
      [-126.1253029,33.4513429]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "923af8ba918d9a2921b1fe6f9723d729",
        "shstLocationSt": 5,
        "shstLocationEnd": 90,
        "sideOfStreet": "right",
        "objectID": "d59463",
        "derivedFrom": ["sign-7369", "sign-1045"],
        "streetName": "Brookline St"
      },
    "regulations": [
      {
        "rule": {
          "activity": "no parking",
          "reason": "street cleaning",
          "marker": "sign"
        },
        "timeSpans": [
          {
            "effectiveDates": [
              {"from": "04-01", "until": "11-30"}
            ],
            "daysOfWeek": {
              "days": ["We"],
              "occurrences_in_month": ["2nd", "4th"]
            },
            "timesOfDay": [
              {"from": "06:00", "until": "08:00"}
            ]
          }
        ],
        "priority": 3
      }
    ]
  }
}
```

# Temporary construction zone
All vehicles except permitted construction vehicles are prohibited from standing between 7am and 4pm on April 9th, 2018.

### **Sign**

<img src="images/temporary_construction_zone.jpg" width="300">

### **CurbLR**

```javascript
{  
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-129.1258854,33.4513431],
      [-129.1253007,33.4513207]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "224af8ba918d9a2921b1fe6f9723d729",
        "shstLocationSt": 20.3,
        "shstLocationEnd": 25.8,
        "sideOfStreet": "right",
        "objectID": "d59463",
        "derivedFrom": ["sign-9769", "sign-2045"],
        "streetName": "Madison Ave"
      },
    "regulations": [

      // defines a parking zone for construction vehicles:
      {
        "rule": {
          "activity": "parking",
          "reason": "construction vehicles only",
          "marker": "sign"
        },
        "userClass" : {
          "classes": ["construction"]
        },
        "timeSpans": [
          {
            "effectiveDates": [
              {"from": "2018-04-09", "until": "2018-04-09"}
            ],
            "timesOfDay": [
              {"from": "07:00", "until": "16:00"}
            ]
          }
        ],
        "priority": 3
      },

      // defines a no standing zone for all other vehicles:
      {
        "rule": {
          "activity": "standing",
          "reason": "construction vehicles only",
          "marker": "sign"
        },
        "userClass" : {
          "classes": ["construction"]
        },
        "timeSpans": [
          {
            "effectiveDates": {
              "from": "2018-04-09","until": "2018-04-09"
            },
            "timesOfDay": [
              {"from": "07:00", "until": "16:00"}
            ]
          }
        ],
        "priority": 3
      }
    ]
  }
}
```


# Resident parking
Parking allowed only for resident permit holders Monday through Saturday, except holidays.

### **Sign**

<img src="images/resident_parking.jpg" width="300">

### **CurbLR**

```javascript
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-113.1258851,32.4513431],
      [-113.1253007,32.4513207]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "993dj8ba408d9a2921b1fe6f9723d729",
        "shstLocationSt": 5,
        "shstLocationEnd": 100,
        "sideOfStreet": "right",
        "objectID": "190-349s",
        "derivedFrom": ["w0434", "q9404"],
        "streetName": "Bond St"
      },
    "regulations": [
      {
        "rule": {
          "activity": "parking",
          "marker": "sign"
        },
        "userClass" : {
          "classes": ["permit"],
        },
        "timeSpans": [
          {
            "daysOfWeek": {
              "days": ["Mo", "Tu", "We", "Th", "Fr", "Sa"]
            },
            "designatedPeriods": [
              {"name": "holidays", "apply": "except_during"}
            ]
          }
        ],
        "priority": 4
      }  
    ]
  }
}
```

# Prohibit specific users
No parking for Kardashians at any time

### **Sign**

<img src="images/no_kardashians.jpg" width="300">

### **CurbLR**

```javascript
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-113.1258851,32.4513431],
      [-113.1253007,32.4513207]
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "993dj8ba408d9a2921b1fe6f9723d729",
        "shstLocationSt": 5,
        "shstLocationEnd": 100,
        "sideOfStreet": "right",
        "objectID": "190-349s",
        "derivedFrom": ["w0434", "q9404"],
        "streetName": "Celebrity St"
      },
    "regulations": [
      {
        "rule": {
          "activity": "no parking",
          "marker": "sign"
        },
        "userClass" : {
          "classes": ["Kardashians"],
        },
        "priority": 4
      }  
    ]
  }
}
```
