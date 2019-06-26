# About payment
Parking payment may be priced according to varying schedules and even dynamic pricing profiles. In the future, CurbLR could include a more robust approach to parking pricing. At the moment, it can store a minimum cost per time interval, and a maximum cost per time interval. These bookends are included as a means to incorporate flat fare structures and accommodate some more complicated profiles, while being feasible to create for many cities with limited data. An application built on top of the current CurbLR standard would need to inform a user that parking rates vary between X and Y, and the user would have to determine the exact cost in person.

We are very interested in feedback from cities or companies that would like to weigh in on this aspect of CurbLR.

# Definition
Each feature in the GeoJSON objet may have the following properties:


| Field name | Type | Description | Example
| :--- | :--- | :--- | :--- |
| minRate | array | Groups properties corresponding to the minimum cost per interval of time (e.g. refers to the concept of "$1/hr") | |
| minRate.minAmount | `float` | The minimum cost of parking, in local currency units (e.g. USD, GBP, EUR) for a specified time interval | `2.0` |
| minRate.minInterval | `int` | The time interval, in minutes, that is purchased by the minimum parking fee amount | `2.0` |
| maxRate | array | Groups properties corresponding to the maximum cost per interval of time (e.g. refers to the concept of "$2/hr") | |
| maxRate.maxAmount | `float` | The maximum cost of parking, in local currency units (e.g. USD, GBP, EUR) for a specified time interval | `2.0` |
| maxRate.maxInterval | `int` | The time interval, in minutes, that is purchased by the maximum parking fee amount | `2.0` |
| method | `string` Well-known values: `meter`, `pay station`, `digital` | How the fee is collected at the street-level (or digitally). May be an array of multiple possibilities | `meter`
| form | `string` Well-known values: `coins`, `bills`, `credit`, `digital` | What type of payment is accepted. May be an array of multiple possibilities, including the name of a particular payment app | [`coins`,`bills`]
| paymentOperator | `string` | The ID or name of the company that operates the payment method. If the payment operator is the same for most/all of the area, then this could be set as a property of the GeoJSON `Feature Collection` and used here only as an override  | `Acme Paystation`
| deviceID | `string` | A unique device ID that corresponds to the parking payment device (e.g. meter) for this regulation. For feature geometries that encompass multiple payment devices, list these as an array | `1234nmfl`|
