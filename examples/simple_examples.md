# No stopping

No Stopping is allowed by anyone at any time.

### **Sign**

<img src="http://cdn.shopify.com/s/files/1/0544/7277/products/IMG_8490_5ed7374d-11f9-4667-8fbd-480f9e74bbfb_grande.JPG?v=1520789932" width="300">

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

<img src="https://thumb1.shutterstock.com/display_pic_with_logo/60395/60395,1161046392,3/stock-photo-emergency-snow-route-sign-washington-dc-2008808.jpg" width="300">

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

<img src="http://northendwaterfront.com/wp-content/uploads/2015/10/IMG_6081-e1445556658379.jpg" width="300">

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

<img src="https://lh3.googleusercontent.com/sYoHLHJfiyvNtLxu93Je4LiWEuDdprGUDSCex9Mkt_TPS6Rd-dWF1KpZnzXmB0CAy7pmtYMOILHfZFEmwPh3ULPiVbdOmwjqTfxMkga4YRHRPust4XcfBEwGBqScnx5_Cxh322N03kZO9y0yKWuNs_Rah7cyZG-wfsb_6muHDV8iD2t_M1IdFVPA7i_UCcHQN-4tvFaO7p1tFgKQof0i-6Yqeq8BbTCjv33MF4iTCrcm4FilN5WkII-ZZVdF_ssxjc4G3kWBRskEhSRLJyvBgpoi0q_snqGMtleYjQVyLKCjfRwrLwyE8pOLCCmpoWA4otNVkK52aI5N7mq1JM0Afq24PbLYCTVY1BG08_Ez1QcVm4Os8246KPBLB8O_8tggr-0ZXh_-RP_fBI6k_otojx4p25DhAuYwEyb5fYhuwvHjM_52ecfHeosz-WLw6aN7zgE2Vh7lXT9_XlrWE6WiHry-b8yKfw-GoTAEtzIPnG6qwuO2BUSjXLSKsS3bTTR57d1PUxGumJ-2ugRg8E5eZ1b4JduhYhq4AR6TOV_ZorWrzvWOIGNmLAJ7sY2-g-J3CxNpV9bh7duMa5lRTxKuQ9C_9merBaDMnhGiD_ieku8TofX-m12mJ7DWE5ThRh70tiWeZ--IyeCDjzlN5ZjH8cxVHB_C3rkuxQ=w1080-h1476-no" width="300">

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

<img src="http://www.boston.com/yourtown/news/assets_c/2010/11/calebneelon01-thumb-200x274-26462.jpg" width="300">

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

<img src="https://hips.htvapps.com/htv-prod/ibmig/cms/image/wcvb/40895610-boston-parking-sign-generic-0726-jpg.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*" width="350">

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

<img src="http://www.bostonstreetcleaning.com/images/boston_850.jpg" width="350">

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

<img src="https://www.gannett-cdn.com/-mm-/5669a6ca8f152154303a7ec32c5b3a37970c3d09/c=227-0-3652-2576&r=x404&c=534x401/local/-/media/Ithaca/2014/10/30/parkingsign.jpg" width="300">

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

<img src="http://ichef.bbci.co.uk/news/976/mcs/media/images/82191000/jpg/_82191363_pj_no_kardashain_parking_signs-206-1.jpg" width="300">

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
