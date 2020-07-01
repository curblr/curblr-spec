# About regulations
For a given location, a regulation defines _what_ is allowed or prohibited at a section of curb, _when_, for _whom_, as well as _how_ the regulation should be applied. The regulation(s) are always expressed as an array in order to provide a consistent format regardless of whether a given street segment has a single or multiple regulations. This prevents the need to repeat geometry and location data multiple times for the same street segment.

A regulation has several parts:
* [Rule](Rule.md) Specifies a single type of activity (parking, standing, or loading) that is permitted or forbidden, along with essential conditions like the maximum stay. The rule is applied when the restriction is in effect.
* [UserClasses](UserClasses.md): Defines what types of vehicles, permits, and modes to whom this regulation applies
* [TimeSpans](TimeSpans.md): Defines one or more date and time periods when this regulation is in effect
* [Payment](Payment.md): Provides optional, supplemental information about a payment profile and how it is applied

# Overlapping regulations and hierarchy

It is possible for more than one regulation to apply to the same section of a street. For example, a section of curb may be a loading zone during the morning, a paid parking zone during the afternoon, and a free parking zone in the evening. A stretch of curb may be regulated for two-hour parking normally, but during a snow emergency that regulation is superseded by a no parking regulation. Or a temporary regulation might be put into place to disallow parking in a construction zone.

A priority hierarchy allows different regulations to coexist without ambiguity. When multiple regulations apply at a specific location and time, the priority hierarchy determines which one is in force.

In the real world, priorities are often implied rather than explicit. Road users assume that a "No Parking - Street Cleaning" sign overrules a "2H Meter Parking" sign. As computers are not adept at making these kinds of value judgements, CurbLR requires that priorities be specified explicitly.

Priorities also avoid the need to define the regulations for each span of curb individually. An entire street or set of streets might be regulated as resident parking, but with small spans near fire hydrants defined with higher priority "no standing" regulations applied.

To resolve potential conflicts when regulations overlap one another, a descriptive priority category is included as part of each regulation (in the [Rule](Rule.md)), and the [metadata](Manifest.md) includes an ordered list of these priority categories, establishing a hierarchy. Using this category approach enables data creators to prevent ambiguity or conflicts between overlapping regulations, in a way that allows for flexibility, customization, the ability to adapt to future changes.

# Examples

The links below show real world curb regulations translated into CurbLR.

| Link | Description |
| :---- | :---- |
| [Examples of simple regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic restrictions  |
| [Examples of complex regulations](examples/complex_examples.md) | Complex regulatory scenarios typically involving several restrictions  |
| Sample of [downtown Portland's parking regulations](/conversions/Portland/portland_2020-02-20.curblr.json) | Contains data for about 3 miles of parking regulations, surveyed in November 2019. This can also be viewed at [demo.curblr.org](https://demo.curblr.org)


### Simple regulation: no parking
Defines a No Parking regulation that applies to all road users. Standing and loading may or may not be permitted.
```json
{
  "regulations": [
    {
      "rule": {
        "activity": "no parking",
        "priorityCategory": "no parking"
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
        "priorityCategory": "parking"
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
        "priorityCategory": "parking",
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
        "priorityCategory": "parking",
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
