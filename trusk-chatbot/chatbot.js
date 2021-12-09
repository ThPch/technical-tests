'use strict';
const { getNameEmp } = require("./services/empService.js");
const { getInfoTrucks } = require("./services/truckService.js");
const inquirer = require('inquirer');

 console.log('Hi, welcome abroad');
 
 const questions = [
   {
     type: 'input',
     name: 'truskerName',
     message: "What's your name ?",
   },
   {
    type: 'input',
    name: 'compagnyName',
    message: "What's the name of your compagny ?",
  },
  {
    type: 'input',
    name: 'compagnyNbEmp',
    message: "How many emp do you have ?",
  }];

  const truckQust = {
    type: 'input',
    name: 'compagnyNbTruck',
    message: "How many trucks do you have ?",
  };

 const getInfos = async () => {
    let answers = await inquirer.prompt(questions);
    if(answers.compagnyNbEmp > 0){
        const empList = await getNameEmp(answers.compagnyNbEmp);
        answers = {...answers,
                  employees : empList}
    }

    let truckAnsw = await inquirer.prompt(truckQust);
    
    if(truckAnsw.compagnyNbTruck > 0){
        const truckList = await getInfoTrucks(truckAnsw.compagnyNbTruck);
        answers = {...answers,
            trucks : truckList}
    }

    let getValidation = await inquirer.prompt({
        type: 'confirm',
        name: 'isValid',
        message: `Do you confirm the informations below ? : \n
        ${JSON.stringify(answers)}`,
        default: false,
      })
    
    if(getValidation.isValid){
        console.log('validé')
    } else {
        getInfos();
    }
}

getInfos()