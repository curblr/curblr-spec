The examples below include the regulation described by the sign, as well as sample GeoJSON coordinates and location properties.

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
        "marker": "sign",
        "streetName": "Madison Ave"
      },
      "regulations": [
        {
            "rule": {
              "activity": "no stopping",
              "reason": "tow-away zone"
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

```json
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
        "marker": "sign",
        "streetName": "Parkdale St"
      },
    "regulations": [
      {
        "rule": {
          "activity": "no parking",
          "reason": "snow emergency zone"
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
        "marker": "sign",
        "streetName": "Reed Ave"
      },
    "regulations": [
      {
        "rule": {
          "activity": "parking",
          "reason": "car share only"
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

# Temporary construction zone
All vehicles except permitted construction vehicles are prohibited from standing between 7am and 4pm on April 9th, 2018.

### **Sign**

<img src="images/temporary_construction_zone.jpg" width="300">

### **CurbLR**

```json
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
        "marker": "sign",
        "streetName": "Madison Ave"
      },
    "regulations": [

      // defines a parking zone for construction vehicles:
      {
        "rule": {
          "activity": "parking",
          "reason": "construction vehicles only"
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
        "priority": 4
      },

      // defines a no standing zone for all other vehicles:
      {
        "rule": {
          "activity": "standing",
          "reason": "construction vehicles only"
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
        "priority": 4
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

```json
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
        "marker": "sign",
        "streetName": "Bond St"
      },
    "regulations": [
      {
        "rule": {
          "activity": "parking",
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
