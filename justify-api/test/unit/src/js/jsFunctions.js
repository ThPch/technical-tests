const chai = require('chai');
const should = chai.should();
const jsFunctions = require('../../../../src/js/jsFunctions');

describe('Javascript Function', function() {
  context('Words count and justifying', function() {
    it('should return the correct total words in a string', function() {
        const str = `Cette phrase possède cinq mots`;

        //Il y'a 5 mots dans la phrase, on attend que le résultat de la fonction soit 5
        jsFunctions.countWords(str).should.equal(5);
    });

    it('should return a string of 217 characters transformed (justifyed width of 80 characters) into 246 characters', function() {
      const str = `Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, 
      mais pesait comme des écailles sur mes yeux et les empêchait de se 
      rendre compte que le bougeoir n’était plus allumé.`;

      //La phrase comporte 217 caractères; après justification elle doit en contenir 246.
      const total = jsFunctions.justifyStr(str);
      total.length.should.equal(246);
    });

  });
});
