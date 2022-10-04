const rewire = require('rewire');

const tag = rewire('../index');

describe('getIframe()', () => {
  const getIframe = tag.__get__('getIframe');

  test('should have zero frameborder and allowfullscreen by default', () => {
    const html = getIframe({ type: 'video', id: 12345 });
    expect(html).toBe('<iframe src="https://www.youtube.com/embed/12345" allowfullscreen frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });

  test('should have frameborder of 20', () => {
    const html = getIframe({ type: 'video', id: 12345, frameborder: 20 });
    expect(html).toBe('<iframe src="https://www.youtube.com/embed/12345" allowfullscreen frameborder="20" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });

  test('should have allowfullscreen', () => {
    const html = getIframe({ type: 'video', id: 12345, allowfullscreen: 'T' });
    expect(html).toBe('<iframe src="https://www.youtube.com/embed/12345" allowfullscreen frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });

  test('should not have allowfullscreen', () => {
    const html = getIframe({ type: 'video', id: 12345, allowfullscreen: 0 });
    expect(html).toBe('<iframe src="https://www.youtube.com/embed/12345" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });

  test('should have height and width', () => {
    const html = getIframe({ type: 'video', id: 12345, height: 100, width: 200 });
    expect(html).toBe('<iframe src="https://www.youtube.com/embed/12345" allowfullscreen frameborder="0" height="100" width="200" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });
});


describe('getArgs()', () => {
  const getArgs = tag.__get__('getArgs');

  test('should not get any argument', () => {
    const params = getArgs([]);
    expect(Object.keys(params).length).toBe(0);
  });

  test('should get the type video', () => {
    const params = getArgs(['video']);
    expect(Object.keys(params).length).toBe(1);
    expect(params.type).toBe('video');
  });

  test('should the type video and its ID', () => {
    const params = getArgs(['video', 123]);
    expect(Object.keys(params).length).toBe(2);
    expect(params.type).toBe('video');
    expect(params.id).toBe(123);
  })
});


describe('getDefault()', () => {
  const getDefault = tag.__get__('getDefault');

  test('should discard invalid params', () => {
    const params = getDefault({ invalid: 3 });
    expect(Object.keys(params).length).toBe(0);
  });

  test('should retain 4 params', () => {
    const params = getDefault({ autoplay: 1, frameborder: 3 });
    expect(Object.keys(params).length).toBe(2);
    expect(params.autoplay).toBe(1);
    expect(params.frameborder).toBe(3);
  })
});


describe('getParams()', () => {
  const getParams = tag.__get__('getParams');

  test('should discard invalid params', () => {
    const params = getParams("invalid: 3");
    expect(Object.keys(params).length).toBe(0);
  });

  test('should retain 4 params', () => {
    const params = getParams("autoplay: 1\nframeborder: 3");
    expect(Object.keys(params).length).toBe(2);
    expect(params.autoplay).toBe(1);
    expect(params.frameborder).toBe(3);
  })
});
