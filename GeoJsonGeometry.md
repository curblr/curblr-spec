# GeoJSON feature geometries

Each regulation must be associated with a geographic feature, which must be a line segment (`LineString`). The geographic coordinates for the points that comprise this feature are contained within the `Feature` of a `Feature Class`. The coordinates should be based on the _matched SharedStreets output, not the input data_. This ensures that the resulting feature geometries have been snapped to the street and can be displayed on a map consistently.

(For a primer on GeoJSON terminology and structure, see [this post](https://macwright.org/2015/03/23/geojson-second-bite.html))

Here's an example of the geometry of a GeoJSON feature. Note that the coordinates are for the signpost's location _after it was snapped to the street and extrapolated into a street segment_:

```
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [-112.12588548660278,33.45134313598914],[-112.12530076503754,33.45132075686167]
  }
  ```
