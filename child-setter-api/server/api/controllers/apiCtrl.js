'use strict'

const httpStatus = require('http-status')
const apiService = require('../services/apiService')


/**
* childSetterCtrl() controller that should check if there is a payload
* @param { req, res } req is the http request and res the response
*/
const childSetterCtrl = async (req, res) => {
  try {
    if(!!req.payload){
       let payload = req.payload
       const data = await apiService.childSetter(payload)
       return data
    }
    else {
      return { statusCode: httpStatus.EXPECTATION_FAILED, message: "Payload has to be sent in the body, in a JSON format" }
    }

  } catch (error) {
    const errorMessage = ` Failed to set children to their parents on the JSON`
    console.error(error)
    return { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: `${errorMessage} AND ${error}` }
  }
}

/**
* getReposByTagCtrl() controller s
* @param { req, res } req is the http request and res the response
*/
const getReposByTagCtrl = async (req, res) =>{
  try{
    const data = await apiService.getRepoByTag2()
    return data
  }
  catch (error) {

    const errorMessage = ` Failed to set children to retrieve data from the Github API`
    console.error(error)
    return { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: `${errorMessage} AND ${error}` }

  }
}

module.exports = {
  childSetterCtrl,
  getReposByTagCtrl
}
