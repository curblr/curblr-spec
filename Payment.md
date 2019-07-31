# About payment

The `payment` field indicates whether payment is required and stores information that can be used to calculate the fee required for a given time and stay, and how the payment may be made. CurbLR does not, at this time, store information sufficient to facilitate dynamic pricing.

Fees for parking or other street usage can be sorted into three categories, borrowed from the [Alliance for Parking Data Standards'](https://www.allianceforparkingdatastandards.org/resources) Release 2.0:
| Rate type | Description | Example |
| :--- | :--- | :--- |
| Flat-rate | A fixed amount is charged for a period of time, irrespective of the day, time, or actual length of stay. | The fee is $1 per hour, for any part of that hour |
| Flat-rate tier | A fixed amount is charged for an initial period of time. The amount changes for successive periods. The fee schedule may vary based on duration of stay, time of day, or both | In the first hour of a parking session, the fee is $1 for any part of that hour; in the second hour of a parking session, the fee is $2 for any part of that hour. |
| Incrementing | Same as flat-rate tier, but intended to be used for smaller amounts of time, such as 5-minute periods | The fee is 5 cents for the first 5 mins, 10 cents for the next 5 mins, 25 cents for the next 10 mins, 50 cents for the next 15 mins |

These fields are stored as key:value pairs in a pricing object in the spec.

Fees may also vary based on time of day. To address this, users can include a [timespan](TimeSpan.md) object within the pricing object.

# Definition
Each feature in the GeoJSON object may have the following `payment` properties:

| Field name | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| fee | `float` (may be an array) | The amount charged for the duration of stay, expressed as whole units of currency. Currency units can be specified in the `manifest` for the CurbLR feed. | `1`, `0.25`
| durationSt | `int` (may be an array) | Duration of stay, in mins, at which this fee begins to apply. Do not use for flat-fee rates. | `0`, `60` |
| durationEnd | `int` (may be an array) |  Duration of stay, in mins, at which this fee ceases to apply. Do not use for flat-fee rates. | `60`, `120` |
| method | `string` Well-known values: `meter`, `pay station`, `digital` | How the fee is collected at the street-level (or digitally). May be an array of multiple possibilities | `meter`
| form | `string` Well-known values: `coins`, `bills`, `Visa`, `ApplePay` | What type of payment is accepted. May be an array of multiple possibilities, including the name of a particular payment app | [`coins`,`SFMARTA card`]
| operator | `string` | The ID or name of the company that operates the payment method. If the payment operator is the same for most/all of the area, then this could be set as a property of the GeoJSON `Feature Collection` and used here only as an override  | `Acme Paystation` |
| phone | `string` (`E.164 format`: `+` + `country code` + `local area code` + `phone number`) | The phone number, including country and area code, for the company or service that operates and may be contacted about the payment. If the payment operator is the same for most/all of the area, then this could be set as a property of the GeoJSON `Feature Collection` and used here only as an override | `+15551231234` |
| deviceID | `string` | A unique device ID that corresponds to the parking payment device (e.g. meter) for this regulation. For feature geometries that encompass multiple payment devices, list these as an array | `1234nmfl`|
| timeSpan | see [TimeSpan](TimeSpan.md) | If the pricing schedule varies according to the time of day, a timespan object can be embedded here, within this pricing object | see [TimeSpan](TimeSpan.md)

# Examples

| | |
| :---- | :---- |
| [Examples of Simple Regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic restrictions  |

## Flat-rate tier, based on duration
Describes a parking meter. In the first hour of a parking session, the fee is $1 for any part of that hour; in the second hour of a parking session, the fee is $2 for any part of that hour.

```
{
  "payment": {
    "fee": [1, 2],
    "durationSt": [0, 60],
    "durationEnd": [60, 120],
    "method": "meter",
    "form": ["coins", "MasterCard", "Visa", "American Express", "Discover", "ApplePay", "AndroidPay"],
    "operator": "LADOT",
    "phone": "+15552225039",
    "deviceID": "MB-2494"
  }
}
```
