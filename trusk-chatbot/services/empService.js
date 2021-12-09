const inquirer = require('inquirer');
const { Observable, async } = require('rxjs');

let emitter;

const getNameEmp = async(nbEmp) => {
  let empList = []
  for(let i = 1; i <= nbEmp; i++){
    try {
      const infoEmp = await getInfoEmpFct(i);
      empList.push(infoEmp);
    } catch(e) {
      if(e){
        console.error(e)
      }
    }
  }
  return empList;
}

const getInfoEmpFct = (i) => {
  return promise = new Promise(getInfoEmp = (resolve, reject) =>{
  const prompts = new Observable((e) =>{
    emitter = e;
    // need to start with at least one question here
    emitter.next({
      type: 'input',
      name: `empNameNum${i}`,
      message: `What is  the name of the employee number ${i} ?`,
    });
  });
    inquirer.prompt(prompts).ui.process.subscribe(
      (name) => {
          if(name.answer.length > 2 && /^[a-z\d\-_\s]+$/i.test(name.answer)){
            let emp = {
              empId : i,
              empName : name.answer,
            }
            resolve(emp)
          } else {
            console.log(`The minimum for a name is 3 alpha charactere and you typed ${name.answer.length}`);
            getInfoEmp(resolve, reject)
          }
        },
        (error) => {
          reject(error)
        },
      );
  })
}

module.exports = {
  getNameEmp
}
