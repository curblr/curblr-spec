# About restrictions
For a given location, a `restriction` defines _what_ is allowed or prohibited at a section of curb, and how the restriction should be applied.

A restriction has several parts:
* _**what**:_ One type of activity that is permitted or foridden by a [Rule](Rule.md), which is applied when the restriction is in effect
* _**[priority](Priority.md)**:_ Defines how this restriction should supersede or be superseded by others
* _**when**:_ Defines one or more [TimeSpans](TimeSpan.md) when this restriction is in effect
* _**who**:_ Defines one or more [user classes](UserClass.md) to whom this restriction applies
* _**how**:_ Provides optional, supplemental information about the restriction and how it is applied. This can include a [payment profile](Payment.md), and could be expanded to hold supplemental information about physical assets or other needs.

Once a full set of prioritized restrictions is resolved, there should be only a single applicable activity  [Rule](Rule.md) at a given location on the curb for any particular combination of _who_ and _when_. In some cases, there will be no applicable activity [Rule](Rule.md).

It is also possible to programmatically identify locations with conflicting or ambiguous regulations.

# Examples
| | |
| :---- | :---- |
| [Examples of Simple Regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic restrictions  |


### Simple restriction: no parking
Defines a No Parking restriction that applies to all road users. Standing and loading may or may not be permitted.
```
{
  "restriction": {
    "what": {
      "activity": "no parking"
    }
  }  
}
```

### Resident parking
Defines a restriction to allow people with a Zone 4 Resident Parking Permit to park. Implies no parking for any other users. Standing and loading may or may not be permitted.
```
{
  "restriction": {
    "what": {
      "activity": "parking",
      "reason": "resident parking"
    }
    "who": {
      "class": "resident permit",
      "subclass": "zone 4"
    }
  }  
}
```

### Time-limited handicap space
Allows parking for handicap users with a three-hour time limit.
```
{
  "restriction": {
    "what": {
      "activity": "parking",

    }
    "who": {
      "class": "handicap"
    }
  }  
}
```

### Meter parking with time limit
Anyone may park for up to two hours with payment, and must leave for four hours before returning
```
{
  "restriction": {
    "what": {
      "activity": "parking",
      "maxStay": 120,
      "noReturn": 240,
      "payment": "yes"
    }
  }
}
```
