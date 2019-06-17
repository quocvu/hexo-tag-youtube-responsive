[![NPM Downloads](https://img.shields.io/npm/dt/hexo-tag-youtube-responsive.svg?style=for-the-badge)](https://www.npmjs.com/package/hexo-tag-youtube-responsive)
[![NPM Version](https://img.shields.io/npm/v/hexo-tag-youtube-responsive.svg?style=for-the-badge)](https://www.npmjs.com/package/hexo-tag-youtube-responsive)
[![Dependencies](https://img.shields.io/david/quocvu/hexo-tag-youtube-responsive.svg?style=for-the-badge)](https://david-dm.org/quocvu/hexo-tag-youtube-responsive)
[![License](https://img.shields.io/github/license/quocvu/hexo-tag-youtube-responsive.svg?style=for-the-badge)](https://github.com/quocvu/hexo-tag-youtube-responsive/blob/master/LICENSE)

# hexo-tag-youtube-responsive

[Hexo] tag plugin to embed a [Youtube] widget that auto resizes with your responsive layout

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

[npm-url]: https://npmjs.org/package/hexo-tag-youtube-responsive
[Hexo]: https://hexo.io/
[Youtube]: https://youtube.com/
