#Polybot

![polybot banner](banner.png)

a work-in-progress hangouts bot written with [hangupsjs](https://github.com/tdryer/hangups), with a focus on variety of modules and ease of use.

You can try its hosted demo on [google+](https://plus.google.com/114969566275981000493/about).

Uses `chat_modules` to interact with an abstraction of the hangupsjs api. Events are sent from an eventemitter in `index.js`.

##Functions
Command | Function
------------ | -------------
*(`jpg`/`png` hotlink)* | an inline version of the linked image
`.yt *` | a youtube link from the `*` search query
`.t *` | a phrase (`*`) google translated to english (buggy)
`.c *` | a [mathjs](http://mathjs.org/) compatible `*` expression
`.wiki *` | a fuzzy case sensitive `*` title of a wikipedia article
`.weather *` | a wunderground location `*` which can be either a zipcode or a location name.
`.timer *` | a timer which counts down `*` seconds and then notifies when reaching `0`.
`.leave` | exits the (group) chat.