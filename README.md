[![Build Status](http://img.shields.io/travis/quocvu/hexo-tag-youtube-responsive.svg?style=for-the-badge)](https://travis-ci.org/quocvu/hexo-tag-youtube-responsive)
[![Coverage Status](https://img.shields.io/coveralls/quocvu/hexo-tag-youtube-responsive.svg?style=for-the-badge)](https://coveralls.io/github/quocvu/hexo-tag-youtube-responsive)[![NPM Downloads](https://img.shields.io/npm/dt/hexo-tag-youtube-responsive.svg?style=for-the-badge)](https://www.npmjs.com/package/hexo-tag-youtube-responsive)
[![NPM Version](https://img.shields.io/npm/v/hexo-tag-youtube-responsive.svg?style=for-the-badge)](https://www.npmjs.com/package/hexo-tag-youtube-responsive)
[![Dependencies](https://img.shields.io/david/quocvu/hexo-tag-youtube-responsive.svg?style=for-the-badge)](https://david-dm.org/quocvu/hexo-tag-youtube-responsive)
[![License](https://img.shields.io/github/license/quocvu/hexo-tag-youtube-responsive.svg?style=for-the-badge)](https://github.com/quocvu/hexo-tag-youtube-responsive/blob/master/LICENSE)

# hexo-tag-youtube-responsive

[Hexo] tag plugin to embed a [Youtube] player that auto resizes with your responsive layout.

## Install

Install using [npm][npm-url].

    $ npm install hexo-tag-youtube-responsive --save

## Usage

### Embed a video

```
  {% youtuber video VIDEO_ID %}
```

For example

```
  {% youtuber video I07XMi7MHd4 %}
```

### Embed a playlist

```
  {% youtuber playlist PLAYLIST_ID %}
```

For example

```
  {% youtuber playlist PLC77007E23FF423C6 %}
```

Note that you need to prepend the playlist ID with the letters PL as shown above

### Embed search results of a query

```
  {% youtuber search QUERY_KEYWORDS %}
```

For example

```
  {% youtuber search hexo %}
  {% youtuber search hexo+tag+plugin %}
```

If your search has more than one keyword, use `+` to concatenate them together as shown above

### Embed a user's uploaded videos (a.k.a. channel)

```
  {% youtuber user USERNAME %}
```

For example

```
  {% youtuber search daddybear %}
```

Note that you must supply the user name and not the channel ID

### Parameters

You may specify additional parameters in YAML format as

```
{% youtuber video VIDEO_ID %}
  allowfullscreen: yes,
  autoplay: 1,
  cc_lang_pref: fr,
  cc_load_policy: 1,
  color: white,
  controls: 0,
  disablekb: 1,
  enablejsapi: 1,
  end: 210,
  frameborder: 20,
  fs: 0,
  height: 480,
  hl: fr,
  iv_load_policy: 3,
  loop: 1,
  modestbranding: 1,
  origin: your-domain,
  playlist: "videoId1,videoId2,videoId3",
  playsinline: 0,
  privacy_mode: yes,
  rel: 1,
  showinfo: 0,
  start: 30,
  widget_referrer: https://your-domain.com/some-page,
  width: 640,
{% endyoutuber %}
```

The majority of the parameters can be found in [Youtube documentation].

For the remaining:

* If `width` and `height` are given as dimension of the player, it will cancel the auto-resize feature of this widget
* `frameborder` allows to specify the edge thickness around the player
* `privacy_mode` allows to play video without being tracked by google (no cookies used)
* `allowfullscreen` let the user switch on the full screen mode if desired


[npm-url]: https://npmjs.org/package/hexo-tag-youtube-responsive
[Hexo]: https://hexo.io/
[Youtube]: https://youtube.com/
[Youtube documentation]: https://developers.google.com/youtube/player_parameters
