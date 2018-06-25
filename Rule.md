# General
While [Regulations](Regulation.md) define the _when_ of curb use, a Rule defines the _who_, _what_, and _why_. Rules can also specify other conditions (such as required payment or time limits) that impact the use of the curb.

If a Rule does not specify a `who` field, it will be assumed to apply to all curb users. A given [Regulation](Regulation.md) can have multiple Rules associated with it, but only one of those Rules can have an empty `who`. When evaluating what Rule applies to a specific [UserClass](UserClass.md), the Rule without a `who` will be considered the default if no other rules apply to the user.

A rule may be written as a prohibition (e.g. "No Parking") or as an authorization (e.g. "Loading Zone"). CurbSpec can indicate what rule is in effect at a given place and time (or that no rule is in effect), but local regulation will determine what specific activities are allowed under any particular rule. For example, local rules may allow for passenger loading in a "No Parking" zone but not in a "No Stopping" zone.

# Definition
| field | format  | description | example |
| :--- | :--- | :--- | :--- |
| rule | `string` | Indicates _what_ is being allowed or prohibited by the rule. This is the primary use policy and should not include details about time or user-specific restrictions. | `Parking` or `No Stopping` or `Taxi Stand` |
| reason | `string` | An optional human-readable explanation that adds context to the rule (e.g. the _why_). | `Street Cleaning` or `Construction Zone` |
| who | `object` | A [UserClass](UserClass.md) object that defines _who_ the rule applies to. If not specified, rule will be assumed to apply to all users. | |
| time_limit | `integer`  | Defines the length of time (in minutes) the curb may be used under this rule | `120` (2 hours) |
| payment | `string` (values: `yes` or `no`) | Indicates whether payment is required | `yes` |

# Examples

### Simple rule
Defines a No Stopping rule that applies to all road users.
```
{
  rule: "No Stopping"
}
```

### Resident parking
Defines a rule to allow people with a Zone 4 Resident Parking Permit to park.
```
{
  rule: "Parking",
  reason: "Resident Only Parking"
  who: {
    class: "Resident Permit",
    subclass: "Zone 4"
  }
}
```

### Time-limited handicap space
Allows parking for handicap users with a 3 hour time limit.
```
{
  rule: "Parking",
  who: {
    class: "Handicap"
  },
  time_limit: 180
}
```

### Meter parking with time limit
Anyone may park for up to two hours with payment
```
{
  rule: "Parking",
  time_limit: 120,
  payment: "yes"
}
```
