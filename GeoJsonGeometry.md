# GeoJSON feature geometries

Each regulation must be associated with a geographic feature. That feature can be either a `Point` or a line segment (`LineString`). Either way, the geographic coordinates for the point(s) that make up this feature are contained within the `Feature` of a `Feature Class`. The coordinates should be based on the matched SharedStreets output, not the input data. This ensures that the resulting feature geometries have been snapped to the street and can be displayed on a map consistently.

(For a primer on GeoJSON terminology and structure, see [this post](https://macwright.org/2015/03/23/geojson-second-bite.html))

Here's an example of the geometry of a GeoJSON feature. Note that the coordinates are for the signpost's location _after it was snapped to the street_:

```
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [ -118.2816343, 34.0227093]
  }
  ```
