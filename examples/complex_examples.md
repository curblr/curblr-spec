# Time limited parking with permit exemption
Any vehicle may park at this location, but vehicles without an 'F' or 'N' permit are limited to 2 hours between 9am and 6pm Monday through Friday.

### **Sign**

<img src="images/time_limit_with_permit_exemption.jpg" width="300">

### **CurbSpec**

```
{
  when: {
    days_of_week: {
      days: ["Mo", "Tu", "We", "Th", "Fr"]
    },
    time_of_day: {from: "0900", until: "1800"}
  },
  rules: [
    { // this rule applies to people with F permits
      rule: "Parking",
      who: {
        class: "Resident Permit"
        subclass: "Zone F"
      }
    },
    { // this rule applies to people with N permits
      rule: "Parking",
      who: {
        class: "Resident Permit"
        subclass: "Zone N"
      }
    },
    { // this rule applies to everyone else
      rule: "Parking",
      time_limit: 120
    }
  ],
  priority: 4
}
```

# Time limited parking with permit exemption and multiple no parking periods
No vehicles may park between 6pm and 8am daily due to overnight parking restrictions, or between 1pm and 3pm on Wednesday for street cleaning. Between 8am and 6pm, vehicles without a Zone 5 permit are limited to two hours.

### **Sign**

<img src="images/time_limit_with_permit_exemption_multiple.jpg" width="300">

### **CurbSpec**

```
// overnight parking regulation
{
  when: {
    time_of_day: [
      {from: "0000", until: "0800"},
      {from: "1800", until: "0000"}
    ]
  },
  rules: {
    rule: "No Parking"
    reason: "Overnight parking prohibited"
  },
  priority: 3
}

// street cleaning regulation
{
  when: {
    days_of_week: {
      days: ["We"]
    },
    time_of_day: {from: "1300", until: "1500"}
  },
  rules: {
    rule: "No Parking"
    reason: "Street cleaning"
  },
  priority: 3
}   

// allowed daytime parking regulation
{
  when: {
    time_of_day: {from: "0800", until: "1800"}
  },
  rules: [
    { // this rule applies to Zone 5 permits
      rule: "Parking",
      who: {
        class: "Resident Permit"
        subclass: "Zone 5"
      }
    },
    { // this rule applies to everyone else
      rule: "Parking",
      time_limit: 120
    }
  ],
  priority: 4
}
```


# No parking for snow removal (fixed and variable times)
Between December 1st and April 1st of each year, no one may park between 3am and 7am to facilitate snow removal. Parking is also prohibited when there is more than 2" of snow regardless of the time or date.

### **Sign**

<img src="images/snow_removal.jpg" width="300">

### **CurbSpec**

```
// regulation that applies after a specific amount of snowfall
{
  rules: {
    rule: "No Parking",
    reason: "Snow Emergency Route"
  },
  priority: 2,
  when: {
    designated_period: {
      name: "Snow Over 2 Inches",
      apply: "only_during"
    }
  }
}

// regulation that applies during the winter regardless of snowfall
{
  rules: {
    rule: "No Parking",
    reason: "Snow Emergency Route"
  },
  priority: 3,
  when: {
    effective_dates: {from: "1201", until: "0401"},
    time_of_day: {from:"0300", until: "0700"}
  }
}
```

# Dual allowed use and rush hour parking restriction
No vehicles may stop between 7am and 9:30am or between 4pm and 6:30pm Monday through Friday. From 9:30am to 4pm and from 6:30pm to 7:30pm Monday through Friday may be used as 2 hour parking for vehicles with a handicap placard or as a 15 minute loading zone for all others.

### **Sign**

<img src="images/dual_use_rush_hour.jpg" width="350">

### **CurbSpec**

```
// rush hour no stopping regulation
{
  when: {
    days_of_week: {
      days: ["Mo", "Tu", "We", "Th", "Fr"]
    },
    time_of_day: [
      {from: "0700", until: "0930"}
      {from: "1600", until: "1830"}
    ]
  },
  rules: {
    rule: "No Stopping"
  },
  priority: 3
}

// combination load zone / handicap parking regulation
{
  when: {
    days_of_week: {
      days: ["Mo", "Tu", "We", "Th", "Fr"]
    },
    time_of_day: [
      {from: "0930", until: "1600"},
      {from: "1830", until: "1930"}
    ]
  },
  rules: [
    { // rule applies to handicap placards
      rule: "Parking",
      who: {
        class: "Handicap"
      },
      time_limit: 120
    },
    { // rule applies to everyone else
      rule: "Loading Zone",
      time_limit: 15
    }
  ],
  priority: 4
}   

```

# Complex time and user dependent regulations
No vehicles may stop between 3:30pm and 6:30pm Monday through Friday. Truck loading zone only between 6am and 10am Monday through Friday with a one hour limit. Two hour parking allowed between 10am and 3:30pm Monday through Friday, 6:30pm and 10pm Monday through Friday, and 8am to 10pm Saturday and Sunday.

### **Sign**

<img src="images/complex_time_use.jpg" width="350">

### **CurbSpec**

```
// rush hour no stopping regulation
{
  when: {
    days_of_week: {
      days: ["Mo", "Tu", "We", "Th", "Fr"]
    },
    time_of_day: {from: "1530", until: "1830"}
  },
  rules: [
    {
      rule: "No Stopping"
    }
  ],
  priority: 3
}

// truck loading regulation
{
  when: {
    days_of_week: {
      days: ["Mo", "Tu", "We", "Th", "Fr"]
    },
    times_of_day: {from: "0600", until: "1000"}
  },
  rules: [
    { // rule applies to trucks
      rule: "Loading Zone",
      who: {
        class: "truck"
      },
      time_limit: 60
    },
    { // rule applies to everyone else
      rule: "No Parking"
      reason: "Truck loading only"
    }
  ],
  priority: 4
}   

// weekday allowed daytime parking regulation
{
  when: {
    days_of_week: {
      days: ["Mo", "Tu", "We", "Th", "Fr"]
    },
    times_of_day: [
      {from: "1000", until: "1530"},
      {from: "1830", until: "2200"},
    ]
  },
  rules: {
    rule: "Parking",
    time_limit: 120,
    payment: "yes"
  },
  priority: 4
}   

// weekend allowed daytime parking regulation
{
  when: {
    days_of_week: {
      days: ["Sa", "Su"]
    },
    times_of_day: {from: "0800", until: "2200"}
  },
  rules: {
    rule: "Parking",
    time_limit: 120
  },
  priority: 4
}   
```

# Combination permit only and meter parking with user-specific payment rules
Only vehicles with a Zone F permit may park from 6:30pm to 8:00pm Monday through Saturday, and from 2pm to 4pm on Saturday. Anyone may park from 9am until 6:30pm Monday through Friday, and from 9am to 2pm and 4pm to 6:30pm on Saturday, but vehicles without a Zone F permit must pay.

### **Sign**

<img src="images/permit_meter_complex_payment.jpg" width="350">

### **CurbSpec**

```
// allowed weekday parking regulation
{
  when: {
    days_of_week: {
      days: ["Mo", "Tu", "We", "Th", "Fr"]
    },
    time_of_day: {from: "0900", until: "1830"}
  },
  rules: [
    {
      rule: "Parking"
      who: {
        class: "Permit",
        subclass: "Zone F"
      },
      payment: "no" // this the default, but specified here for clarity
    },
    { // applies to everyone else
      rule: "Parking"
      payment: "yes"
    }
  ],
  priority: 4
}

// weekday resident only parking regulation
{
  when: {
    days_of_week: {
      days: ["Mo", "Tu", "We", "Th", "Fr"]
    },
    time_of_day: {from: "1830", until: "2000"}
  },
  rules: [
    {
      rule: "Parking"
      who: {
        class: "Permit",
        subclass: "Zone F"
      }
    },
    { // applies to everyone else
      rule: "No Parking"
    }
  ],
  priority: 4
}

// allowed Saturday parking regulation
{
  when: {
    days_of_week: {
      days: ["Sa"]
    },
    time_of_day: [
      {from: "0900", until: "1400"},
      {from: "1600", until: "1830"}
    ]
  },
  rules: [
    {
      rule: "Parking"
      who: {
        class: "Permit",
        subclass: "Zone F"
      },
      payment: "no" // this the default, but specified here for clarity
    },
    { // applies to everyone else
      rule: "Parking"
      payment: "yes"
    }
  ],
  priority: 4
}

// Saturday resident only parking regulation
{
  when: {
    days_of_week: {
      days: ["Sa"]
    },
    time_of_day: [
      {from: "1400", until: "1600"},
      {from: "1830", until: "2000"}
    ]
  },
  rules: [
    {
      rule: "Parking"
      who: {
        class: "Permit",
        subclass: "Zone F"
      }
    },
    { // applies to everyone else
      rule: "No Parking"
    }
  ],
  priority: 4
}

```

# School loading zone, time limited parking with permit exemption, and multiple no parking periods
On school days only 5 minute passenger loading is permitted from 6:30am to 9am and from 1:30pm to 4pm. No vehicles may park between 6pm and 8am daily due to overnight parking restrictions, or between 10am and 1pm on Monday for street cleaning. Between 8am and 6pm, vehicles without a Zone 64 permit are limited to 2 hours.

_[Editor's Note: The school day regulation overlaps with both the overnight no parking and the 2 hour allowed parking regulations. To avoid ambiguity about which rule is in effect, the school day regulation is given a higher priority than the other regulations.]_

### **Sign**

<img src="images/tower_of_signs.jpg" width="350">

### **CurbSpec**

```
// school day loading zone regulation
{
  when: {
    time_of_day: [
      {from: "0630", until: "0900"},
      {from: "1330", until: "1600"}
    ],
    designated_period: {
      name: "School Days",
      apply: "only_during"
    }
  },
  rules: [
    {
      rule: "Passenger Loading Zone",
      reason: "School pick up / drop off only"
      time_limit: 5
    }
  ],
  priority: 2
}

// overnight parking regulation
{
  when: {
    time_of_day: [
      {from: "0000", until: "0800"},
      {from: "1800", until: "0000"}
    ]
  },
  rules: {
    rule: "No Parking"
    reason: "Overnight parking prohibited"
  },
  priority: 3
}

// street cleaning regulation
{
  when: {
    days_of_week: {
      days: ["Mo"]
    },
    time_of_day: {from: "1000", until: "1300"}
  },
  rules: {
    rule: "No Parking"
    reason: "Street cleaning"
  },
  priority: 3
}   

// allowed daytime parking regulation
{
  when: {
    time_of_day: {from: "0800", until: "1800"}
  },
  rules: [
    { // this rule applies to Zone 64 permits
      rule: "Parking",
      who: {
        class: "Permit"
        subclass: "Zone 64"
      }
    },
    { // this rule applies to everyone else
      rule: "Parking",
      time_limit: 120
    }
  ],
  priority: 4
}
```
