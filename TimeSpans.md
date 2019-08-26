# About time spans

A TimeSpan defines a contiguous or non-contiguous period of time. It is used to specify when a [Rule](Rule.md) applies, in order to form a complete [regulation](Regulations.md). It supports variety of different concepts for expressing time which may be combined together.

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
A GeoJSON feature may include TimeSpans made up of the following fields. The TimeSpan(s) are always expressed as an array in order to provide a consistent format regardless of whether a given regulation has a single or multiple TimeSpans. Several fields within the TimeSpan are always expressed as arrays for the same reason.

| Field name | Type | Description | Example
| :--- | :--- | :--- | :--- |
| effectiveDates | `array` | Specific date range (or multiple date ranges) that define a fixed span of time or an annual period | |
| effectiveDates.from | `string` (`MM-DD` or `YYYY-MM-DD`) | The beginning date of a time period. This is either a full date or a month and day that will define the timespan on an annual basis | `2018-08-02` or `04-01` |
| effectiveDates.to | `string` (`MMDD` or `YYYY-MM-DD`) | The ending date of a time period. This is either a full date or a month and day that will define the timespan on an annual basis | `2018-08-05` or `11-30` |
| daysOfWeek | `object` | Determines which days of the week will be included in a timespan.
| daysOfWeek.days | array of `enum` (`string`) Values: `mo tu we th fr sa` | List of days to include in the timespan | To specify weekdays: `["mo", "tu", "we", "th", "fr"]`|
| daysOfWeek.occurrencesInMonth | array of `enum`. Values: `1st 2nd 3rd 4th 5th last` | Modifier to indicate which occurrences of the specified days within the month to include in the timespan | `["1st", "3rd"]` |
| daysOfMonth | array of `enum` (`string`) Values: `1-31`, `last`, `odd`, `even` | Specify specific days during the month to include in the timespan | To specify the 14th and last day of the month `["14", "last"]` |
| timesOfDay | `array` | Specific time range during the day (or multiple time ranges) | |
| timesOfDay.from | `string` (`HH:MM`) | The beginning time (24H) of the time range | `07:00` |
| timesOfDay.to | `string` (`HH:MM`) | The ending time (24H) of the time range | `09:30` |
| designatedPeriods | `array` | An arbitrary, externally-defined named period of time. TimeSpan can be defined to only apply during a designated period or at all times except during a designated period. | |
| designatedPeriods.name | `string` | The name of designated period. | `snow emergency` or `holidays` |
| designatedPeriods.apply | `enum` (`string`) Values: `only during` or `except during` | Will the designated period be excluded from the timespan or will the timespan only apply during the period. | Except Holidays: `except during` or  During Snow Emergency: `only during` |

When multiple "clauses" are combined in a single TimeSpan, a logical **AND** operation is applied. For example, a TimeSpan that includes Wednesdays and the period of February 1st through April 30th specifies all Wednesdays between February 1st and April 30th. It does not specify all Wednesdays during the year AND all days between February 1st and April 30th (the equivalent of a logical **OR** operation).

When multiple "clauses" are part of a single TimeSpan field but defined in separate TimeSpans, a logical **OR** operation is applied. For example, a regulation may contain a TimeSpan that specifies weekdays from 9am-5pm, and another TimeSpan that specifies weekends from 11-2. See examples below for further clarification.

Data fields should generally be considered case insensitive since they are used programmatically; we use lower-case in our examples, except for fields that would be used for display purposes (such as a street name or agency name).


# Examples

The links below show real world curb regulations translated into CurbLR.

| Link | Description |
| :---- | :---- |
| [Examples of simple regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic restrictions  |
| [Examples of complex regulations](examples/complex_examples.md) | Complex regulatory scenarios typically involving several restrictions  |
| Large dataset of [Los Angeles' parking regulations, translated into CurbLR](/conversions/LA_CurbLR.json) | Contains data from 35,000 parking signs, many with multiple complex regulations. [Raw data](https://geohub.lacity.org/datasets/71c26db1ad614faab1047cc8c3686ece_28) was accessed through LA's open data portal, matched to the SharedStreets Referencing System, cleaned into a [CurbLR-ready CSV](/conversions/prepped_data.csv), and converted into GeoJSON format using [scripts](/js).

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
        {"from": "00:00", "to": "06:00"}
      ]
    }
  ]
}
```

### Rush hour (AM and PM) parking regulation
TimeSpan applies during the morning **and** evening rush hours. Providing the two times of day as separate "clauses" in an array means that a logical **OR** expression is applied.
```JSON
{
  "timeSpans": [
    {
      "timesOfDay": [
        {"from": "07:30", "to": "09:30"},
        {"from": "16:00", "to": "18:00"}
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
        "days": ["mo", "tu", "we", "th", "fr"]
      },
      "timesOfDay": [
        {"from": "08:00", "to": "20:00"}
      ]
    },
    {
      "daysOfWeek": {
        "days": ["su"]
      },
      "timesOfDay": [
        {"from": "11:00", "to": "20:00"}
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
        {"name": "snow emergency", "apply": "only during"}
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
        "days": ["mo", "tu", "we", "th", "fr", "sa"]
      },
      "timesOfDay": [
        {"from": "08:00", "until": "20:00"}
      ],
      "designatedPeriods": [
        {"name": "holidays", "apply": "except during"}
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
        {"from": "07:00", "to": "19:00"},
      ],
      "effectiveDates": [
        {"from": "2018-08-02", "to": "2018-08-05"}
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
        {"from": "01:00", "to": "06:00"}
      ],
      "effectiveDates": [
        {"from": "12-01", "to": "03-31"}
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
        "days": ["tu"],
        "occurrencesInMonth": ["2nd", "4th"]
      },
      "timesOfDay": [
        {"from": "11:00", "to": "13:00"}
      ],
      "effectiveDates": [
        {"from": "04-01", "to": "11-30"}
      ]
    }
  ]
}
```
