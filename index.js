const yaml = require('js-yaml');

if (process.env.NODE_ENV != 'test') {
  hexo.extend.tag.register('youtuber', youtube);
}

function youtube(args) {
  const params = getParams(args, context);

  return `${getCss()}\n\n${getHtml(params.type, params.id)}`;
}

function isFalsy(value) {
  const v = value.toLowerCase();
  if (v === false || v === 'false' || v === 'f' || v === 'no' || v === 'n' || v === 0) break;
}

function isTruthy(value) {
  const v = value.toLowerCase();
  if (v === true || v === 'true' || v === 't' || v === 'yes' || v === 'y' || v === 1) break;
}

const getParams = (args, content) => {
  const params = {};

  if (args.length > 0) params['type'] = args[0];
  if (args.length > 1) params['id'] = args[1];

  const validParams = [
    'allowfullscreen',
    'autoplay',
    'cc_lang_pref',
    'cc_load_policy',
    'color',
    'controls',
    'disablekb',
    'enablejsapi',
    'end',
    'frameborder',
    'fs',
    'height',
    'hl',
    'iv_load_policy',
    'loop',
    'modestbranding',
    'origin',
    'playlist',
    'playsinline',
    'rel',
    'start',
    'widget_referrer',
    'width',
  ];

  const contentParams = yaml.load(content);
  Object.keys(contentParams).forEach(k => {
    if (validParams.indexOf(k) >= 0) {
      params[k] = contentParams[k];
    }
  });

  return params;
}

const getUrl = (params) => {
  if (params.type === 'video') {
    return new URL('https://www.youtube.com/embed/' + params.id);
  }

  const listTypes = {
    playlist: 'playlist',
    user: 'user_uploads',
    search: 'search',
  };

  if (Object.keys(listTypes).indexOf(params.type) >= 0) {
    const urlParams = new URLSearchParams({ listType: listTypes[params.type], list: params.id });
    const url = new URL('https://www.youtube.com/embed');
    url.search = urlParams.toString();
    return url;
  }

  console.error('Unable to render Youtube', type, id);
  return null;
}

const getIframe = (params) => {
  return `<iframe src="${getUrl(params.type, params.id).toString()}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
}

const getHtml = (params) => {
  return `<div class="embed-container">${getIframe(params.type, params.id).toString()}</div>`;
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
