const yaml = require('js-yaml');

if (process.env.NODE_ENV != 'test') {
  hexo.extend.tag.register('youtuber', youtube);
}

function youtube(args) {
  const mediaType = args[0];
  const id = args[1];

  return `${getCss()}\n\n${getHtml(mediaType, id)}`;
}

const getParams = (args, content) => {
  const params;

  if (args.length > 0) params['mediaType'] = args[0];
  if (args.length > 1) params['id'] = args[1];

  const validParams = [];
  const contentParams = yaml.load(content);
  Object.keys(contentParams).forEach(k => {
    if (validParams.indexOf(k) >= 0) {
      params[k] = contentParams[k];
    }
  });

  return params;
}

const getUrl = (mediaType, id) => {
  if (mediaType === 'video') {
    return new URL('https://www.youtube.com/embed/' + id);
  }

  const listTypes = {
    playlist: 'playlist',
    user: 'user_uploads',
    search: 'search',
  };

  if (Object.keys(listTypes).indexOf(mediaType) >= 0) {
    const params = new URLSearchParams({ listType: listTypes[mediaType], list: id });
    const url = new URL('https://www.youtube.com/embed');
    url.search = params.toString();
    return url;
  }

  console.error('Unable to render Youtube', mediaType, id);
  return null;
}

const getHtml = (mediaType, id) => {
  return `<div class="embed-container"><iframe src="${getUrl(mediaType, id).toString()}" frameborder="0" allowfullscreen></iframe></div>`;
}

const getCss = () => {
  return `<style>.embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }
  .embed-container iframe, .embed-container object, .embed-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  </style>`;
}
