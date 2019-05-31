# No stopping

No Stopping is allowed by anyone at any time. Example location information is included.

### **Sign**

<img src="images/no_stopping.jpg" width="300">

### **CurbSpec**
```
{
  "x": -118.376341,
  "y": 34.086525,
  "shst_ref_id": "324af8ba918d9a2921b1fe6f9723d729",
  "shst_location": 51.61148912,
  "pt_relation": 2,
  "direction": "forward",
  "side_of_street": "left",
  "rule": {
    "what": {
      "zone": "no stopping",
      "reason": "tow-away zone"
    },
    "priority": 4
  }
}
```

# Snow emergency
No one may park during snow emergencies. Example location information is included.

### **Sign**

<img src="images/snow_emergency.jpg" width="300">

### **CurbSpec**

```
{
  "x": -118.376341,
  "y": 34.086525,
  "shst_ref_id": "324af8ba918d9a2921b1fe6f9723d729",
  "shst_location": 51.61148912,
  "pt_relation": 0,
  "direction": "forward",
  "side_of_street": "right",
  "rule": {
    "what": {
      "zone": "no parking",
      "reason": "snow emergency zone"
    },
    "priority": 2,
    "when": {
      "designated_period": {
        "name": "snow emergency",
        "apply": "only_during"
      }
    }
  }
}
```

# Car share vehicles
Only Enterprise CarShare vehicles may park. All others are prohibited at all times (this is implied and does not need to be specified).

### **Sign**

<img src="images/car_share.jpg" width="300">

### **CurbSpec**

```
{
  "x": -118.376341,
  "y": 34.086525,
  "shst_ref_id": "324af8ba918d9a2921b1fe6f9723d729",
  "shst_location": 51.61148912,
  "pt_relation": 1,
  "direction": "forward",
  "side_of_street": "right",
  "rule": {
    "what": {
      "zone": "parking",
      "reason": "car share only"
    },
    "priority": 4,
  }
}
```

# Temporary construction zone
All vehicles except permitted construction vehicles are prohibited from standing between 7am and 4pm on April 9th, 2018.

### **Sign**

<img src="images/temporary_construction_zone.jpg" width="300">

### **CurbSpec**


```
{ // defines a parking zone for construction vehicles
  "x": -118.376341,
  "y": 34.086525,
  "shst_ref_id": "324af8ba918d9a2921b1fe6f9723d729",
  "shst_location": 51.61148912,
  "pt_relation": 2,
  "direction": "forward",
  "side_of_street": "right",
  "rule": {
    "what": {
      "zone": "parking",
      "reason": "construction vehicles only"
    },
    "priority": 2,
    "when": {
      "effective_dates": {
        "from": "20180409",
        "to": "20180409"
      },
      "time_of_day": {
        "from": "0700",
        "until": "1600"
      }
    },
    "who" : {
      "class": "construction"
    }
  }
},

{ // defines a no standing zone for all other vehicles
  "x": -118.376341,
  "y": 34.086525,
  "shst_ref_id": "324af8ba918d9a2921b1fe6f9723d729",
  "shst_location": 51.61148912,
  "pt_relation": 2,
  "direction": "forward",
  "side_of_street": "right",
  "rule": {
    "what": {
      "zone": "standing",
      "reason": "construction vehicles only"
    },
    "priority": 2,
    "when": {
      "effective_dates": {
        "from": "20180409",
        "to": "20180409"
      },
      "time_of_day": {
        "from": "0700",
        "until": "1600"
      }
    },
    "who" : {
      "class": "construction"
    }
  }
}
```


# Resident parking
Parking allowed only for resident permit holders Monday through Saturday, except holidays.

### **Sign**

<img src="images/resident_parking.jpg" width="300">

### **CurbSpec**

```
{
  "x": -118.376341,
  "y": 34.086525,
  "shst_ref_id": "324af8ba918d9a2921b1fe6f9723d729",
  "shst_location": 51.61148912,
  "pt_relation": 2,
  "direction": "forward",
  "side_of_street": "right",
  "rule": {
    "what": {
      "zone": "parking"
    },
    "priority": 4,
    "when": {
      "days_of_week": {
        "days": [
          "Mo", "Tu", "We", "Th", "Fr", "Sa"
        ]
      },
      "designated_period": {
        "name": "holidays",
        "apply": "except_during"
      },
    },
    "who" : {
      "class": "permit"
    }
  }
}
```
