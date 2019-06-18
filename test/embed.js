const rewire = require('rewire');
const should = require('should');

const tag = rewire('../index');

describe('embed', () => {
  const getUrl = tag.__get__('getUrl');

  it('should embed a video', () => {
    const url = getUrl('video', 12345);
    url.toString().should.be.equal('https://www.youtube.com/embed/12345');
  });

  it('should embed a playlist', () => {
    const url = getUrl('playlist', 12345);
    url.toString().should.be.equal('https://www.youtube.com/embed?listType=playlist&list=12345');
  });

  it('should embed a user playlist', () => {
    const url = getUrl('user', 12345);
    url.toString().should.be.equal('https://www.youtube.com/embed?listType=user_uploads&list=12345');
  });

  it('should embed search result', () => {
    const url = getUrl('search', 12345);
    url.toString().should.be.equal('https://www.youtube.com/embed?listType=search&list=12345');
  });

  it('should wrap with correct <div>', () => {
    const getHtml = tag.__get__('getHtml');
    const html = getHtml('video', 12345);
    html.should.be.equal('<div class="embed-container"><iframe src="https://www.youtube.com/embed/12345" frameborder="0" allowfullscreen></iframe></div>');
  });
});
