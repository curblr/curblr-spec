# About rules
For a given location, a `rule` defines _what_ is allowed or prohibited at a section of curb, and how the rule should be applied.

A rule has several parts:
* _**what**:_ One [Restriction](Restriction.md) that is applied when the rule is in effect
* _**[priority](Priority.md)**:_ Defines how this rule should supersede or be superseded by others
* _**when**:_ Defines one or more [TimeSpans](TimeSpan.md) when this rule is in effect
* _**who**:_ Defines one or more [user classes](UserClass.md) to whom this rule applies
* _**how**:_ Provides optional, supplemental information about the rule and how it is applied. This can include a [payment profile](Payment.md), and could be expanded to hold supplemental information about physical assets or other needs.

Once a full set of prioritized rules is resolved, there should be only a single applicable [Restriction](Restriction.md) at a given location on the curb for any particular combination of _who_ and _when_. In some cases, there will be no applicable [Restriction](Restriction.md).

It is also possible to programmatically identify locations with conflicting or ambiguous regulations.

# Examples
| | |
| :---- | :---- |
| [Examples of Simple Regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic rules  |
| [Examples of Complex Regulations](examples/complex_examples.md) | Complex scenarios that address multiple user classes, complicated expressions of time, and overlapping regulations |



### Simple rule: no parking
Defines a No Parking rule that applies to all road users. Standing and loading may or may not be permitted.
```
{
  "rule": {
    "what": {
      "activity": "no parking"
    }
  }  
}
```

### Resident parking
Defines a rule to allow people with a Zone 4 Resident Parking Permit to park. Implies no parking for any other users. Standing and loading may or may not be permitted.
```
{
  "rule": {
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
  "rule": {
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
  "rule": {
    "what": {
      "activity": "parking",
      "timeLimit": 120,
      "timeAway": 240,
      "payment": "yes"
    }
  }
}
```
