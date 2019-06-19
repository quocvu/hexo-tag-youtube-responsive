const rewire = require('rewire');
const should = require('should');

const tag = rewire('../index');

const getUrl = tag.__get__('getUrl');

describe('getUrl', () => {
  it('should embed a video', () => {
    const url = getUrl({ type: 'video', id: 12345 });
    url.toString().should.be.equal('https://www.youtube.com/embed/12345');
  });

  it('should embed a playlist', () => {
    const url = getUrl({ type: 'playlist', id: 12345 });
    url.toString().should.be.equal('https://www.youtube.com/embed?listType=playlist&list=12345');
  });

  it('should embed a user playlist', () => {
    const url = getUrl({ type: 'user', id: 12345 });
    url.toString().should.be.equal('https://www.youtube.com/embed?listType=user_uploads&list=12345');
  });

  it('should embed search result', () => {
    const url = getUrl({ type: 'search', id: 12345 });
    url.toString().should.be.equal('https://www.youtube.com/embed?listType=search&list=12345');
  });
});
