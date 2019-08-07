# About user classifications
A [regulation](Regulations.md) often contains a curb [rule](Rule.md) that is applied differently to different road users. For example, street parking may be allowed but only for vehicles displaying a resident parking permit with a specific zone number. Or, a section of curb may be reserved for pick-up and drop-off by vehicles providing rideshare services ("TNCs").

A UserClass can define a type of vehicle, permit, or service for which a [rule](Rule.md) may be applied. CurbLR provides a list of well-known values for user classes. However, each jurisdiction will determine how they want to differentiate between types of road users (i.e. what constitutes a rideshare vehicle or what type of handicap permit is required (this varies by country)).

A given vehicle may fall into multiple user classes depending on activity and circumstance (for example, a car may be operated as a rideshare vehicle and display a resident parking permit).

# Definition
Each feature in the GeoJSON may have the following properties:


| Field name | Importance  | Type | Description | Example
| :--- | :--- | :--- | :--- | :--- |
| classes | If applicable | array of `string` Suggested values; see below | The identifier of a user class, which may define a type of vehicle, permit, purpose, or service. This field is an array in order to accommodate single or multiple values in a consistent way. | [`food truck`] |
| subclasses | If applicable | array of `string` | Optional secondary identifiers for a class of user. Useful for subdividing permit holders by zone or other designation | [`zone 4`, `zone 5`] |
| numeric restriction | If applicable | `float` |If the `classes` or `subclasses` indicates that there is a vehicle height, length, or weight restriction, use an additional key:value pair to indicate the number, in local units. (Local units may be specified in the [manifest](Manifest.md).) | `maxHeight`:`6`; `minLength`:`25`; `maxWeight`:`1000` |


If a [regulation](Regulations.md) does not specify `userClass` properties, it will be assumed to apply to all curb users.

It is possible for a given curb segment to have multiple regulations that apply, during the same time period, to different user classes. However, only one of those regulations may have an empty `userClass` field; otherwise they will conflict with one another. When evaluating which [regulation](Regulations.md) applies to a specific user class, the regulation without a `userClass` will be considered the default if no other regulations apply to the user.

## Class: well-known values
The following is a suggested but not exhaustive list of values for `classes`. It is up to a particular jurisdiction to define exactly which vehicles, user, purposes, or permits are required for each value. Multiple values may be specified in an array. If multiple well-known values apply, the most descriptive should be used (e.g. for resident-only parking, `resident permit` should be used rather than `permit`)

- `bicycle`
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
- `official`
- `passenger`
- `permit`
- `police`
- `rideshare`
- `staff`
- `student`
- `taxi`
- `truck`
- `visitor`

## Numeric restrictions (height, length, width)

Numeric restrictions, if applicable, are entered as key:value pairs in the local measurement unit (e.g. feet and pounds in USA, metres and kilograms in UK). Measurement units may be specified in the [manifest](Manifest.md). Available keys include:

- `maxHeight`
- `maxLength`
- `maxWeight`
- `minHeight`
- `minLength`
- `minWeight`

# Examples
| | |
| :---- | :---- |
| [Examples of simple regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic regulations  |
| [Examples of complex regulations](examples/complex_examples.md) | Complex regulatory scenarios typically involving several restrictions  |


### Food truck
Defines a parking zone for vehicles operating as food trucks
```JSON
{
  "regulation": {
    "rule": {
      "activity": "parking"
    },
    "userClass": {
      "classes": ["food truck"]
    }
  }  
}
```

### Zoned resident-only parking
Defines a parking zone for vehicles displaying a Zone 4 or Zone 5 Resident Permit.
```JSON
{
  "regulation": {
    "rule": {
      "activity": "parking"
    },
    "userClass": {
      "classes": ["permit"],
      "subclasses": ["zone 4", "zone 5"]
    }
  }  
}
```

### Truck length limit
Defines a parking regulation for large trucks that does not apply to smaller trucks (or any other `class`).
```JSON
{
  "regulation": {
    "rule": {
      "activity": "no parking"
    },
    "userClass": {
      "classes": ["truck"],
      "maxLength": 25
    }
  }  
}
```

### Vehicle height limit
Defines a parking space for vehicles no more than 6 feet tall.
```JSON
{
  "regulation": {
    "rule": {
      "activity": "parking"
    },
    "userClass": {
      "maxHeight": 6
    }
  }  
}
```


### Car share
Defines car share spaces with subclasses for specific operations. This would allow for certain spaces to be reserved for specific operators while also allowing the creation of floating car share spaces to be used by any operator.

Denotes the `userClass` for Zipcar spaces:
```json
{
  "classes": ["car share"],
  "subclasses": ["Zipcar"]
}
```
Denotes the `userClass` for Car2Go spaces:
```json
{
  "classes": ["car share"],
  "subclasses": ["Car2Go"]
}
```
Denotes the `userClass` for floating spaces:
```json
{
  "classes": ["car share"]
}
```
