# About timespans

### Note: feedback wanted - should this use OSM `opening_hours` format instead?

A TimeSpan defines a contiguous or non-contiguous period of time. It is used to specify when a [Restriction](Restriction.md) applies. It supports variety of different concepts for expressing time which may be combined together.

Multiple TimeSpans may be combined into the same `when` "clause". Whether these are subject to a logical **AND** operation or a logical **OR** operation depends on their position within an array. The examples below provide additional context.

Some of the concepts supported by TimeSpan:

| Type | Description | Example(s) |
| :--- | :--- | :--- |
| *time of day* | A span of time during a day | `between 7am and 9:30am` |
| *day of week* | Specific days of the week | `Monday` or `Weekdays` |
| *day of month* | Specific days each month | `15th day of month` or `last day of the month` or `odd numbered days` |
| *selected day of week* | Certain days of the week within each month | `1st and 3rd Friday of the month` or `odd-numbered Thursdays` |
| *fixed date ranges* | Specific date ranges | `August 2nd, 2018 through August 5th, 2018` |
| *annual date ranges* | Date ranges that apply every year | `April 1st through November 30th` |
| *designated periods* | Externally-defined named designations for time periods | `Holidays` or `Game Days` or `Snow Emergencies` |

# Definition
A JSON object may include `when` fields made up of the following:

| Field name | Type | Description | Example
| :--- | :--- | :--- | :--- |
| effective_dates | `object` or `array` | Specific date range (or multiple date ranges) that define a fixed span of time or an annual period | |
| effective_dates.from | `string` (`MMDD` or `YYYYMMDD`) | The beginning date of a time period. This is either a full date or a month and day that will define the timespan on an annual basis | `20180802` or `0401` |
| effective_dates.to | `string` (`MMDD` or `YYYYMMDD`) | The ending date of a time period. This is either a full date or a month and day that will define the timespan on an annual basis | `20180805` or `1130` |
| days_of_week | `object` | Determines which days of the week will be included in a timespan.
| days_of_week.days | `enum` (`string`) Values: `Mo Tu We Th Fr Sa Su` | List of days to include in the timespan | To specify weekdays: `["Mo", "Tu", "We", "Th", "Fr"]` |
| days_of_week.occurrence_in_month | `enum` Values: `1st 2nd 3rd 4th 5th last` | Modifier to indicate which occurrences of the specified days within the month to include in the timespan | `["1st", "3rd"]` |
| days_of_month | `enum` (`string`) Values: `1-31`, `last`, `odd`, `even` | Specify specific days during the month to include in the timespan | To specify the 14th and last day of the month `["14", "last"]` |
| time_of_day | `object` or `array` | Specific time range during the day (or multiple time ranges) | |
| time_of_day.from | `string` (`HHMM`) | The beginning time (24H) of the time range | `0700` |
| time_of_day.to | `string` (`HHMM`) | The ending time (24H) of the time range | `0930` |
| designated_period | `object` | An arbitrary, externally-defined named period of time. Timespan can be defined to only apply during a designated period or at all times except during a designated period. | |
| designated_period.name | `string` | The name of designated period. | `snow emergency` or `holidays` |
| designated_period.apply | `enum` (`string`) Values: `only_during` or `except_during` | Will the designated period be excluded from the timespan or will the timespan only apply during the period. | Except Holidays: `except_during` or  During Snow Emergency: `only_during` |

When multiple "clauses" are combined in a single TimeSpan, a logical **AND** operation is applied. For example, a TimeSpan that includes Wednesdays and the period of February 1st through April 30th specifies all Wednesdays between February 1st and April 30th. It does not specify all Wednesdays during the year AND all days between February 1st and April 30th (the equivalent of a logical **OR** operation).

When multiple "clauses" are part of a single `when` field but defined in separate TimeSpans, a logical **OR** operation is applied. For example, a rule may contain a TimeSpan that specifies weekdays from 9am-5pm, and another TimeSpan that specifies weekends from 11-2. See examples below for further clarification.

# Examples

### No standing at fire hydrant
TimeSpan applies at all times
```
{
}
```

### No overnight parking
TimeSpan applies overnight (midnight until 6am)
```
{
  "when":
    time_of_day: {
      "from": "0000",
      "to": "0600"
  }
}
```

### Rush hour (AM and PM) parking restriction
TimeSpan applies during the morning **and** evening rush hours. Providing the two times of day as separate "clauses" in an array means that a logical **OR** expression is applied
```
{
  "when":
    "time_of_day": [
      {"from": "0730",
       "to": "0930"},
      {"from": "1600",
       "to": "1800"}
    ]
}
```

### Different weekday and weekend time periods
TimeSpan applies on weekdays from 8am to 8pm, **and** on Sundays from 11am to 8pm. Providing the two times of day as separate "clauses" in an array means that a logical **OR** expression is applied.
```
{
  "when": [
    {
      "days_of_week": {
        "days": [
          "Mo", "Tu", "We", "Th", "Fr"
        ]
      },
      "time_of_day": {
        "from": "0800",
        "to": "2000"
      }
    },
    {
      "days_of_week": [
        "Su"
      ],
      "time_of_day": {
        "from": "1100",
        "to": "2000"
      }
    }
  ]
}
```

### No parking during snow emergency
TimeSpan in effect only during a snow emergency
```
{
  "when:
    "designated_period": {
      "name": "snow emergency"
      "apply": "only_during"
    }
}
```

### Meters in effect
TimeSpan applies Monday through Saturday between 8am and 8pm, except holidays
```
{
  "when": {
    "days_of_week": {
      "days": [
        "Mo", "Tu", "We", "Th", "Fr", "Sa"
      ]
    },
    "time_of_day": {
      "from": "0800",
      "to": "2000"
    },
    "designated_period" {
      "name": "holidays"
      "apply": "except_during"
    }
  }
}
```

### Temporary construction permit
TimeSpan applies during designated construction hours (7am until 7pm) for the days during which the permit is valid (August 2nd, 2018 through August 5th, 2018)
```
{
  "when": {
    "time_of_day": {
      "from": "0700",
      "to": "1900"
    },
    "effective_dates": {
      "from": "20180802",
      "to": "20180805"
    }
  }
}
```

### Alternate side parking for overnight snow removal
TimeSpan applies on odd number days between December 1st and March 31st from 1am until 6am
```
{
  "when": {
    "days_of_month": [
      "odd"
    ],
    "time_of_day": {
      "from": "0100",
      "to": "0600"
    },
    "effective_dates": {
      "from": "1201",
      "to": "0331"
    }
  }
}
```

### Bi-weekly street cleaning
TimeSpan applies between 11am and 1pm on the 2nd and 4th Tuesday of every month between April 1st and November 30th each year
```
{
  "when": {
    "days_of_week": {
      "days": [
        "Tu"
      ],
      "occurrence_in_month": ["2nd", "4th"]
    },
    "time_of_day": {
      "from": "1100",
      "to": "1300"
    },
    "effective_dates": {
      "from": "0401",
      "to": "1130"
    }
  }
}
```
