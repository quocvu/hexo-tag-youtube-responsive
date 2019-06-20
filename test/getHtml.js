const rewire = require('rewire');
const should = require('should');

const tag = rewire('../index');
/*
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
*/

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
