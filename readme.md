#Polybot

![polybot banner](banner.png)

a work-in-progress hangouts bot written with [hangupsjs](https://github.com/tdryer/hangups), with a focus on variety of modules and ease of use.

You can try its hosted demo on [google+](https://plus.google.com/114969566275981000493/about).

Uses `chat_modules` to interact with an abstraction of the hangupsjs api. Events are sent from an eventemitter in `index.js`.

##Functions
Command | Function
------------ | -------------
*(`jpe?g`/`png`/`gif` hotlink)* | an inline version of the linked image
*(`tweet` link)* | an inline tweet including username and tweet text
*(`/r/*` or `r/*`)* | a link to `*` subreddit and a description
`.yt *` | a youtube link from the `*` search query
`.t *` | a phrase (`*`) google translated to english
`.c *` | a [mathjs](http://mathjs.org/) compatible `*` expression
`.wiki *` | a fuzzy case sensitive `*` title of a wikipedia article
`.dict *` | an oxford dictionary definition for `*`
`.ud *` | an urban dictionary definition for `*`
`.ascii *` | show `*` ascii emote
`.s *` | send a sticker matching `*` as the title
`.rainbow` | make the chat rainbow color
`.8 *` | makes an 8 ball decision based on the `*` question
`.rename *` | renames the current chat to `*`
`.weather *` | a wunderground location `*` which can be either a zipcode or a location name.
`.timer *` | a timer which counts down `*` seconds and then notifies when reaching `0`.
`.topwords` | analyses up to 10,000 previous messages to generate a word count
`.ref` | links to this page
`.leave` | exits the (group) chat.
