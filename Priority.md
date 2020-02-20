# About priorities

The `priority` field defines how a regulation should supersede or be superseded by others.

It is sometimes necessary to have multiple regulations at a given location. For example, a stretch of curb may be regulated for two-hour parking normally, but during a snow emergency that regulation is superseded by a no parking regulation. Or a temporary regulation might be put into place to disallow parking in a construction zone.

Priorities allow for different regulations to coexist without ambiguity. When multiple regulations apply at a specific location and time, the priority determines which one is in force.

In the real world, priorities are often implied rather than explicit. Road users assume that a "No Parking - Street Cleaning" sign overrules a "2H Meter Parking" sign. As computers are not adept at making these kinds of value judgements, CurbLR requires that priorities be specified explicitly.

Priorities also avoid the need to define the regulations for each span of curb individually. An entire street or set of streets might be regulated as resident parking, but with small spans near fire hydrants defined with higher priority "no parking" regulations applied.

# Definition
CurbLR defines five priority levels for regulations. When multiple regulations apply at a location, lower numbered regulations supersede higher numbers. The `priority` is a property of each object in the JSON, expressed as an `enum`. Possible values are `int` from `1` - `5`.

| Level | Name | Description |
| :--- | :--- | :--- |
| `1` | Critical | A regulation with critical public safety implications (e.g. crosswalk, fire hydrant, emergency vehicle access
| `2` | Urgent | Supports urgent right-of-way management needs (e.g. snow emergency, parade route, construction permit)
| `3` | Priority | A regulation that supersedes normal allowed uses (e.g. street cleaning) |
| `4` | Normal with regularly scheduled override | Levels 4 and 5 are both used for all other curb regulations. They have been broken into two different categories to allow for easier mapping. For example, many urban streets are metered parking along the whole block, with a small area dedicated to a loading zone at certain hours of the day. Having two levels for "normal" regulations enables users to [map the geometries more easily](https://github.com/sharedstreets/curblr/issues/15), first by mapping the whole street (priority 5, paid parking) and then by mapping the specific override (priority 4, loading). Priority level 5 is the default for normal regulations. Priority level 4 should only be used when necessary for regularly scheduled overrides that do not fit into higher priority levels. |
| `5` | Normal | See explanation above, for priority level 4. Priority level 5 is the default for normal regulations. |

It is our view that a more exhaustive list of hierarchies (e.g. 1-100) is not necessary. It is unlikely that a city will have multiple _conflicting_ regulations at the same priority level (e.g. No parking 12-3pm & Parking 12-3pm). If that were the case, the signs themselves would be impossible for a human to interpret, and the problem would lie with the regulations themselves rather than the data format.

# Examples
The links below show real world curb regulations translated into CurbLR.

| Link | Description |
| :---- | :---- |
| [Examples of simple regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic restrictions  |
| [Examples of complex regulations](examples/complex_examples.md) | Complex regulatory scenarios typically involving several restrictions  |
| Sample of [downtown Portland's parking regulations](/conversions/Portland/portland_2020-02-20.curblr.json) | Contains data for about 3 miles of parking regulations, surveyed in November 2019. This can also be viewed at [demo.curblr.org](https://demo.curblr.org)
