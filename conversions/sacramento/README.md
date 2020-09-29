# Transforming on-street parking data from Sacramento into CurbLR

## Examining the data

I downloaded [Sacramento's on-street parking data](https://data.cityofsacramento.org/datasets/0060469c57864becb76a036d23236143_0) and at first I thought we might be able to just add some columns to the data (using this [data schema](https://docs.google.com/spreadsheets/d/17E97gZJ0Tl7KZEejmm47_eKq5ESHVo-zo7xb1Fv_XA8/edit#gid=1371993522)and start converting it (there's a simple [script](https://github.com/sharedstreets/curblr/blob/master/conversions/js/geojson_to_curblr.js) we wrote for Portland that can act as a base). But it looks like this is a pretty complicated dataset with a lot of different parking types living in different columns, sometimes with multiple regulations for one feature. We could still add columns and do it that way, but I think it would be faster to just write a conversion script and not mess around with adding columns, so I'll show an example of how to do that. This uses javascript but you could do the same thing in Python or any other language of your choice... or maybe within the ArcGIS UI.

## 1. Convert point data to street segments (lines) with linear referencing info

The on-street parking data is organized as a collection of points that usually represent one parking space, spaced about 7 meters apart. Step 1 is to turn these points into sections of street with a length of 7 meters each. (You could set a length for each individual feature or type of feature, if you have more information about the spaces).

<img src="images/sacramento_measure.png" width="800">

First, take the on-street parking GIS data and export is as a GeoJSON file in the WGS84 coordinate system (EPSG 4326). Any GIS program should be able to do this. I've named mine `onstreetparking.geojson`

Next, use the [SharedStreets command line interface](https://github.com/sharedstreets/sharedstreets-js) to convert the points into segments. Here's how the tool works to convert points into street segments using a buffer length:

<img src="images/buffer_process.png" width="800">

Quick note on the tool: the CLI runs on Mac and Linux systems but not on PCs. If that's a problem, reach out. We are planning to release a PC-friendly version in the fall/winter but may be able to help you find a solution in the meantime.

Once the CLI is installed, the basic command is `shst match [name of input file] [name of output file]`. I've added some extra flags to the matching command that tell it to use OpenStreetMap data from March 2020 and to buffer each point by 7 meters once it's snapped to the street. Here's the command I used:

`$ shst match onstreetparking.geojson --tile-source=osm/planet-200330 --buffer-points --buffer-points-length=7 --out=sacramento_parking.geojson`

Since parking space points are not all exactly 7 meters apart, some will overlap. You could add a `merge` flag that will dissolve overlapping segments that have identical parking rules, so we get one longer segment instead of multiple short, overlapping ones. This requires specifying "match fields" (a list of all data fields that must match in order for segments to be considered as having identical rules and therefore dissolved) and fields to group by, so I skipped this part in the interest of time since I don't know the data very well.

About 44k of the 45k features were matched successfully (it's normal to have a few that fall out - you'd have to check these to find out why and fix the problem, if necessary). There are three output files (matched, unmatched, and buffered - we are interested in the buffered one). The output file is linked [here](/sacramento_parking.buffered.geojson). If we load it into GIS and inspect it, it looks like this:

<img src="images/sacramento_buffer.png" width="800">

Note that all original data fields have been renamed with a "pp_" prefix. Linear referencing properties have been added.

Because the parking spaces are matched to street centerlines, they appear in the middle of the road and it's visually hard to tell which side of the street the parking spaces are on. That's intentional. We recommend addressing this in map renderers rather than by changing the actual geometries of the data... but the CLI can add an offset to matched features if desired. This makes the output look more intuitive, though I wouldn't recommend constructing your feed this way. You can do this by adding `--offset-line=5` to your CLI command. Results look more like this:

<img src="images/sacramento_offset.png" width="800">

Again, that's just to make sure you know that we haven't lost track of which side of the street your parking spaces are on, and we'll be using the non-offset data in all steps going forward.

## Scripting 

Here's an example of how to convert processed street segments into CurbLR, using the buffered Sacramento parking spaces. This uses a few common regulations as an example and would need to be expanded to cover the whooe Sacramento feed. However, we've found that many cities have about 10-15 common regulations that cover ~95% of their parking rules, so converting a whole feed isn't too daunting.

I approached this by looking at the example regulations and figuring out where the essential CurbLR regulation information was kept, so that I could determine properties like `activity`, `userClasses`, and `timeSpan` for the common rules.

I also looked to see:
- Which original data fields should be preserved? This includes object IDs that can tie records back to the original dataset and street names.
- Which original fields can be mapped 1:1 onto CurbLR? This includes fields like "PKGTYPE" (which I'm using as the `priorityCategory`)
- Which original fields need to be transformed slightly? For example, "TIMELIMIT" has values like "90 Minutes" and "10 Hour", which have to be converted into a number of minutes to be used in CurbLR's `maxStay` property.
- Which essential data is missing? Some common rules, like "Time Zone", need to be extrapolated into essential information such as `activity=parking` with a `maxStay` property. Another example, "TIMELIMIT = No Parking Anytime" + "PKGTYPE = Driveway" is converted into `activity=no_standing` since driveways shouldn't be used as a standing, loading, or parking area.

The example script is included as [sacramento_geojson_to_curblr.js](/sacramento_geojson_to_curblr.js). It contains logic to handle a handful of common rules:
- No standing anytime (because of crosswalks, driveways, alleys, railway crossings)
- Bus stops
- No parking anytime
- Yellow zones
- White zones
- Blue zones
- Time-limited parking
- Street sweeping (weekly and monthly)

If any of these rules only apply during certian days or times, then the script also adds a default, unrestricted parking rule that applies at all other days and times.

I ran the script on the data using the following command:

`node sacramento_geojson_to_curblr.js sacramento_parking.buffered.geojson > sacramento_curblr_processed.geojson`

The output contains about 9,000 features and is included as [sacramento_curblr_processed.geojson](/sacramento_curblr_processed.geojson).

## Add some metadata on top

The last thing to do is add metadata to the file so it's clear who created the data, when, and what order the priority categories should go in. There's not an easy way to automate this so we manually drop it in. To do this, open the processed data created in Step 2 in any text editor. Add the metadata at the beginning of Line 2 (after the initial `{` character on Line 1 and right before this line that's currently on Line 2: `"type": "FeatureCollection",`)

Here's an example of a metadata block that you can drop in there and edit so it's specific to Sacramento:

```json 
"manifest": { 
    "createdDate": "2020-09-28T22:40:45Z", 
    "lastUpdatedDate": "2020-09-28T22:40:45Z", 
    "curblrVersion": "1.1.0", 
    "priorityHierarchy": ["no standing anytime", "street sweeping", "loading", "no parking", "restricted parking", "parking", "unrestricted parking by default"], 
    "timeZone": "America/Los_Angeles", 
    "currency": "USD", 
    "authority": {
        "name": "City Of Sacramento", 
        "url": "https://www.cityofsacramento.org/Public-Works/Transportation"
    } 
},
```

Drop that text in, save the file with the extension ".curblr.json", and you've got a CurbLR feed. This example feed is saved here as [sacramento_test.curblr.json](sacramento_test.curblr.json).

I can't promise this is perfect, but it will give you a good idea of one way that you could approach your data.