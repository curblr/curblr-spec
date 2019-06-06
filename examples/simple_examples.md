# No stopping

No Stopping is allowed by anyone at any time. Example location information is included.

### **Sign**

<img src="images/no_stopping.jpg" width="300">

### **CurbLR**
```
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -118.2816343,
      34.0227093
    ]
  },
  "properties": {
    "location": {
        "shstRefId": "324af8ba918d9a2921b1fe6f9723d729",
        "shstLocation": 51.61148912,
        "ptRelation": 2,
        "direction": "forward",
        "sideOfStreet": "left",
        "marker": "sign",
        "objectID": 59463,
        "derivedFrom": "b2045"
      },
      "rule": {
          "what": {
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

```
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -118.2816343,
      34.0227093
    ]
  },
  "properties": {
    "location": {
      "shstRefId": "324af8ba918d9a2921b1fe6f9723d729",
      "shstLocation": 51.61148912,
      "ptRelation": 1,
      "direction": "forward",
      "sideOfStreet": "right",
      "marker": "sign",
      "objectID": 59463,
      "derivedFrom": "b2045"
    },
    "rule": {
      "what": {
        "activity": "no parking",
        "reason": "snow emergency zone"
      },
      "priority": 2,
      "when": {
        "designatedPeriod": {
          "name": "snow emergency",
          "apply": "only_during"
        }
      }
    }
  }
}
```

# Car share vehicles
Only Enterprise CarShare vehicles may park. All others are prohibited at all times (this is implied and does not need to be specified).

### **Sign**

<img src="images/car_share.jpg" width="300">

### **CurbLR**

```
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -118.2816343,
      34.0227093
    ]
  },
  "properties": {
    "location": {
      "shstRefId": "324af8ba918d9a2921b1fe6f9723d729",
      "shstLocation": 51.61148912,
      "ptRelation": 2,
      "direction": "forward",
      "sideOfStreet": "left",
      "marker": "sign",
      "objectID": 59463,
      "derivedFrom": "b2045"
    },
    "rule": {
      "what": {
        "activity": "parking",
        "reason": "car share only"
      },
      "priority": 4
    }  
  }
}
```

# Temporary construction zone
All vehicles except permitted construction vehicles are prohibited from standing between 7am and 4pm on April 9th, 2018.

### **Sign**

<img src="images/temporary_construction_zone.jpg" width="300">

### **CurbLR**
```
{  // defines a parking zone for construction vehicles
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -118.2816343,
      34.0227093
    ]
  },
  "properties": {
    "location": {
      "shstRefId": "324af8ba918d9a2921b1fe6f9723d729",
      "shstLocation": 51.61148912,
      "ptRelation": 2,
      "direction": "forward",
      "sideOfStreet": "left",
      "marker": "sign",
      "objectID": 59463,
      "derivedFrom": "b2045"
    },
    "rule": {
      "what": {
        "activity": "parking",
        "reason": "construction vehicles only"
      },
      "priority": 4,
      "when": {
        "effectiveDates": {
          "from": "2018-04-09",
          "until": "2018-04-09"
        },
        "timeOfDay": {
          "from": "07:00",
          "until": "16:00"
        }
      },
      "who" : {
        "class": "construction"
      }
    }  
  }
}


{ // defines a no standing zone for all other vehicles
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -118.2816343,
      34.0227093
    ]
  },
  "properties": {
    "location": {
      "shstRefId": "324af8ba918d9a2921b1fe6f9723d729",
      "shstLocation": 51.61148912,
      "ptRelation": 2,
      "direction": "forward",
      "sideOfStreet": "left",
      "marker": "sign",
      "objectID": 59463,
      "derivedFrom": "b2045"
    },
    "rule": {
      "what": {
        "activity": "standing",
        "reason": "construction vehicles only"
      },
      "priority": 4,
      "when": {
        "effectiveDates": {
          "from": "2018-04-09",
          "until": "2018-04-09"
        },
        "timeOfDay": {
          "from": "07:00",
          "until": "16:00"
        }
      },
      "who" : {
        "class": "construction"
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

```
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -118.2816343,
      34.0227093
    ]
  },
  "properties": {
    "location": {
      "shstRefId": "324af8ba918d9a2921b1fe6f9723d729",
      "shstLocation": 51.61148912,
      "ptRelation": 2,
      "direction": "forward",
      "sideOfStreet": "right",
      "marker": "sign",
      "objectID": 59463,
      "derivedFrom": "b2045"
    },
    "rule": {
      "what": {
        "activity": "parking",
      },
      "priority": 4,
      "when": {
        "daysOfWeek": {
          "days": [
            "Mo", "Tu", "We", "Th", "Fr", "Sa"
          ]
        },
        "designatedPeriod": {
          "name": "holidays",
          "apply": "except_during"
        },
      },
      "who" : {
        "class": "permit"
      }
    }  
  }
}
```
