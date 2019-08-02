# About restrictions
For a given location, a `restriction` defines _what_ is allowed or prohibited at a section of curb, _when_, for _whom_, as well as _how_ the restriction should be applied.

A restriction has several parts:
* [Rule](Rule.md) Specifies a single type of activity (parking, standing, or loading) that is permitted or forbidden, along with essential conditions like the maximum stay. The rule is applied when the restriction is in effect.
* [Priority](Priority.md): Defines how this restriction should supersede or be superseded by others
* [TimeSpans](TimeSpans.md): Defines one or more date and time periods when this restriction is in effect
* [UserClass](UserClass.md): Defines what types of vehicles, permits, and modes to whom this restriction applies
* [Payment](Payment.md): Provides optional, supplemental information about a payment profile and how it is applied.

Once a full set of prioritized restrictions is resolved, there should be only a single applicable activity [Rule](Rule.md) at a given location on the curb for any particular combination of [UserClass](UserClass.md) and [TimeSpan](TimeSpans.md). In some cases, there will be no applicable activity [Rule](Rule.md).

It is also possible to programmatically identify locations with conflicting or ambiguous regulations.

# Examples
| | |
| :---- | :---- |
| [Examples of Simple Regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic restrictions  |


### Simple restriction: no parking
Defines a No Parking restriction that applies to all road users. Standing and loading may or may not be permitted.
```json
{
  "restriction": {
    "rule": {
      "activity": "no parking"
    }
  }  
}
```

### Resident parking
Defines a restriction to allow people with a Zone 4 Resident Parking Permit to park. Implies no parking for any other users. Standing and loading may or may not be permitted.
```json
{
  "restriction": {
    "rule": {
      "activity": "parking",
      "reason": "resident parking"
    },
    "userClass": {
      "classes": ["resident permit"],
      "subclasses": ["zone 4"]
    }
  }  
}
```

### Time-limited parking space
Anyone may park for up to two hours, and must leave for four hours before returning
```json
{
  "restriction": {
    "rule": {
      "activity": "parking",
      "maxStay": 120,
      "noReturn": 240,
    }
  }
}
```

### Time-limited handicap space
Allows parking for handicap users with a three-hour time limit.
```json
{
  "restriction": {
    "rule": {
      "activity": "parking",
      "maxStay": 180,
    },
    "userClass": {
      "classes": ["handicap"]
    }
  }  
}
```
