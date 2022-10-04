const rewire = require('rewire');

const tag = rewire('../index');

const getUrl = tag.__get__('getUrl');

describe('getUrl', () => {
  test('should embed a video', () => {
    const url = getUrl({ type: 'video', id: 12345 });
    expect(url.toString()).toBe('https://www.youtube.com/embed/12345');
  });

  test('should embed a video with privacy mode', () => {
    const url = getUrl({ type: 'video', id: 12345, privacy_mode: 'yes' });
    expect(url.toString()).toBe('https://www.youtube-nocookie.com/embed/12345');
  });

  test('should embed a playlist', () => {
    const url = getUrl({ type: 'playlist', id: 12345 });
    expect(url.toString()).toBe('https://www.youtube.com/embed?listType=playlist&list=12345');
  });

  test('should embed a user playlist', () => {
    const url = getUrl({ type: 'user', id: 12345 });
    expect(url.toString()).toBe('https://www.youtube.com/embed?listType=user_uploads&list=12345');
  });

  test('should embed search result', () => {
    const url = getUrl({ type: 'search', id: 12345 });
    expect(url.toString()).toBe('https://www.youtube.com/embed?listType=search&list=12345');
  });

  test('should autoplay the video', () => {
    const url = getUrl({ type: 'search', id: 12345, autoplay: 1 });
    expect(url.toString()).toBe('https://www.youtube.com/embed?listType=search&list=12345&autoplay=1');
  });

  test('should use lang preference for close caption', () => {
    const url = getUrl({ type: 'search', id: 12345, cc_lang_pref: 'fr' });
    expect(url.toString()).toBe('https://www.youtube.com/embed?listType=search&list=12345&cc_lang_pref=fr');
  });
});
