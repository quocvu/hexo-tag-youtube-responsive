const rewire = require('rewire');
const should = require('should');

const tag = rewire('../index');

describe('getHtml()', () => {
  const getHtml = tag.__get__('getHtml');

  it('should wrap with correct <div>', () => {
    tag.__set__('getIframe', () => {
      return '--';
    });
    const html = getHtml({ type: 'video', id: 12345 });
    html.should.be.equal('<div class="embed-container">--</div>');
  });
});


describe('getIframe()', () => {
  const getIframe = tag.__get__('getIframe');

  it('should wrap with correct <div>', () => {
    tag.__set__('getUrl', () => {
      return '--';
    });
    const html = getIframe({ type: 'video', id: 12345 });
    html.should.be.equal('<iframe src="--" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  });
});


describe('getParams()', () => {
  const getParams = tag.__get__('getParams');

  it('should discard invalid params', () => {
    const params = getParams([], "invalid: 3");
    Object.keys(params).length.should.be.equal(0);
  });

  it('should retain 4 params', () => {
    const params = getParams(['video', 123], "autoplay: 1\nframeborder: 3");
    Object.keys(params).length.should.be.equal(4);
    params.type.should.be.equal('video');
    params.id.should.be.equal(123);
    params.autoplay.should.be.equal(1);
    params.frameborder.should.be.equal(3);

  })
});
