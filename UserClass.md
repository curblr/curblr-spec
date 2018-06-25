# General
Curb [Regulations](Regulation.md) are often applied differently to different road users. For example, street parking may be allowed but only for vehicles displaying a resident parking permit with a specific zone number. Or, a section of curb may be reserved for pick up and drop off by vehicles providing ride share services.

A UserClass can define a type of vehicle, permit, or service for which a [Rule](Rule.md) may be applied. Each jurisdiction will determine how they want to differentiate between types of road users and create the appropriate UserClass definitions. 

A given vehicle may fall into multiple user classes depending on activity and circumstance (for example, a car may be operated as a ride share vehicle and display a resident parking permit).

# Definition
| field | format  | description | example |
| :--- | :--- | :--- | :--- |
| class | `string` | The identifier of a user class | `Resident Permit` or `Ride Share` or `Food Truck` |
| subclass | `string` | An optional secondary identifier for a class of user. Useful for subdividing permit holders by zone or other designation | `Zone 4` |

# Examples

### Food truck
Defines a class for vehicles operating as food trucks
```
{
  class: "Food Truck"
}
```

### Zoned resident parking
Defines a class for vehicles displaying a Zone 4 Resident Permit.
```
{
  class: "Resident Permit",
  subclass: "Zone 4"
}
```

### Truck classification
Two user classes for trucks, depending on length of vehicle. Could allow for large truck parking restrictions that would not apply to smaller trucks.
```
{
  class: "Truck",
  subclass: "25ft or less"
}
{
  class: "Truck",
  subclass: "over 25ft"
}
```
### Car share
Defines car share spaces with subclasses for specific operations. This would allow for certain spaces to be reserved for specific operators while also allowing the creation of floating car share spaces to be used by any operator.
```
{
  class: "Car Share",
  subclass: "Zipcar"
}
{
  class: "Car Share",
  subclass: "Car2Go"
}
```
