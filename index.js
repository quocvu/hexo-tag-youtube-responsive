function youtube(args) {
  const mediaType = args[0];
  const id = args[1];
  let action;

  switch (mediaType) {
    case 'video':
      action = '/' + id;
      break;
    case 'playlist':
      action = '?listType=playlist&list=' + id;
      break;
    case 'user':
      action = '?listType=user_uploads&list=' + id;
      break;
    case 'search':
      action = '?listType=search&list=' + id;
      break;
    default:
      console.error('Unable to render Youtube', mediaType, id);
      break;
  };

  const css =
`<style>.embed-container {
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

  const html =
`<div class="embed-container">
  <iframe src="https://www.youtube.com/embed${action}" frameborder="0" allowfullscreen></iframe>
</div>`;


  return `${css}\n\n${html}`;
}

hexo.extend.tag.register('youtuber', youtube);
