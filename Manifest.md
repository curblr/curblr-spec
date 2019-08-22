# About metadata (the manifest)

Agencies creating a CurbLR feed may wish to specify properties that apply across the entire feed. These are included in a `manifest` that appears at the beginning of the feed. The manifest is a JSON object, and below it is the GeoJSON object, which contains all of the features (geometries and associated regulations).

# Definition

The manifest JSON object may contain the following properties:

| Field name | Importance  | Type | Description | Example |
| :---: | :--- | :--- | :--- | :--- |
| createdDate | Required | `string` (`YYYY-MM-DD`) | Date when this CurbLR feed was created from asset data | `2019-06-01` |
| lastUpdatedDate | If applicable | `string` (`YY-MM-DD`) | Date when this CurbLR feed was updated from asset data. Does not apply if this is the initial CurbLR feed for an area | `2019-06-06` |
| timeZone | Required | `enum` (`string`) Possible values are listed in [tz database](https://www.iana.org/time-zones) | Defines the timezone for the local area covered by the CurbLR feed | `Europe/London`
| currency | Required | `string` Possible values are listed in [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) | Local currency, for interpreting payment information | `USD`
| unitHeightLength | Required | `string` (for most countries, this will be `feet` or `metres`) | Defines the unit of measure used to describe maximum and minimum vehicle height and length restrictions in the [UserClass](UserClass.md) | `feet`, `metres` |
| unitWeight | Required | `string` (well-known values: `tons`, `tonnes`, `pounds`, `kilograms`) | Defines the unit of measure used to describe maximum and minimum vehicle weight restrictions in the [UserClass](UserClass.md) | `tons` |
| authority | Required | object | Defines which government authority regulates the curbspace described by the individual CurbLR feed. Many cities conducting data collection will only survey the areas that they regulate, so storing this as a universal property helps to reduce the size of the GeoJSON. If an override or exception is needed, this can be stored in the [rule](Rule.md) as a property that describes the activity being permitted or forbidden | |
| authority.name | Required | `string` (web link) | Name of agency | `City of London`
| authority.url | Required | `string` (web link) | Link to the regulatory agency's domain | `https://vancouver.ca`
| authority.phone | Optional | `string` (`E.164 format`: `+` + `country code` + `local area code` + `phone number`) | The phone number,  including country and area code, for the regulatory agency that could be contacted about parking regulations | `+15551231234`

# Examples

The links below show real world curb regulations translated into CurbLR.

| Link | Description |
| :---- | :---- |
| [Examples of simple regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic restrictions  |
| [Examples of complex regulations](examples/complex_examples.md) | Complex regulatory scenarios typically involving several restrictions  |
| Large dataset of [Los Angeles' parking regulations, translated into CurbLR](/conversions/LA_CurbLR.json) | Contains data from 35,000 parking signs, many with multiple complex regulations. [Raw data](https://geohub.lacity.org/datasets/71c26db1ad614faab1047cc8c3686ece_28) was accessed through LA's open data portal, matched to the SharedStreets Referencing System, cleaned into a [CurbLR-ready CSV](/conversions/prepped_data.csv), and converted into GeoJSON format using [Jupyter](https://github.com/sharedstreets/CurbLR/blob/master/conversions/CSV%20to%20JSON%20parking%20rules.ipynb).
