const yaml = require('js-yaml');
const _ = require('lodash');

if (process.env.NODE_ENV != 'test') {
  hexo.extend.tag.register('youtuber', youtube);
}

function youtube(args) {
  const params = getParams(args, context);

  if (_.has(params, 'height') || _.has(params, 'width')) {
    // by default it is responsive unless dimension is specified
    return getIframe(params);

  }
  return `${getCss()}\n\n<div class="embed-container">${getIframe(params)}</div>`;
}

function isFalsy(value) {
  const v = _.isString(value) ? value.toLowerCase() : value;
  return v === false || v === 'false' || v === 'f' || v === 'no' || v === 'n' || v === '0' || v === 0;
}

function isTruthy(value) {
  const v = _.isString(value) ? value.toLowerCase() : value;
  return v === true || v === 'true' || v === 't' || v === 'yes' || v === 'y' || v === '1' || v === 1;
}

function isParamFalsy(params, field) {
  if (!_.has(params, field)) return false;
  return isFalsy(params[field]);
}

function isParamTruthy(params, field) {
  if (!_.has(params, field)) return false;
  return isTruthy(params[field]);
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
    'privacy_mode',
    'rel',
    'showinfo',
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
  const url = new URL(_.has(params, 'privacy_mode') && isTruthy(params.privacy_mode) ?
    'https://www.youtube-nocookie.com' : 'https://www.youtube.com');
  const urlParams = new URLSearchParams();

  if (params.type === 'video') {
    url.pathname = `/embed/${params.id}`;
  } else {
    const listTypes = { playlist: 'playlist', user: 'user_uploads', search: 'search' };

    if (Object.keys(listTypes).indexOf(params.type) >= 0) {
      urlParams.set('listType', listTypes[params.type]);
      urlParams.set('list', params.id);
      url.pathname = '/embed';
    } else {
      console.error('Unable to render Youtube', type, id);
      return null;
    }
  }

  const validParams = [
    'autoplay',
    'cc_lang_pref',
    'cc_load_policy',
    'color',
    'controls',
    'disablekb',
    'enablejsapi',
    'end',
    'fs',
    'hl',
    'iv_load_policy',
    'loop',
    'modestbranding',
    'origin',
    'playlist',
    'playsinline',
    'rel',
    'showinfo',
    'start',
    'widget_referrer',
  ];

  validParams.forEach(p => {
    if (_.has(params, p)) {
      urlParams.set(p, params[p]);
    }
  })

  url.search = urlParams.toString();
  return url;
}

const getIframe = (params) => {
  let options = [];

  if (!_.has(params, 'allowfullscreen') || isTruthy(params.allowfullscreen)) options.push(`allowfullscreen`);
  options.push(`frameborder="${_.has(params, 'frameborder') ? params.frameborder : 0}"`);
  if (_.has(params, 'height')) options.push(`height="${params.height}"`);
  if (_.has(params, 'width')) options.push(`width="${params.width}"`);

  return `<iframe src="${getUrl(params).toString()}" ${options.join(' ')} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
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
