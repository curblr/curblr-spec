# About priorities

The `priority` field defines how a regulation should supersede or be superseded by others.

It is sometimes necessary to have multiple regulations at a given location. For example, a stretch of curb may be regulated for two-hour parking normally, but during a snow emergency that regulation is superseded by a no parking regulation. Or a temporary regulation might be put into place to disallow parking in a construction zone.

Priorities allow for different regulations to coexist without ambiguity. When multiple regulations apply at a specific location and time, the priority determines which one is in force.

In the real world, priorities are often implied rather than explicit. Road users assume that a "No Parking - Street Cleaning" sign overrules a "2H Meter Parking" sign. As computers are not adept at making these kinds of value judgements, CurbLR requires that priorities be specified explicitly.

Priorities also avoid the need to define the regulations for each span of curb individually. An entire street or set of streets might be regulated as resident parking, but with small spans near fire hydrants defined with higher priority "no parking" regulations applied.

# Definition
CurbLR defines seven priority levels for regulations. When multiple regulations apply at a location, lower numbered regulations supersede higher numbers. The `priority` is a property of each object in the JSON, expressed as an `enum`. Possible values are `int` from `1` - `7`.

| Level | Name | Description |
| :--- | :--- | :--- |
| `1` | Critical | A regulation with critical public safety implications (e.g. crosswalk, fire hydrant, emergency vehicle access) |
| `2` | Urgent | Supports urgent right-of-way management needs (e.g. snow emergency, parade route, construction permit) |
| `3` | Priority | A regulation that happens intermittently and supersedes normal allowed uses (e.g. street cleaning) |
| `4` | Normal, minor feature | "Normal" regulations (everything not included in levels 1-3) are split into multiple categories for easier mapping. A priority level 5 regulation is regularly scheduled but happens sporadically, such as a loading zone that occurs every morning from 6am to 9am. They have been broken into two different categories to allow for easier mapping. For example, many urban streets are metered parking along the whole block, with a small area dedicated to a loading zone at certain hours of the day. Having two levels for these "major" and "minor" features enables users to [map the geometries more easily](https://github.com/sharedstreets/curblr/issues/15), first by mapping the whole street (priority 5, paid parking) and then by mapping the specific override (priority 4, loading).|
| `5` | Major feature | See explanation above, for priority level 4. This type of regulation applies generally across all standard operating hours, and defines the standard operating hours. For example, a paid parking zone in place Monday-Friday from 8am to 6pm would be a priority level 5 restriction. |
| `6` | Bylaws | Many cities have bylaws, ordinances, and other area-wide rules made by a local authority. This might include overnight or [oversized](https://www.portlandoregon.gov/transportation/article/591492) vehicle restrictions, for example. These often are not signposted on the street. Priority level 6 provides a place to store those regulations, if desired. |
| `7` | Default | Provides a place to store the "default" rule (often free parking), which applies when no other restrictions are communicated. For example, a street may not have any signage, curb paint, driveways, or parking meters. The "default" defines what is permitted there, and what is permitted on streets outside of normal operating hours. |

It is our view that a more exhaustive list of hierarchies (e.g. 1-100) is not necessary. It is unlikely that a city will have multiple _conflicting_ regulations at the same priority level (e.g. No parking 12-3pm & Parking 12-3pm). If that were the case, the signs themselves would be impossible for a human to interpret, and the problem would lie with the regulations themselves rather than the data format.

# Examples
The links below show real world curb regulations translated into CurbLR.

| Link | Description |
| :---- | :---- |
| [Examples of simple regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic restrictions  |
| [Examples of complex regulations](examples/complex_examples.md) | Complex regulatory scenarios typically involving several restrictions  |
| Sample of [downtown Portland's parking regulations](/conversions/Portland/portland_2020-02-20.curblr.json) | Contains data for about 3 miles of parking regulations, surveyed in November 2019. This can also be viewed at [demo.curblr.org](https://demo.curblr.org)
