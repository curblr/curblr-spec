# General

A Timespan object defines a contiguous or non-contiguous period of time. It is used to specify when a [Regulation](Regulation.md) applies. It supports variety of different concepts for expressing time which may be combined together.

Some of the concepts supported by Timespan:

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
| field name | format  | description | example |
| :--- | :--- | :--- | :--- |
| effective_dates | `object` or `array` | Specific date range (or multiple date ranges) that define a fixed span of time or an annual period | |
| effective_dates.from | `string` (`MMDD` or `YYYYMMDD`) | The beginning date of a time period. This is either a full date or a month and day that will define the timespan on an annual basis | `20180802` or `0401` |
| effective_dates.until | `string` (`MMDD` or `YYYYMMDD`) | The ending date of a time period. This is either a full date or a month and day that will define the timespan on an annual basis | `20180805` or `1130` |
| days_of_week | `object` | Determines which days of the week will be included in a timespan.
| days_of_week.days | `enum` (values: `Mo Tu We Th Fr Sa Su`) | List of days to include in the timespan | To specify weekdays: `["Mo", "Tu", "We", "Th", "Fr"]` |
| days_of_week.occurrence_in_month | `enum` (values: `1st 2nd 3rd 4th 5th last`) | Modifier to indicate which occurrences of the specified days within the month to include in the timespan | `["1st", "3rd"]` |
| days_of_month | `enum` (values: `1-31`, `last`, `odd`, `even`) | Specify specific days during the month to include in the timespan | To specify the 14th and last day of the month `["14", "last"]` |
| time_of_day | `object` or `array` | Specific time range during the day (or multiple time ranges) | |
| time_of_day.from | string (`HHMM`) | The beginning time (24H) of the time range | `0700` |
| time_of_day.until | string (`HHMM`) | The ending time (24H) of the time range | `0930` |
| designated_period | object | An arbitrary, externally-defined named period of time. Timespan can be defined to only apply during a designated period or at all times except during a designated period. | |
| designated_period.name | string | The name of designated period. | `Snow Emergency` or `Holidays` |
| designated_period.apply | string (`only_during` or `except_during`) | Will the designated period be excluded from the timespan or will the timespan only apply during the period. | Except Holidays: `except_during` or  During Snow Emergency: `only_during` |

When multiple "clauses" are combined in a single Timespan, a logical **AND** operation is applied. For example, a Timespan that includes Wednesdays and the period of February 1st through April 30th specifies all Wednesdays between February 1st and April 30th. It does not specify all Wednesdays during the year AND all days between February 1st and April 30th (the equivalent of a logical **OR** operation).

# Examples

### No Stopping at fire hydrant
Timespan applies at all times:
```
{
}
```

### No overnight parking
Timespan applies overnight (midnight until 6am).
```
{
  time_of_day: {
    from: "0000",
    until: "0600"
  }
}
```

### Rush hour (AM and PM) parking restriction
Timespan applies during the morning and evening rush hours.
```
{
  time_of_day: [
      {from: "0730",
       until: "0930"},
      {from: "1600",
       until: "1800"}
    ]
}
```

### No parking during snow emergency
Timespan in effect only during a snow emergency
```
{
  designated_period: {
    name: "Snow Emergency"
    apply: "only_during"
  }
}
```

### Meters in effect
Timespan applies Monday through Saturday between 8am and 8pm, except holidays.
```
{
  days_of_week: {
    days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  },
  time_of_day: {
    from: "0800",
    until: "2000"
  },
  designated_period {
    name: "Holidays"
    apply: "except_during"
  }
}
```

### Temporary construction permit
Timespan applies during designated construction hours (7am until 7pm) for the days during which the permit is valid (August 2nd, 2018 through August 5th, 2018)
```
{
  time_of_day: {
    from: "0700",
    until: "1900"
  },
  effective_dates: {
    from: "20180802",
    until: "20180805"
  }
}
```

### Alternate side parking for overnight snow removal
Timespan applies on odd number days between December 1st and March 31st from 1am until 6am.
```
{
  days_of_month: ['odd'],
  time_of_day: {
    from: "0100",
    until: "0600"
  },
  effective_dates: {
    from: "1201",
    until: "0331"
  }
}
```

### Bi-weekly street cleaning
Timespan applies between 11am and 1pm on the 2nd and 4th Tuesday of every month between April 1st and November 30th each year.
```
{
  days_of_week: {
    days: ['Tu'],
    occurrence_in_month: ['2nd', '4th']
  },
  time_of_day: {
    from: "1100",
    until: "1300"
  },
  effective_dates: {
    from: "0401",
    until: "1130"
  }
}
```
