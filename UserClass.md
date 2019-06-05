# About user classifications
A curb [Rule](Rule.md) is often applied differently to different road users. For example, street parking may be allowed but only for vehicles displaying a resident parking permit with a specific zone number. Or, a section of curb may be reserved for pick-up and drop-off by vehicles providing rideshare services ("TNCs").

A UserClass can define a type of vehicle, permit, or service for which a [Restriction](Restriction.md) may be applied. CurbLR provides a list of well-known values for user classes. However, each jurisdiction will determine how they want to differentiate between types of road users (i.e. what constitutes a rideshare vehicle or what type of handicap permit is required (this varies by country)).

A given vehicle may fall into multiple user classes depending on activity and circumstance (for example, a car may be operated as a rideshare vehicle and display a resident parking permit).

# Definition
Each feature in the GeoJSON may have the following properties:


| Field name | Importance  | Type | Description | Example
| :--- | :--- | :--- | :--- | :--- |
| class | If applicable | `string` Suggested values; see below | The identifier of a user class, which may define a type of vehicle, permit, purpose, or service | `food truck` |
| subclass | If applicable | `string` | An optional secondary identifier for a class of user. Useful for subdividing permit holders by zone or other designation | `Zone 4` |


If a `rule` does not specify a `who` field, it will be assumed to apply to all curb users.

It is possible for a given curb segment to have multiple rules that apply, during the same time period, to different user classes. However, only one of those rules may have an empty `who` field; otherwise they will conflict with one another. When evaluating what `rule` applies to a specific user class, the `rule` without a `who` will be considered the default if no other rules apply to the user.

## Class: well-known values
The following is a suggested but not exhaustive list of values for `class`. It is up to a particular jurisdiction to define exactly which vehicles, user, purposes, or permits are required for each value. Multiple values may be specified in an array. If multiple well-known values apply, the most descriptive should be used (e.g. for resident-only parking, `resident permit` should be used rather than `permit`)

- `bike`
- `car share`
- `carpool`
- `commercial`
- `compact`
- `construction`
- `electric`
- `emergency`
- `food truck`
- `handicap`
- `micromobility`
- `motorcycle`
- `passenger`
- `permit`
- `police`
- `resident permit`
- `rideshare`
- `staff`
- `student`
- `taxi`
- `truck`
- `visitor`


# Examples

### Food truck
Defines a parking zone for vehicles operating as food trucks
```
{
  "rule": {
    "what": {
      "activity": "parking"
    }
    "who": {
      "class": "food truck"
    }
  }  
}
```

### Zoned resident-only parking
Defines a parking zone for vehicles displaying a Zone 4 or Zone 5 Resident Permit.
```
{
  "rule": {
    "what": {
      "activity": "parking"
    }
    "who": {
      "class": "resident permit",
      "subclass": [
        "zone 4",
        "zone 5"
      ]
    }
  }  
}
```

### Truck classification
Defines a parking restriction for large trucks that does not apply to smaller trucks (or any other `class`).
```
{
  "rule": {
    "what": {
      "activity": "no parking"
    }
    "who": {
      "class": "truck",
      "subclass": "over 25 ft"
    }
  }  
},
```

### Car share
Defines car share spaces with subclasses for specific operations. This would allow for certain spaces to be reserved for specific operators while also allowing the creation of floating car share spaces to be used by any operator.

Denotes `who` for Zipcar spaces:
```
{
  "class": "car share",
  "subclass": "Zipcar"
}
```
Denotes `who` for Car2Go spaces:
```
{
  "class": "car share",
  "subclass": "Car2Go"
}
```
Denotes `who` for floating spaces:
```
{ "class": "car share"}
```
