Image Bucket
============

This builds https://bucket.patrickbyrne.net/ from a list of images captured to Airtable using Eleventy and deployed to Netlify.

Usage
-----

* Build site to `_site/`: `make`
* Run local server: `make serve`

Misc
----

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
