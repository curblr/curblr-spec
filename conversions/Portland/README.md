# Curb mapping and processing instructions
## Using Portland example data

These steps were followed to create a CurbLR feed for downtown Portland, Oregon. Commands are given for each step. Input/output files are included, as well as any required scripts or configurations.

1. Collect field data (I used [Field Papers](http://fieldpapers.org/)). Here's the overall map of where I went, and a single annotated atlas page with digitized notes and locations:

![IMG_2531](https://user-images.githubusercontent.com/9657971/84815992-b39dba80-afc8-11ea-884f-164f04a3432f.JPG)

As an example, my annotated Field Papers atlas pages and photos taken are [here](https://drive.google.com/file/d/1tcTiNqnNYtyaKNv7KYrdVBeT1X7WxHSP/view?usp=sharing). The GPS data on the photos was affected by urban canyoning and was not accurate enough to use, so I ended up using timestamps and knowledge of my route to determine which photos were taken at which annotation on a Field Paper. This would be difficult for someone to replicate - apologies.


2. Digitize curb assets in [JOSM](https://josm.openstreetmap.de/). Follow [tagging schema](https://docs.google.com/spreadsheets/d/17E97gZJ0Tl7KZEejmm47_eKq5ESHVo-zo7xb1Fv_XA8/edit#gid=1371993522) as closely as possible. *Do not upload to OSM - this is not an approved tagging schema*.

Here's a screenshot of what the Portland data looked like (red points), with an OSM basemap in the background:

<img width="1792" alt="Screen Shot 2019-12-06 at 3 51 27 PM" src="https://user-images.githubusercontent.com/9657971/84816531-260e9a80-afc9-11ea-98c0-03c49eca538c.png">


   When finished, save the layer as `.osm` file.

   Output example file: `portland_2020-01-06_step1_JOSM-output.osm`

3. JOSM assigns negative ID’s to any new features that were not uploaded to OSM. As a result, the output `.osm` file cannot be read by any GIS engine. We need to convert the negatives IDs, creating a new file:

   `$ sed -e "s/id='-/id='/" portland_2020-01-06_step1_JOSM-output.osm | sed -e "s/ref='-/ref='/" > portland_2020-01-06_step2_JOSM-no-negs.osm`


4. Convert the new `.osm` file into a geojson containing all point features, using a custom configuration file that will include all curb-specific tags as flat fields, and ignore all non-curb fields.

   `$ OSM_CONFIG_FILE=curblr_osmconf.ini ogr2ogr -f GeoJSON portland_2020-01-06_step3_for-QGIS.geojson portland_2020-01-06_step2_JOSM-no-negs.osm points`

   The output geojson was duplicated (to keep track of steps). Open the copy in GIS and delete any non-curb features (where `activity is null`).

  Output exammple file = `portland_2020-01-06_step4_curbonly.geojson`

  (At this point, I styled the file in GIS and did some QA to spot data errors that were harder to see in JOSM. Any corrections were made to raw data in JOSM, and the conversion was re-run.)


5. Use [SharedStreets CLI](https://github.com/sharedstreets/sharedstreets-js) to match and join points into street segments. (Since the input data is often given as "here to corner", this leads to curbs that run all the way to the center of an intersection. To fix this, intersections are buffered by a specified radius and clipped out of the matched data). Like so:

   `$ shst match portland_2020-01-06_step4_curbonly.geojson --join-points --join-point-sequence-field=point_relation --join-points-match-fields=marker,priority,activity,max_stay,opening_hours,payment,reason,payment_digital,payment_form,payment_method,payment_phone,payment_rate_durations,payment_rate_fees,payment_zone,user_classes,user_subclasses,bays_angle --buffer-intersections-radius=3`

   This produces two output files:

   `portland_2020-01-06_step4_curbonly.joined.geojson`

   `portland_2020-01-06_step4_curbonly.matched.geojson`

   We use the joined output (`portland_2020-01-06_step4_curbonly.joined.geojson`) in the following step.


6. Use `geojson_to_curblr.js` [script](https://github.com/sharedstreets/curblr/blob/master/conversions/js/geojson_to_curblr.js) to convert output into CurbLR feed. This will require customization for `opening_hours` for your local area; a parser is not included at this stage.

   `node ../js/geojson_to_curblr.js portland_2020-01-06_step4_curbonly.joined.geojson > portland_2020-01-06_step5_curblrization.geojson`

7. Add manifest in front of Feature Collection. The manifest will take this format:

 ```
  "manifest": {
      "createdDate": "2019-12-30T11:40:45Z",
      "lastUpdatedDate": "2019-12-30T17:40:45Z",
      "timeZone": "America/Los_Angeles",
      "currency": "USD",
      "authority": {
          "name": "Portland Bureau of Transportation",
          "url": "https://www.portlandoregon.gov/transportation/"
      }
  }
```

8. Save this file as a new, `*.curblr.json` file.

   Output example file: `portland_2020-01-06_step6.curblr.json`
