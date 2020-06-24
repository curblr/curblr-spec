# GeoJSON feature geometries

Each regulation must be associated with a geographic feature, which must be a line segment (`LineString`). The geographic coordinates for the points that comprise this feature are contained within the `Feature` of a `Feature Class`. The coordinates should be based on the _matched SharedStreets output, not the input data_. This ensures that the resulting feature geometries have been snapped to the street and can be displayed on a map consistently.

For a primer on GeoJSON terminology and structure, see [this post](https://macwright.org/2015/03/23/geojson-second-bite.html). For a more in depth description [the geojson website](https://geojson.org/) and the [full RFC](https://tools.ietf.org/html/rfc7946) are good resources.

Each geographic coordinate should have no more than 7 decimal places of precision. This is sufficient to describe a location with ~1.1 cm accuracy. Further precision is unnecessary; less is sufficient.

| Field name | Importance  | Type | Description | Example
| :--- | :--- | :--- | :--- | :--- |
| type | Required | `string` | | `Feature`
| geometry.type | Required | `string` | Describes the type of geometry being described | See [here](https://tools.ietf.org/html/rfc7946#section-3.1) for full list of possible values |
| geometry.coordinates | Required | `array` | The coordinates of the geometry being described | |
| geometry.properties | Required | `json object` | A json object whose members represent the properties of the geojson geometry. They may include but are not limited to; [Images](Images.md), [Location](Location.md), [Regulations](Regulations.md) | |


Here's an example of the geometry of a GeoJSON feature. Note that the coordinates are for the signpost's location _after it was snapped to the street and extrapolated into a street segment_:

```json
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-112.1258855,33.4513431],
      [-112.1253007,33.4513208]
    ],
    "properties": {
    }
  }
}
```

# Examples

The links below show real world curb regulations translated into CurbLR.

| Link | Description |
| :---- | :---- |
| [Examples of simple regulations](examples/simple_examples.md) | Simple regulatory scenarios typically involving one or two basic restrictions  |
| [Examples of complex regulations](examples/complex_examples.md) | Complex regulatory scenarios typically involving several restrictions  |
| Sample of [downtown Portland's parking regulations](/conversions/Portland/portland_2020-02-20.curblr.json) | Contains data for about 3 miles of parking regulations, surveyed in November 2019. This can also be viewed at [demo.curblr.org](https://demo.curblr.org)
