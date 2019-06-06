# About rules
A rule is a subsection of the [restriction](Restriction.md). It groups properties that define _what_ activity is allowed or prohibited at a section of curb, _why_, and pertinent information about _how_ the restriction applies (whether there is a time limit, maximum time before returning, or required payment that impacts the use of the curb.). Additional object properties grouped elsewhere in the spec further define [_when_](TimeSpan.md), [_to whom_](UserClass.md), and [_how_](Payment.md) the restriction applies, as well as the [_priority_](Priority.md) level of the restriction.

To make the terminology in the spec less confusing, `rule` properties are contained in an array named `what`, following the spec's `who`, `what`, `where`, `when` structure. This approach makes the spec more human-readable and helps guide translation between GIS data and CurbLR.

# Definition
Each object in the GeoJSON may have the following properties:

| Field name | Importance  | Type | Description | Example
| :--- | :--- | :--- | :--- | :--- |
| activity | Required | `enum` (`string`) Values: `parking`, `no parking`, `standing`, `no standing`, `loading`, `no loading` | Describes what activity is forbidden or permitted | `parking`
| reason | Optional | `string` Suggested values; see below | Describes why the activity rule is in place. This is especially helpful for denoting restrictions with [Priority](Priority.md) levels <`4`, such as snow emergency zones, which may be in effect for irregular or unpredictable time periods; these may require human interpretation or an API to determine whether they are in effect | `snow emergency zone`
| maxStay | If applicable | `int` | The length of time (in minutes) for which the curb may be used under this restriction. This provides a time restriction, in addition to any [TimeSpan](TimeSpan.md) restrictions | `30`
| noReturn | If applicable | `int` | The length of time (in minutes) that a user must vacate the curbspace before allowed to return for another stay. Generally applies only to restrictions with a `maxStay` | `60`
| payment | If applicable | `enum` (`string`) Values: `yes` or `no` | Defines whether payment is required (at the time of parking) in order to park here. May be further defined in [Payment](Payment.md). This is different from a parking permit, which may require a fee, because a permit is obtained in advance and not tied to actual usage. Permits are defined in [UserClass](UserClass.md)| `yes`
| authority | Optional | An agency producing CurbLR data can indicate, in the [metadata](Metadata.md), which authority has jurisdiction over the curbspace in the data (i.e. who created and manages the regulation). Often, this will be consistent across all data in a CurbLR feed. However, this property can also be set for each individual feature geometry, and is intended to store exceptions that override the authority set in the metadata.

## Activity: possible values

CurbLR assumes that all activities along the curb fit into three categories:
* **Parking:** Stopping a vehicle and leaving it unattended
* **Standing:** Stopping a vehicle but leaving it attended
* **Loading:** Stopping a vehicle (attended or unattended) to perform a loading activity. The vehicle may remain in the curb section _only_ while the loading activity occurs.

Each of these activities can be described in the affirmative (e.g. `parking`) to denote what is permitted, or in the negative (e.g. `no parking`) to denote what is prohibited. It is not necessary to duplicate an object to define its inverse. A restriction for a certain type of user implies that no other users can perform that activity in the given curbspace (unless otherwise specified). For example, `parking` for residential permit holders implies that the curb segment is a `no parking` zone for any other users.

CurbLR can indicate what restriction is in effect at a given place and time (or that no restriction is in effect). CurbLR can also indicate a relationship between certain activities, but not others; if a section of curb is described as a standing or loading zone, this implies that parking is not permitted during that period. Beyond this, local regulation must determine what specific activities are allowed in a particular section of the curb. For example, local rules may allow for passenger loading in a "No Parking" zone but not in a "No Stopping" zone.

### Activity classification examples

The activity classifications may be modified to describe myriad activities along the curb. For example:
* Parking meters: Parking zone with required payment; fees may only apply during specified hours. Standing and loading may or may not be permitted.
* Residential permit parking: Parking zone for users with residential parking permits. Implies no parking for any other users. Standing and loading may or may not be permitted.
* Bus stop: Loading zone for buses. Implies no loading, standing, or parking for any other users.
* Taxi stand: Standing zone for taxis. Implies no loading, standing, or parking for any other users. (Note: This is different from a pick-up/drop-off zone since a vehicle may remain at a taxi stand indefinitely while waiting for a potential passenger.)
* TNC pick-up/drop-off zone: Loading zone for TNCs. Implies no loading, standing, or parking for any other users.


## Reason: well-known values

`reason` can be used to convey the purpose of the rule. This information is often described elsewhere in CurbLR and is not required but may be helpful for some users. The following is a suggested but not exhaustive list of values for `reason`:
- `commercial loading`
- `construction zone`
- `no stopping`
- `passenger loading`
- `resident parking`
- `rideshare pick-up drop-off`
- `snow emergency zone`
- `street cleaning`
- `taxi stand`
- `tow-away zone`

Please use the Github issue tracker to suggest additional values.

# Examples
### Simple restriction: no parking
Defines a No Parking `restriction` that applies to all road users. Standing and loading may or may not be permitted.
```
{
  "what": {
    "activity": "no parking"
  }
}
```

### Resident parking
Defines a `restriction` to allow people with a Zone 4 Resident Parking Permit to park. Implies no parking for any other users. Standing and loading may or may not be permitted.
```
{
  "what": {
    "activity": "parking",
    "reason": "resident parking"
  }
  "who": {
    "class": "resident permit",
    "subclass": "zone 4"
  }
}
```

### Time-limited handicap space
Defines a `restriction` that allows parking for handicap users with a 3 hour time limit.
```
{
  "what": {
    "activity": "parking",
    "maxStay": 180
  }
  "who": {
    "class": "handicap"
  }
}
```

### Meter parking with time limit, users must leave for 30 minutes before being allowed to return
Defines a `restriction` that allows anyone to park for up to two hours with payment, with a max stay of two hours, after which the user must leave for at least 30 mins
```
{
  "what": {
    "activity": "parking",
    "maxStay": 120,
    "noReturn": 30
    "payment": "yes"
  }
```

### Taxi stand
Defines a `restriction` that allows taxis to stand and pick up passengers. Implies that no other users may park or stand here.
```
{
  "what": {
    "activity": "standing",
    "reason": "taxi stand"
  }
  "who": {
    "class": "taxi",
  }
}
```

### Rideshare (TNC) pick-up and drop-off zone
Defines a `restriction` that allows rideshare companies to drop off and pick up passengers. Individual jurisdictions must determine what constitutes a rideshare.
```
{
  "what": {
    "activity": "loading",
    "reason": "rideshare pick-up drop-off"
  }
  "who": {
    "class": "rideshare",
  }
}
```
