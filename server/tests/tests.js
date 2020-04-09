import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
chai.use(chaiHttp);
chai.should();
describe('get welcome message', () => {
  it('should return all images', (done) => {
    chai
      .request(app)
      .get('/api/v1/images')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('message')
          .eql('All images successfully retrieved');
        done();
      });
  });
  it('should return single images', (done) => {
    chai
      .request(app)
      .get('/api/v1/images/1')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('message')
          .eql('Image with id 1 is retrived successfully');
        done();
      });
  });
  it('should not return single images', (done) => {
    chai
      .request(app)
      .get('/api/v1/images/10000')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('message')
          .eql('Image with id 10000 not found');
        done();
      });
  });
  it('should add an image', (done) => {
    chai
      .request(app)
      .post('/api/v1/images/add')
      .send({
        url: 'https://i.picsum.photos/id/936/200/300.jpg',
        snippet: 'facebook',
        context: 'Learn to drive',
        photographer: 'Amni',
      })
      .end((err, res) => {
        console.log(res.body);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(409);
        res.body.should.have
          .property('message')
          .eql('url already exists already exists');
        done();
      });
  });
});
