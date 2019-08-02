# About time spans

A TimeSpan defines a contiguous or non-contiguous period of time. It is used to specify when a [Rule](Rule.md) applies, in order to form a complete [restriction](Restriction.md). It supports variety of different concepts for expressing time which may be combined together.

Multiple TimeSpans may be combined into the same "clause". Whether these are subject to a logical **AND** operation or a logical **OR** operation depends on their position within an array. The examples below provide additional context.

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
A GeoJSON feature may include TimeSpans made up of the following fields. The TimeSpan(s) are always expressed as an array in order to provide a consistent format regardless of whether a given restriction has a single or multiple TimeSpans. Several fields within the TimeSpan are always expressed as arrays for the same reason.

| Field name | Type | Description | Example
| :--- | :--- | :--- | :--- |
| effectiveDates | `array` | Specific date range (or multiple date ranges) that define a fixed span of time or an annual period | |
| effectiveDates.from | `string` (`MM-DD` or `YYYY-MM-DD`) | The beginning date of a time period. This is either a full date or a month and day that will define the timespan on an annual basis | `2018-08-02` or `04-01` |
| effectiveDates.to | `string` (`MMDD` or `YYYY-MM-DD`) | The ending date of a time period. This is either a full date or a month and day that will define the timespan on an annual basis | `2018-08-05` or `11-30` |
| daysOfWeek | `object` | Determines which days of the week will be included in a timespan.
| daysOfWeek.days | array of `enum` (`string`) Values: `Mo Tu We Th Fr Sa Su` | List of days to include in the timespan | To specify weekdays: `["Mo", "Tu", "We", "Th", "Fr"]` |
| daysOfWeek.occurrences_in_month | array of `enum`. Values: `1st 2nd 3rd 4th 5th last` | Modifier to indicate which occurrences of the specified days within the month to include in the timespan | `["1st", "3rd"]` |
| daysOfMonth | array of `enum` (`string`) Values: `1-31`, `last`, `odd`, `even` | Specify specific days during the month to include in the timespan | To specify the 14th and last day of the month `["14", "last"]` |
| timesOfDay | `array` | Specific time range during the day (or multiple time ranges) | |
| timesOfDay.from | `string` (`HH:MM`) | The beginning time (24H) of the time range | `07:00` |
| timesOfDay.until | `string` (`HH:MM`) | The ending time (24H) of the time range | `09:30` |
| designatedPeriods | `array` | An arbitrary, externally-defined named period of time. TimeSpan can be defined to only apply during a designated period or at all times except during a designated period. | |
| designatedPeriods.name | `string` | The name of designated period. | `snow emergency` or `holidays` |
| designatedPeriods.apply | `enum` (`string`) Values: `only_during` or `except_during` | Will the designated period be excluded from the timespan or will the timespan only apply during the period. | Except Holidays: `except_during` or  During Snow Emergency: `only_during` |

When multiple "clauses" are combined in a single TimeSpan, a logical **AND** operation is applied. For example, a TimeSpan that includes Wednesdays and the period of February 1st through April 30th specifies all Wednesdays between February 1st and April 30th. It does not specify all Wednesdays during the year AND all days between February 1st and April 30th (the equivalent of a logical **OR** operation).

When multiple "clauses" are part of a single TimeSpan field but defined in separate TimeSpans, a logical **OR** operation is applied. For example, a restriction may contain a TimeSpan that specifies weekdays from 9am-5pm, and another TimeSpan that specifies weekends from 11-2. See examples below for further clarification.

# Examples

### No standing at fire hydrant
TimeSpan applies at all times.
```
{
}
```

### No overnight parking
TimeSpan applies overnight (midnight until 6am).
```json
{
  "timeSpans": [
    {
      "timesOfDay": [
        {
          "from": "00:00",
          "until": "06:00"
        }
      ]
    }
  ]
}
```

### Rush hour (AM and PM) parking restriction
TimeSpan applies during the morning **and** evening rush hours. Providing the two times of day as separate "clauses" in an array means that a logical **OR** expression is applied.
```JSON
{
  "timeSpans": [
    {
      "timesOfDay": [
        {"from": "07:30",
         "until": "09:30"},
        {"from": "16:00",
         "until": "18:00"}
      ]
    }
  ]
}
```

### Different weekday and weekend time periods
TimeSpan applies on weekdays from 8am to 8pm, **and** on Sundays from 11am to 8pm. Providing the two times of day as separate "clauses" in an array means that a logical **OR** expression is applied.
```json
{
  "timeSpans": [
    {
      "daysOfWeek": {
        "days": [
          "Mo", "Tu", "We", "Th", "Fr"
        ]
      },
      "timesOfDay": [
        {
          "from": "08:00",
          "until": "20:00"
        }
      ]
    },
    {
      "daysOfWeek": {
        "days": ["Su"]
      },
      "timesOfDay": [
        {
          "from": "11:00",
          "until": "20:00"
        }
      ]
    }
  ]
}
```

### No parking during snow emergency
TimeSpan in effect only during a snow emergency.
```json
{
  "timeSpans": [
    {
      "designatedPeriods": [
        {
          "name": "snow emergency",
          "apply": "only_during"
        }
      ]
    }
  ]
}
```

### Meters in effect
TimeSpan applies Monday through Saturday between 8am and 8pm, except holidays.
```json
{
  "timeSpans": [
    {
      "daysOfWeek": {
        "days": [
          "Mo", "Tu", "We", "Th", "Fr", "Sa"
        ]
      },
      "timesOfDay": [
        {
          "from": "08:00",
          "until": "20:00"
        }
      ],
      "designatedPeriods": [
        {
          "name": "holidays",
          "apply": "except_during"
        }
      ]
    }
  ]
}
```

### Temporary construction permit
TimeSpan applies during designated construction hours (7am until 7pm) for the days during which the permit is valid (August 2nd, 2018 through August 5th, 2018).
```json
{
  "timeSpans": [
    {
      "timesOfDay": [
        {
          "from": "07:00",
          "until": "19:00"
        },
      ],
      "effectiveDates": [
        {
          "from": "2018-08-02",
          "until": "2018-08-05"
        }
      ]
    }
  ]
}
```

### Alternate side parking for overnight snow removal
TimeSpan applies on odd number days between December 1st and March 31st from 1am until 6am.
```json
{
  "timeSpans": [
    {
      "daysOfMonth": ["odd"],
      "timesOfDay": [
        {
          "from": "01:00",
          "until": "06:00"
        }
      ],
      "effectiveDates": [
        {
          "from": "12-01",
          "until": "03-31"
        }
      ]
    }
  ]
}
```

### Bi-weekly street cleaning
TimeSpan applies between 11am and 1pm on the 2nd and 4th Tuesday of every month between April 1st and November 30th each year.
```json
{
  "timeSpans": [
    {
      "daysOfWeek": {
        "days": ["Tu"],
        "occurrences_in_month": ["2nd", "4th"]
      },
      "timesOfDay": [
        {
          "from": "11:00",
          "until": "13:00"
        }
      ],
      "effectiveDates": [
        {
          "from": "04-01",
          "until": "11-30"
        }
      ]
    }
  ]
}
```
