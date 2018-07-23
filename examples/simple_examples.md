# No stopping

No Stopping is allowed by anyone at any time.

### **Sign**

<img src="images/no_stopping.jpg" width="300">

### **CurbSpec**
```
{
  rules: {
    rule: "No Stopping"
  },
  priority: 4
}
```

# Snow emergency
No one may park during snow emergencies.

### **Sign**

<img src="images/snow_emergency.jpg" width="300">

### **CurbSpec**

```
{
  rules: {
    rule: "No Parking",
    reason: "Snow Emergency Route"
  },
  priority: 2,
  when: {
    designated_period: {
      name: "Snow Emergency",
      apply: "only_during"
    }
  }
}
```
# Car share vehicles
Only Enterprise CarShare vehicles may park. All others are prohibited at all times.

### **Sign**

<img src="images/car_share.jpg" width="300">

### **CurbSpec**

```
{
  rules: [
    { // applies Enterprise car share vehicles
      rule: "Parking",
      who: {
        class: "Car Share",
        subclass: "Enterprise"
      }
    },
    { // applies to everyone else
      rule: "No Parking",
      reason: "Car Share Vehicles Only"
    }
  ],
  priority: 4
}
```

# Temporary construction zone
All vehicles except permitted construction vehicles are prohibited from standing between 7am and 4pm on April 9th, 2018.

### **Sign**

<img src="images/temporary_construction_zone.jpg" width="300">

### **CurbSpec**

```
{
  rules: [
    { // applies to construction vehicles
      rule: "Parking",
      who: {
        class: "Construction Vehicles"
      }
    },
    { // applies to everyone else
      rule: "No Standing",
      reason: "Construction Vehicles Only"
    }
  ],
  priority: 2,
  when: {
    effective_dates: {
      from: "20180409",
      until: "20180409"
    },
    time_of_day: {from: "0700", until: "1600"}
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
  when: {
    days_of_week: {
      days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"]
    },
    designated_period: {
      name: "Holidays",
      apply: "except_during"
    }
  },
  rules: [
    { // this rule applies to people with permits
      rule: "Parking",
      who: {
        class: "Resident Permit"
      }
    },
    { // this rule applies to everyone else
      rule: "No Parking"
    }
  ],
  priority: 4
}
```

# Time limited meter parking
Parking is limited to two hours between 8am and 8pm Monday through Saturday. Payment is required.

### **Sign**

<img src="images/meter_parking_time_limit.jpg" width="350">

### **CurbSpec**

```
{  
  rules: {
    rule: "Parking",
    time_limit: 120,
    payment: "yes"
  },
  priority: 4,
  when: {
    days_of_week: {
      days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"]
    },
    time_of_day: {from: "0800", until: "2000"}
  }
}
```

# Street cleaning
No parking allowed between 6am and 8am on the 2nd and 4th Wednesday of each month between April 1st and November 30th of every year.

### **Sign**

<img src="images/street_cleaning.jpg" width="350">

### **CurbSpec**

```
{
  rules: {
    rule: "No Parking",
    reason: "Street Cleaning"
  }
  priority: 3,
  when: {
    time_of_day: {from: "0600", until: "0800"},
    days_of_week: {
      days: ["We"],
      occurrence_in_month: ["2nd", "4th"]
    },
    effective_dates: {
      from: "0401",
      until: "1130
    }
  }
}
```

# Odd/even parking restrictions
No parking between 2am and 6am on the odd side of the street on odd days and the even side of the street on even days.

### **Sign**

<img src="images/odd_even.jpg" width="300">

### **CurbSpec**

```
// this regulation applied to odd side locations
{
  rules: {
    rule: "No Parking",
  },
  priority: 3,
  when: {
    time_of_day: {from: "0200", until: "0600"},
    days_of_month: "odd"
  }
}

// this regulation applied to even side locations
{
  rules: {
    rule: "No Parking",
  },
  priority: 3,
  when: {
    time_of_day: {from: "0200", until: "0600"},
    days_of_month: "even"
  }
}
```

# Prohibit specific users
No parking by Kardashians at any time.

### **Sign**

<img src="images/no_kardashians.jpg" width="300">

### **CurbSpec**

```
{
  rules: {
    rule: "No Parking",
    who: {
      class: "Kardashian"
    }
  },
  priority: 2
}
```
