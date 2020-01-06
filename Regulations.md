# About regulations
For a given location, a regulation defines _what_ is allowed or prohibited at a section of curb, _when_, for _whom_, as well as _how_ the regulation should be applied. The regulation(s) are always expressed as an array in order to provide a consistent format regardless of whether a given street segment has a single or multiple regulations. This prevents the need to repeat geometry and location data multiple times for the same street segment.

A regulation has several parts:
* [Rule](Rule.md) Specifies a single type of activity (parking, standing, or loading) that is permitted or forbidden, along with essential conditions like the maximum stay. The rule is applied when the restriction is in effect.
* [UserClasses](UserClasses.md): Defines what types of vehicles, permits, and modes to whom this regulation applies
* [TimeSpans](TimeSpans.md): Defines one or more date and time periods when this regulation is in effect
* [Payment](Payment.md): Provides optional, supplemental information about a payment profile and how it is applied
* [Priority](Priority.md): Defines how this regulation should supersede or be superseded by others

Once a full set of prioritized regulations is resolved, there should be only a single applicable activity [Rule](Rule.md) at a given location on the curb for any particular combination of [UserClasses](UserClasses.md) and [TimeSpan](TimeSpans.md). In some cases, there will be no applicable activity [Rule](Rule.md).

It is also possible to programmatically identify locations with conflicting or ambiguous regulations.


# Examples

The links below show real world curb regulations translated into CurbLR.

| Link | Description |
| :---- | :---- |
| [Examples of simple regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic restrictions  |
| [Examples of complex regulations](examples/complex_examples.md) | Complex regulatory scenarios typically involving several restrictions  |
| Large dataset of [Los Angeles' parking regulations, translated into CurbLR](/conversions/LA/LA_CurbLR.json) | Contains data from 35,000 parking signs, many with multiple complex regulations. [Raw data](https://geohub.lacity.org/datasets/71c26db1ad614faab1047cc8c3686ece_28) was accessed through LA's open data portal, matched to the SharedStreets Referencing System, cleaned into a [CurbLR-ready CSV](/conversions/LA/prepped_data.csv), and [converted](/js) into CurbLR's JSON format.


### Simple regulation: no parking
Defines a No Parking regulation that applies to all road users. Standing and loading may or may not be permitted.
```json
{
  "regulations": [
    {
      "rule": {
        "activity": "no parking"
      }
    }  
  ]
}
```

### Resident parking
Defines a regulation to allow people with a Zone 4 Resident Parking Permit to park. Implies no parking for any other users. Standing and loading may or may not be permitted.
```json
{
  "regulations": [
    {
      "rule": {
        "activity": "parking",
        "reason": "resident parking"
      },
      "UserClasses": [
        {
          "classes": ["permit"],
          "subclasses": ["zone 4"]
        }
      ]
    }
  ]  
}
```

### Time-limited parking space
Anyone may park for up to two hours, and must leave for four hours before returning
```json
{
  "regulations": [
  {
      "rule": {
        "activity": "parking",
        "maxStay": 120,
        "noReturn": 240,
      }
    }
  ]
}
```

### Time-limited handicap space
Allows parking for handicap users with a three-hour time limit.
```json
{
  "regulations": [
    {
      "rule": {
        "activity": "parking",
        "maxStay": 180,
      },
      "userClasses": [
        {
          "classes": ["handicap"]
        }
      ]
    }  
  ]
}
```
