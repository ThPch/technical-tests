'use strict'

/* eslint-disable max-nested-callbacks */

const chai = require('chai')
const sinonChai = require('sinon-chai')
let chaiHttp = require('chai-http');

const server = require('../../../server.js')


chai.should();
chai.expect();
chai.use(sinonChai);
chai.use(chaiHttp);

server.start();

const API_URL = `http://localhost:${process.env.APP_PORT}/api`

//The response of the API service used for testing purpose
const apiResponse = [
  {
      "id": 10,
      "title": "House",
      "level": 0,
      "children": [
          {
              "id": 12,
              "title": "Red Roof",
              "level": 1,
              "children": [],
              "parent_id": 10
          }
      ],
      "parent_id": null
  }
]

//The JSON body using as a request to the API for testing purpose
const apiRequest = {"0":
    [{"id": 10,
      "title": "House",
      "level": 0,
      "children": [],
      "parent_id": null}],
    "1":
    [{"id": 12,
      "title": "Red Roof",
      "level": 1,
      "children": [],
      "parent_id": 10}]
};

  /*
  * Test the /POST route
  */
 describe('/POST /child-setter', () => {
  it('it should get place the sort the children to their parent using parent_id', (done) => {
    chai.request(API_URL)
        .post('/child-setter')
        .send(apiRequest)
        .end((err, res) => {
              res.should.have.status(200);
              chai.expect(res.body)
                .to.be.an.instanceof(Array)
                .to.eql(apiResponse)
          done();
        });
  });
});

  /*
  * Test the /GET route
  */
 describe('/GET /', () => {
  it('it should provide an array of github repositories', (done) => {
    chai.request(API_URL)
        .get('/')
        .end((err, res) => {
              res.should.have.status(200);
              chai.expect(res.body)
                .to.be.an.instanceof(Array)
                .and.to.have.property(0)
                .that.includes.all.keys([ 'id', 'name', 'owner' ])
          done();
        });
  });
});

describe('/GET /login', () => {
  it('it should be 404 error as the route /login doesnt exist', (done) => {
    chai.request(API_URL)
        .get('/login')
        .end((err, res) => {
              res.should.have.status(404);
          done();
        });
  });
});
