const rewire = require('rewire');
const should = require('should');

const tag = rewire('../index');

describe('getHtml()', () => {
  const getHtml = tag.__get__('getHtml');

  it('should wrap with correct <div>', () => {
    tag.__set__('getUrl', () => {
      return '--';
    });
    const html = getHtml('video', 12345);
    html.should.be.equal('<div class="embed-container"><iframe src="--" frameborder="0" allowfullscreen></iframe></div>');
  });
});


describe('getParams()', () => {
  
});
