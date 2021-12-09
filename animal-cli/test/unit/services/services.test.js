'use strict'

const { expect } = require('chai');
const chai = require('chai')
const {
    filterAnimalByTag,
    peoplesAndAnimalsCounter
} = require('../../../services/index.js')

const data = [{
    name: 'Dillauti',
    people:
      [{
        name: 'Winifred Graham',
        animals:
          [{name: 'Anoa'},
            {name: 'Duck'},
            {name: 'Narwhal'},
            {name: 'Badger'},
            {name: 'Cobra'},
            {name: 'Crow'}]
      },
        {
            name: 'Anthony Bruno',
            animals:
              [{name: 'Caracal'},
                {name: 'Anteater'},
                {name: 'Kiwa Hirsuta'},
                {name: 'Zooplankton'},
                {name: 'Tarantula'},
                {name: 'Oryx'}]
        }
      ]
}]

const correctAnswerFirstTest = [
    {
      name: 'Dillauti',
      people: [
        { name: 'Anthony Bruno', animals: [ { name: 'Oryx' } ] }
      ]
    }
  ]

const correctAnswerSecondTest = [{
    name: 'Dillauti [2]',
    people:
      [{
        name: 'Winifred Graham [6]',
        animals:
          [{name: 'Anoa'},
            {name: 'Duck'},
            {name: 'Narwhal'},
            {name: 'Badger'},
            {name: 'Cobra'},
            {name: 'Crow'}]
      },
        {
            name: 'Anthony Bruno [6]',
            animals:
              [{name: 'Caracal'},
                {name: 'Anteater'},
                {name: 'Kiwa Hirsuta'},
                {name: 'Zooplankton'},
                {name: 'Tarantula'},
                {name: 'Oryx'}]
        }
      ]
}]

describe('filterAnimalByTag(data, tag) Services Function where tag="ry" ', () => {
    it('Only animals containing `ry` are displayed. The order should be kept intact. Empty array after filtering are NOT returned.', (done) => {
      
        let returnedArray = filterAnimalByTag(data, "ry")

        expect(returnedArray)
                  .to.be.an.instanceof(Array)
                  .that.includes.all.keys([ 0 ])
                  .to.eql(correctAnswerFirstTest)

        expect(returnedArray[0])
            .to.have.deep.property('name')

        expect(returnedArray[0].name).to.eql('Dillauti')

        expect(returnedArray[0].people.length).to.eql(1)

    
        done();
     
    });
  });


  describe('peoplesAndAnimalsCounter(data) Services Function', () => {
    it('Prints the counts of People and Animals by counting the number of children and appending it in the name', (done) => {
      
        let returnedArray = peoplesAndAnimalsCounter(data)

        expect(returnedArray)
                  .to.be.an.instanceof(Array)
                  .to.eql(correctAnswerSecondTest)

        expect(returnedArray[0])
            .to.have.deep.property('name')
        
        expect(returnedArray[0].name).to.eql('Dillauti [2]')

        expect(returnedArray[0].people.length).to.eql(2)

        done();
     
    });
  });