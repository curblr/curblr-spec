# About payment

The payment object indicates whether payment is required and stores information that can be used to calculate the fee required for a given time and stay, and how the payment may be made. CurbLR does not, at this time, store information sufficient to facilitate dynamic pricing.

Fees for parking or other street usage can be sorted into three categories, borrowed from the [Alliance for Parking Data Standards'](https://www.allianceforparkingdatastandards.org/resources) Release 2.0:

| Rate type | Description | Example |
| :--- | :--- | :--- |
| Flat-rate | A fixed amount is charged for a period of time, irrespective of the day, time, or actual length of stay. | The fee is $1 per hour, for any part of that hour |
| Flat-rate tier | A fixed amount is charged for an initial period of time. The amount changes for successive periods. The fee schedule may vary based on duration of stay, time of day, or both | In the first hour of a parking session, the fee is $1 for any part of that hour; in the second hour of a parking session, the fee is $2 for any part of that hour. |
| Incrementing | Same as flat-rate tier, but intended to be used for smaller amounts of time, such as 5-minute periods | The fee is 5 cents for the first 5 mins, 10 cents for the next 5 mins, 25 cents for the next 10 mins, 50 cents for the next 15 mins |

These fields are stored as key:value pairs in a pricing object in the spec.

Fees may also vary based on time of day. To address this, users can include a [TimeSpan](TimeSpans.md) object within the payment object.

# Definition
Each feature in the GeoJSON object may have the following Payment properties:

| Field name | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| rates | `array` | The fee amounts and durations. If the fee amount varies depending on time of day, then optional TimeSpan object(s) can be included here. Each rates field can include a single or multiple values, so for consistency, rates fields are always arrays.
| rate.fees | array of `float` | The amounts charged for the duration of stay, expressed as whole units of currency. Currency units can be specified in the `manifest` for the CurbLR feed. | [`1`]; [`0.25`, `0.5`]
| rate.durations | array of `int` | Duration of stay, in mins, for which this fee applies. Consecutive periods (for incrementing or other tiered parking rates) can be stored in an array. The final fee and duration in the arrays are assumed to repeat until the `maxStay`, defined in the [rule](Rule.md). | [`60`]; [`30`, `15`, `15`] |
| rate.timeSpans | `array`, see [TimeSpans](TimeSpans.md) and examples | If the pricing schedule varies according to the time of day, a timespan object can be embedded within the rate object | see [TimeSpans](TimeSpans.md) and examples below |
| method | `string` Well-known values: `meter`, `pay station`, `digital` | How the fee is collected at the street-level (or exclusively digitally). | `pay station` |
| forms | array of `string` Well-known values: `coins`, `bills`, `Visa`, `ApplePay` | What type of payment is accepted. Expressed as an array. | [`coins`,`SFMARTA card`, `ParkingApp`]
| operator | `string` | The ID or name of the company that operates the payment method. If the payment operator is the same for most/all of the area, then this could be set as a property of the GeoJSON `Feature Collection` and used here only as an override  | `Acme Paystation` |
| phone | `string` (`E.164 format`: `+` + `country code` + `local area code` + `phone number`) | The phone number, including country and area code, for the company or service that operates and may be contacted about the payment. If the payment operator is the same for most/all of the area, then this could be set as a property of the GeoJSON `Feature Collection` and used here only as an override | `+15551231234` |
| deviceID | `string` | A unique device ID that corresponds to the parking payment device (e.g. meter) for this regulation. For feature geometries that encompass multiple payment devices, list these as an array | `1234nmfl`|

# Examples

| | |
| :---- | :---- |
| [Examples of Simple Regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic regulations  |

## Flat-rate
Describes a parking meter. The fee is $1 for any part of an hour.

```json
{
  "payment": {
    "rates": [
      {
        "fees": [1],
        "durations": [60]
      }
    ],
    "method": "meter",
    "forms": ["coins"],
    "operator": "LADOT",
    "phone": "+15552225039",
    "deviceID": "MB-2038"
  }
}
```

## Flat-rate tier, based on duration
Describes a parking meter. In the first hour of a parking session, the fee is $1 for any part of that hour; in the second hour of a parking session, the fee is $2 for any part of that hour.

```json
{
  "payment": {
    "rates": [
      {
        "fees": [1, 2],
        "durations": [60, 60]
      }
    ],
    "method": "meter",
    "forms": ["coins", "MasterCard", "Visa", "American Express", "Discover", "ApplePay", "AndroidPay"],
    "operator": "LADOT",
    "phone": "+15552225039",
    "deviceID": "MB-2494"
  }
}
```

## Flat-rate tier, varies based on time of day
Describes a parking meter. From 9am to 5pm, the fee is $1 for the first 30 mins and $2 per 15 mins. From 5pm to 10pm, the fee is $1 per hour.

```json
{
  "payment": {
    "rates": [
      {
        "fees": [1, 2],
        "durations": [60, 60],
        "timeSpans": [
          {
            "timeOfDay": {
              "from": "09:00",
              "until": "17:00"
            }
          }
        ]
      },
      {
        "fees": [1],
        "durations": [60],
        "timeSpans": [
          {
            "timesOfDay": [
              {
                "from": "17:00",
                "until": "22:00"
              }
            ]
          }
        ]
      }
    ],
    "method": "meter",
    "forms": ["coins", "MasterCard", "Visa", "American Express", "Discover", "ApplePay", "AndroidPay"],
    "operator": "LADOT",
    "phone": "+15552225039",
    "deviceID": "MB-0028"
  }
}
```


## Incrementing
Describes a parking meter. The fee is 5 cents for the first 5 mins, 10 cents for the next 5 mins, 25 cents for the next 10 mins, 50 cents for the next 15 mins.

```json
{
  "payment": {
    "rates": {
      "fees": [0.05, 0.1, 0.25, 0.5],
      "durations": [5, 5, 10, 15]
    },
    "method": "meter",
    "forms": ["coins", "MasterCard", "Visa", "American Express", "Discover", "ApplePay", "AndroidPay"],
    "operator": "LADOT",
    "phone": "+15552225039",
    "deviceID": "MB-2494"
  }
}
```
