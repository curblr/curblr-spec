# General
A Regulation defines what is allowed or prohibited at a section of curb during a particular [TimeSpan](TimeSpan.md). A given Regulation has one more [Rules](Rule.md) which may apply to different classes of users ([UserClasses](UserClass.md)).

A regulation has three parts:

* _**when**:_ When is this regulation in effect ([TimeSpan](TimeSpan.md))
* _**rules**:_ One or more [Rules](Rule.md) that may be applied when the regulation is in effect
* _**[priority](regulation_priorities.md)**:_ How should this regulation supersede or be superseded by others

Conceptually, [Rules](Rule.md) have two parts:

* _**who**:_ To whom does the regulation apply
* _**what**:_ What use policies applies when the rule is in effect

Once a full set of prioritized regulations is resolved, there should be only a single applicable [[Rule]] at a given location on the curb for any particular combination of _who_ and _when_. In some cases, there will be no applicable [[Rule]].

It is also possible to programmatically identify locations with conflicting or ambiguous regulations.

# Definition
| field name | format  | description |
| :--- | :--- | :--- |
| when | `object` | A [Timespan](Timespan.md) object that determines _when_ the regulation applies |
| rules | `object` or `array` | One or more [Rule](Rule.md) objects that may apply when the regulation is in effect |
| priority | `int` (values: `1-4`) | Determines when this regulation should supersede or be superseded per the list of [regulation priorities](regulation_priorities.md) |

# Examples
| | |
| :---- | :---- |
| [Examples of Simple Regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic rules  |
| [Examples of Complex Regulations](examples/complex_examples.md) | Complex scenarios that address multiple user classes, complicated expressions of time, and overlapping regulations |
