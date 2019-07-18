const rewire = require('rewire');
const should = require('should');

const tag = rewire('../index');

describe('getIframe()', () => {
  const getIframe = tag.__get__('getIframe');
  tag.__set__('getUrl', () => {
    return '--';
  });

  it('should have zero frameborder and allowfullscreen by default', () => {
    const html = getIframe({ type: 'video', id: 12345 });
    html.should.be.equal('<iframe src="--" allowfullscreen frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });

  it('should have frameborder of 20', () => {
    const html = getIframe({ type: 'video', id: 12345, frameborder: 20 });
    html.should.be.equal('<iframe src="--" allowfullscreen frameborder="20" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });

  it('should have allowfullscreen', () => {
    const html = getIframe({ type: 'video', id: 12345, allowfullscreen: 'T' });
    html.should.be.equal('<iframe src="--" allowfullscreen frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });

  it('should not have allowfullscreen', () => {
    const html = getIframe({ type: 'video', id: 12345, allowfullscreen: 0 });
    html.should.be.equal('<iframe src="--" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });

  it('should have height and width', () => {
    const html = getIframe({ type: 'video', id: 12345, height: 100, width: 200 });
    html.should.be.equal('<iframe src="--" allowfullscreen frameborder="0" height="100" width="200" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });
});


describe('getArgs()', () => {
  const getArgs = tag.__get__('getArgs');

  it('should not get any argument', () => {
    const params = getArgs([]);
    Object.keys(params).length.should.be.equal(0);
  });

  it('should get the type video', () => {
    const params = getArgs(['video']);
    Object.keys(params).length.should.be.equal(1);
    params.type.should.be.equal('video');
  });

  it('should the type video and its ID', () => {
    const params = getArgs(['video', 123]);
    Object.keys(params).length.should.be.equal(2);
    params.type.should.be.equal('video');
    params.id.should.be.equal(123);
  })
});


describe('getDefault()', () => {
  const getDefault = tag.__get__('getDefault');

  it('should discard invalid params', () => {
    const params = getDefault({ invalid: 3 });
    Object.keys(params).length.should.be.equal(0);
  });

  it('should retain 4 params', () => {
    const params = getDefault({ autoplay: 1, frameborder: 3 });
    Object.keys(params).length.should.be.equal(2);
    params.autoplay.should.be.equal(1);
    params.frameborder.should.be.equal(3);
  })
});


describe('getParams()', () => {
  const getParams = tag.__get__('getParams');

  it('should discard invalid params', () => {
    const params = getParams("invalid: 3");
    Object.keys(params).length.should.be.equal(0);
  });

  it('should retain 4 params', () => {
    const params = getParams("autoplay: 1\nframeborder: 3");
    Object.keys(params).length.should.be.equal(2);
    params.autoplay.should.be.equal(1);
    params.frameborder.should.be.equal(3);
  })
});
