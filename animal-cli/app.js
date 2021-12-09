const data = require('./data/data.js');
const util = require('util');
const {
    filterAnimalByTag,
    peoplesAndAnimalsCounter
} = require("./services/index.js");

/**
* init() function used to start the script
* @param 
*/
const init = () => {
    
    let animalsList = Object.values(data)
    animalsList = animalsList[0]
    
    let arg = process.argv[2].split('=');

    switch (arg[0]) {
        case '--filter':
            !!arg[1] ? 
            console.log(util.inspect(filterAnimalByTag(animalsList, arg[1]), {depth:null})) :
            console.log(util.inspect(filterAnimalByTag(animalsList), {depth:null}))
            break;
            
        case '--count':
            console.log(util.inspect(peoplesAndAnimalsCounter(animalsList), {depth:null}));
            break;
            
        default:
          console.log(`The ${arg[0]} parameter isn't recognized, use --filter=<tag> or --count`);
      }
}

init();

