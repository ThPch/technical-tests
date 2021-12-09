# Romanizer API

This API is built to provide a service which allows an user to convert an arabic numeral into a romenian number from a range 1 to 100

## Installing

```
npm install
npm start
```

The local server run on port 3000

## Infos
```
├───models
│ ├───No models
├───routes
│ ├───Express routes that define API structure
├───services
│ ├───Encapsulates all business logic ad can also make calls to the data access layer
├───controllers
│ ├───Controllers receive incoming client requests, and they leverage services. It can also respond to the client
├───test
│ ├───Units testing
```
## Endpoints

- [api/conversion](#conversion)

---

## Conversion

Used to HTTP POST an arabic number

**URL** : `/api/conversion`

**Method** : `POST`

**Headers** : `Content-Type: application/json`

**Data constraints**

```json
{
  "data": "[integer >=1 && integer <=100 ]"
}
```

#### Success Response

The result is the converted romanian number

**Code** : `200 OK`

**Content example for '22'**

```json
{
  "data": "XXII"
}
```

#### Error Response

**Condition** : Data undefined or incorrect

**Code** : `400 : Data undefined or incorrect`

**Condition** : Number out of range

**Code** : `401 : The number is not in the 1-100 range`

**Condition** : Error

**Code** : `402 : Error`

---

## Unit Testing

Using mocha & chai for testing
visit http://mochajs.org and http://chaijs.com for details

Running test :

```
npm test
```

- Test of the function romanize()
- Test of the function romanize()
- Test of api through POST REQUEST

**Expectation** : 3/3 tests are passing

```
  Javascript Function
    Romanizer function
      √ should return the converted romanian number of the numeral arabic 96 which is XCVI
      √ should return the converted romanian number of the numeral arabic 22 which is XXII
      √ should return the converted romanian number of the numeral arabic 96 which is XCVI through the http request post


  3 passing (41ms)
```
