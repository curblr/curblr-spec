# About priorities

The `priority` field defines how a restriction should supersede or be superseded by others.

It is sometimes necessary to have multiple regulations at a given location. For example, a stretch of curb may be regulated for two-hour parking normally, but during a snow emergency that regulation is superseded by a no parking rule. Or a temporary regulation might be put into place to disallow parking in a construction zone.

Priorities allow for different regulations to coexist without ambiguity. When multiple regulations apply at a specific location and time, the priority determines which one is in force.

In the real world, priorities are often implied rather than explicit. Road users assume that a "No Parking - Street Cleaning" sign overrules a "2H Meter Parking" sign. As computers are not adept at making these kinds of value judgements, CurbSpec requires that priorities be specified explicitly.

Priorities also avoid the need to define the regulations for each span of curb individually. An entire street or set of streets might be regulated as resident parking, but with small spans near fire hydrants defined with higher priority "no parking" rules applied.

# Definition
CurbSpec defines four priority levels for regulations. When multiple regulations apply at a location, lower numbered regulations supersede higher numbers. The `priority` is a property of each object in the JSON, expressed as an `enum`. Possible values are `int` from `1` - `4`.

| Level | Name | Description |
| :--- | :--- | :--- |
| `1` | Critical | A regulation with critical public safety implications (e.g. crosswalk, fire hydrant, emergency vehicle access
| `2` | Urgent | Supports urgent right-of-way management needs (e.g. snow emergency, parade route, construction permit)
| `3` | Priority | A regulation that supersedes normal allowed uses (e.g. street cleaning, rush hour restrictions) |
| `4` | Normal | Everything else |

It is our view that a more exhaustive list of hierarchies (e.g. 1-100) is not necessary. It is unlikely that a city will have multiple _conflicting_ restrictions at the same priority level (e.g. No parking 12-3pm & Parking 12-3pm). If that were the case, the signs themselves would be impossible for a human to interpret, and the problem would lie with the regulations themselves rather than the data format.
