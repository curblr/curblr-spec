# About payment
Parking payment may be priced according to varying schedules and even dynamic pricing profiles. In the future, CurbLR could include a more robust approach to parking pricing. At the moment, it can store a minimum cost per time interval, and a maximum cost per time interval. These bookends are included as a means to incorporate flat fare structures and accommodate some more complicated profiles, while being feasible to create for many cities with limited data. An application built on top of the current CurbLR standard would need to inform a user that parking rates vary between X and Y, and the user would have to determine the exact cost in person.

# Definition
Each feature in the GeoJSON may have the following properties:


| Field name | Importance  | Type | Description | Example
| :--- | :--- | :--- | :--- | :--- |
| minRate | Optional | array | Groups properties corresponding to the minimum cost per interval of time (e.g. refers to the concept of "$1/hr") | |
| minRate.minAmount | Optional | `float` | The minimum cost of parking, in local currency units (e.g. USD, GBP, EUR) for a specified time interval | `2.0` |
| minRate.minInterval | Optional | `int` | The time interval, in minutes, that is purchased by the minimum parking fee amount | `2.0` |
| maxRate | Optional | array | Groups properties corresponding to the maximum cost per interval of time (e.g. refers to the concept of "$2/hr") | |
| maxRate.maxAmount | Optional | `float` | The maximum cost of parking, in local currency units (e.g. USD, GBP, EUR) for a specified time interval | `2.0` |
| maxRate.maxInterval | Optional | `int` | The time interval, in minutes, that is purchased by the maximum parking fee amount | `2.0` |
| method | Optional | `string` Well-known values: `meter`, `pay station`, `digital` | How the fee is collected at the street-level (or digitally). May be an array of multiple possibilities | `meter`
| form | Optional | `string` Well-known values: `coins`, `bills`, `credit`, `digital` | What type of payment is accepted. May be an array of multiple possibilities, including the name of a particular payment app | [`coins`,`bills`]
