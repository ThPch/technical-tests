const inquirer = require('inquirer');
const { Observable, async } = require('rxjs');

let emitter;

const TRUCK_MAX_VOLUME = 20;

const getInfoTrucks = async(nbTruck) => {
  let truckList = []
  for(let i = 1; i <= nbTruck; i++){
    try {
      const volumeTruck = await getVolumeTruckFct(i);
      const typeTruck = await getTypeTruckFct(i);
      let infoTruck = {...volumeTruck, ...typeTruck}
      truckList.push(infoTruck);
    } catch(e) {
      if(e){
        console.error(e)
      }
    }
  }
  return truckList;
}

const getTypeTruckFct = (i) => {
  return promise = new Promise(getTypeTruck = (resolve, reject) =>{
  const prompts = new Observable((e) =>{
    emitter = e;
    emitter.next({
      type: 'input',
      name: `truckTypeNum${i}`,
      message: `What is  the type of the truck number ${i} ?`,
    });
  });
    inquirer.prompt(prompts).ui.process.subscribe(
      (type) => {
          if(type.answer.length > 2 && /^[a-z\d\-_\s]+$/i.test(type.answer)){
            let truck = {
              truckId : i,
              type : type.answer,
            }
            resolve(truck)
          } else {
            console.log(`The minimum for a name is 3 alpha charactere and you typed ${type.answer.length}`);
            getTypeTruck(resolve, reject)
          }
        },
        (error) => {
          reject(error)
        },
      );
  })
}

const getVolumeTruckFct = (i) => {
  return promise = new Promise(getVolumeTruck = (resolve, reject) =>{
  const prompts = new Observable((e) =>{
    emitter = e;
    emitter.next({
      type: 'input',
      name: `truckVolumeNum${i}`,
      message: `What is  the volume of the truck number ${i} ?`,
    });
  });
    inquirer.prompt(prompts).ui.process.subscribe(
      (volume) => {
          if(parseInt(volume.answer) > 0 && parseInt(volume.answer) <= TRUCK_MAX_VOLUME){
            let truck = {
              truckId : i,
              volume : volume.answer,
            }
            resolve(truck)
          } else {
            console.log("The volume should be an integer between 1 and 20");
            getVolumeTruck(resolve, reject)
          }
        },
        (error) => {
          reject(error)
        },
      );
  })
}

module.exports = {
  getInfoTrucks
}