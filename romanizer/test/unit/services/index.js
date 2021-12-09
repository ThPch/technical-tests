const chai = require('chai');
const should = chai.should();
const { romanize } = require('../../../services/index');
const axios = require('axios');
const app = require('../../../index');

describe('Javascript Function', function() {
  context('Romanizer function', function() {
    it('should return the converted romanian number of the numeral arabic 96 which is XCVI', function() {
        const numberToConvert = 96;
        romanize(numberToConvert).should.equal('XCVI');
    });

    it('should return the converted romanian number of the numeral arabic 22 which is XXII', function() {
      const numberToConvert = 22;
      romanize(numberToConvert).should.equal('XXII');
    });

    it('should return the converted romanian number of the numeral arabic 96 which is XCVI through the HTTP POST request', (done) => {
      axios.post('http://localhost:3000/api/conversion', {
        data: 96
      }).then((response) => {
        response.data.should.equal('XCVI');
        done();
      }, (error) => {
        console.log(error);
      });
    });
  });
});