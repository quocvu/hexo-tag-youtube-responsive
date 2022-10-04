const tag = require('./index');

describe('tag.getIframe()', () => {
  test('should have zero frameborder and allowfullscreen by default', () => {
    const html = tag.getIframe({ type: 'video', id: 12345 });
    expect(html).toBe('<iframe src="https://www.youtube.com/embed/12345" allowfullscreen frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });

  test('should have frameborder of 20', () => {
    const html = tag.getIframe({ type: 'video', id: 12345, frameborder: 20 });
    expect(html).toBe('<iframe src="https://www.youtube.com/embed/12345" allowfullscreen frameborder="20" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });

  test('should have allowfullscreen', () => {
    const html = tag.getIframe({ type: 'video', id: 12345, allowfullscreen: 'T' });
    expect(html).toBe('<iframe src="https://www.youtube.com/embed/12345" allowfullscreen frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });

  test('should not have allowfullscreen', () => {
    const html = tag.getIframe({ type: 'video', id: 12345, allowfullscreen: 0 });
    expect(html).toBe('<iframe src="https://www.youtube.com/embed/12345" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });

  test('should have height and width', () => {
    const html = tag.getIframe({ type: 'video', id: 12345, height: 100, width: 200 });
    expect(html).toBe('<iframe src="https://www.youtube.com/embed/12345" allowfullscreen frameborder="0" height="100" width="200" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });
});


describe('tag.getArgs()', () => {
  test('should not get any argument', () => {
    const params = tag.getArgs([]);
    expect(Object.keys(params).length).toBe(0);
  });

  test('should get the type video', () => {
    const params = tag.getArgs(['video']);
    expect(Object.keys(params).length).toBe(1);
    expect(params.type).toBe('video');
  });

  test('should the type video and its ID', () => {
    const params = tag.getArgs(['video', 123]);
    expect(Object.keys(params).length).toBe(2);
    expect(params.type).toBe('video');
    expect(params.id).toBe(123);
  })
});


describe('tag.getDefault()', () => {
  test('should discard invalid params', () => {
    const params = tag.getDefault({ invalid: 3 });
    expect(Object.keys(params).length).toBe(0);
  });

  test('should retain 4 params', () => {
    const params = tag.getDefault({ autoplay: 1, frameborder: 3 });
    expect(Object.keys(params).length).toBe(2);
    expect(params.autoplay).toBe(1);
    expect(params.frameborder).toBe(3);
  })
});


describe('tag.getParams()', () => {
  test('should discard invalid params', () => {
    const params = tag.getParams("invalid: 3");
    expect(Object.keys(params).length).toBe(0);
  });

  test('should retain 4 params', () => {
    const params = tag.getParams("autoplay: 1\nframeborder: 3");
    expect(Object.keys(params).length).toBe(2);
    expect(params.autoplay).toBe(1);
    expect(params.frameborder).toBe(3);
  })
});

describe('getUrl', () => {
  test('should embed a video', () => {
    const url = tag.getUrl({ type: 'video', id: 12345 });
    expect(url.toString()).toBe('https://www.youtube.com/embed/12345');
  });

  test('should embed a video with privacy mode', () => {
    const url = tag.getUrl({ type: 'video', id: 12345, privacy_mode: 'yes' });
    expect(url.toString()).toBe('https://www.youtube-nocookie.com/embed/12345');
  });

  test('should embed a playlist', () => {
    const url = tag.getUrl({ type: 'playlist', id: 12345 });
    expect(url.toString()).toBe('https://www.youtube.com/embed?listType=playlist&list=12345');
  });

  test('should embed a user playlist', () => {
    const url = tag.getUrl({ type: 'user', id: 12345 });
    expect(url.toString()).toBe('https://www.youtube.com/embed?listType=user_uploads&list=12345');
  });

  test('should embed search result', () => {
    const url = tag.getUrl({ type: 'search', id: 12345 });
    expect(url.toString()).toBe('https://www.youtube.com/embed?listType=search&list=12345');
  });

  test('should autoplay the video', () => {
    const url = tag.getUrl({ type: 'search', id: 12345, autoplay: 1 });
    expect(url.toString()).toBe('https://www.youtube.com/embed?listType=search&list=12345&autoplay=1');
  });

  test('should use lang preference for close caption', () => {
    const url = tag.getUrl({ type: 'search', id: 12345, cc_lang_pref: 'fr' });
    expect(url.toString()).toBe('https://www.youtube.com/embed?listType=search&list=12345&cc_lang_pref=fr');
  });
});
