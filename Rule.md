# About rules
A rule is a subsection of the [regulations](Regulations.md). It groups properties that define _what_ activity is allowed or prohibited at a section of curb, _why_, and pertinent information about _how_ the regulation applies (whether there is a time limit or maximum time before returning). Additional object properties grouped elsewhere in the spec further define [_when_](TimeSpan.md) and [_to whom_](UserClasses.md) the regulation applies, whether and how much [payment](Payment.md) is required, as well as the [_priority_](Priority.md) level of the regulation.

# Definition
Each object in the GeoJSON may have the following properties:

| Field name | Importance  | Type | Description | Example
| :--- | :--- | :--- | :--- | :--- |
| activity | Required | `enum` (`string`) Values: `parking`, `no parking`, `standing`, `no standing`, `loading`, `no loading` | Describes what activity is forbidden or permitted | `parking`
| reason | Optional | `string` Suggested values; see below | Describes why the activity rule is in place. This is especially helpful for denoting regulations with [Priority](Priority.md) levels <`4`, such as snow emergency zones, which may be in effect for irregular or unpredictable time periods; these may require human interpretation or an API to determine whether they are in effect | `snow emergency zone`
| maxStay | If applicable | `int` | The length of time (in minutes) for which the curb may be used under this regulation. This provides a time restriction, in addition to any [TimeSpan](TimeSpans.md) restrictions | `30`
| noReturn | If applicable | `int` | The length of time (in minutes) that a user must vacate the curbspace before allowed to return for another stay. Generally applies only to regulations with a `maxStay` | `60`|
| payment | If applicable | `boolean` Default value: `false` | `true` indicates that payment is required. This field is not necessary if no payment is required. Additional payment information is stored in [Payment](Payment.md)| `true`|
| authority | Optional object used as override for exceptions | An agency producing CurbLR data can indicate, in the [metadata](Manifest.md), which authority has jurisdiction over the curbspace in the data (i.e. who created and manages the regulation). Often, this will be consistent across all data in a CurbLR feed. However, this property can also be set for each individual feature geometry, and is intended to store exceptions that override the authority set in the metadata.
| authority.name | Optional override | `string` (web link) | Name of agency | `City of London`
| authority.url | Optional override | `string` (web link) | Link to the regulatory agency's domain | `https://vancouver.ca`
| authority.phone | Optional override | `string` (`E.164 format`: + `country code` + `local area code` + `phone number`) | The phone number,  including country and area code, for the regulatory agency that could be contacted about parking regulations | `+15551231234`

Data fields should generally be considered case insensitive since they are used programmatically; we use lower-case in our examples, except for fields that would be used for display purposes (such as a street name or agency name).


## Activity: possible values

CurbLR assumes that all activities along the curb fit into three categories:
* **Parking:** Stopping a vehicle and leaving it unattended
* **Standing:** Stopping a vehicle but leaving it attended
* **Loading:** Stopping a vehicle (attended or unattended) to perform a loading activity. The vehicle may remain in the curb section _only_ while the loading activity occurs.

Each of these activities can be described in the affirmative (e.g. `parking`) to denote what is permitted, or in the negative (e.g. `no parking`) to denote what is prohibited. It is not necessary to duplicate an object to define its inverse. A regulation for a certain type of user implies that no other users can perform that activity in the given curbspace (unless otherwise specified). For example, `parking` for residential permit holders implies that the curb segment is a `no parking` zone for any other users.

CurbLR can indicate what regulation is in effect at a given place and time (or that no regulation is in effect). CurbLR can also indicate a relationship between certain activities, but not others; if a section of curb is described as a standing or loading zone, this implies that parking is not permitted during that period. Beyond this, local regulation must determine what specific activities are allowed in a particular section of the curb. For example, local rules may allow for passenger loading in a "No Parking" zone but not in a "No Stopping" zone.

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

The links below show real world curb regulations translated into CurbLR.

| Link | Description |
| :---- | :---- |
| [Examples of simple regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic restrictions  |
| [Examples of complex regulations](examples/complex_examples.md) | Complex regulatory scenarios typically involving several restrictions  |
| Large dataset of [Los Angeles' parking regulations, translated into CurbLR](/conversions/LA_CurbLR.json) | Contains data from 35,000 parking signs, many with multiple complex regulations. [Raw data](https://geohub.lacity.org/datasets/71c26db1ad614faab1047cc8c3686ece_28) was accessed through LA's open data portal, matched to the SharedStreets Referencing System, cleaned into a [CurbLR-ready CSV](/conversions/prepped_data.csv), and converted into GeoJSON format using [scripts](/js).

### Simple regulation: no parking
Defines a No Parking regulation that applies to all road users. Standing and loading may or may not be permitted.
```json
{
  "rule": {
    "activity": "no parking"
  }
}
```

### Resident parking
Defines a `regulation` to allow people with a Zone 4 Resident Parking Permit to park. Implies no parking for any other users. Standing and loading may or may not be permitted.
```json
{
  "rule": {
    "activity": "parking",
    "reason": "resident parking"
  },
  "userClasses": [
    {
      "classes": ["resident permit"],
      "subclasses": ["zone 4"]
    }
  ]
}
```

### Time-limited handicap space
Defines a `regulation` that allows parking for handicap users with a 3 hour time limit.
```json
{
  "rule": {
    "activity": "parking",
    "maxStay": 180
  },
  "userClasses": [
    {
      "classes": ["handicap"]
    }
  ]
}
```

### Parking with time limit, users must leave for 30 minutes before being allowed to return
Defines a `restriction` that allows anyone to park for up to two hours with payment, with a max stay of two hours, after which the user must leave for at least 30 mins
```json
{
  "rule": {
    "activity": "parking",
    "maxStay": 120,
    "noReturn": 30
  }
}
```

### Taxi stand
Defines a `regulation` that allows taxis to stand and pick up passengers. Implies that no other users may park or stand here.
```json
{
  "rule": {
    "activity": "standing",
    "reason": "taxi stand"
  },
  "userClasses": [
    {
      "classes": ["taxi"],
    }
  ]
}
```

### Rideshare (TNC) pick-up and drop-off zone
Defines a `regulation` that allows rideshare companies to drop off and pick up passengers. Individual jurisdictions must determine what constitutes a rideshare.
```JSON
{
  "rule": {
    "activity": "loading",
    "reason": "rideshare pick-up drop-off"
  },
  "userClasses": [
    {
      "classes": ["rideshare"],
    }
  ]
}
```
