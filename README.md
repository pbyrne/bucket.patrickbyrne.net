Image Bucket
============

This builds https://bucket.patrickbyrne.net/ from a list of images captured to Airtable using Eleventy and deployed to Netlify.

Usage
-----

* Build site to `_site/`: `make`
* Run local server: `make serve`

Misc
----

### Generating thumbnails

To optimize build times, particularly since the images don't change much over time, generate the thumbnails ahead of time instead of when building. Where and how these are stored is a distinct concern from generating the markup (at time of writing, they're stored in a WebDAV instance I have handy) so this operates against a local sync which isn't checked into the repo at `tmp/files/` with structure like so:

- tmp/files/bucket.json: The JSON metadata about all the files it knows about.
- tmp/files/original/: All the originals in a flat list.
- tmp/files/thumbs/: Thumbnails will be stored here as `{width}/{original_filename}`.

Run `bin/generate-thumbnails` to loop over the originals and generate thumbnails for each (using gifsicle for GIFs and ImageMagick for the rest). Run `bin/update-json` to add its data to the JSON used to build the site. Pushing those files to permanent storage is left as an exercise for the reader.

### One-time import

The assets were historically stored in Airtable, capturing the datestamp and relying on the Airtable-provided thumbnails as a convenience. Now, they're stored in a WebDAV volume with thumbnails I generate myself and additional image metadata stored in JSON. Data was seeded from the version of the site built from the Airtable data, like so:

- Copy the originals
- Generate a thumbnails with ImageMagick: `convert originals/$name -resize '80x80>' thumbs/80/$name`
- Build JSON (with dates & width/height) from original source data in Eleventy
- Add thumbnail data to bucket.json

```
$ for thumb in $(ls tmp/dav/thumbs/80/*); do base=$(basename $thumb); echo "`date` ${base}…"; dims=$(identify $thumb | head -n1 | cut -f3 -d' '); width=$(echo $dims | cut -f1 -d'x'); height=$(echo $dims | cut -f2 -d'x'); echo $width - $height; done
$ cat tmp/dav/bucket.json| jq --arg width 80 --arg height 46 --arg base "$base" '.images[$base].path = "originals/" + $base | .images[$base].thumbnails["80"] = {width: $width, height: $height, path: ("thumbs/80/" + $base)}'
```

- Upload the whole kit and kaboodle to WebDAV
