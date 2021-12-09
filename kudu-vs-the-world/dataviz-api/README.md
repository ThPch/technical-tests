# dataviz-api

This API is built to provide a service which allows a client to fetch antelope's data from an external source (AWS).

## TRD :

- Node.js should be installed, LTS version is recommanded
- TypeScript is used for this project

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
│ ├───No tests are implemented
```
## Endpoints

- [api/antelopes](#Antelopes)

---

## Antelopes

Used to fetch data from the api

**URL** : `/api/antelopes`

**Method** : `GET`


#### Success Response

**Code** : `200 OK`

**Sample of data returned :**

```json
[
  {
    "name": "Addax",
    "continent": "Africa",
    "weight": 220,
    "height": 41,
    "horns": "Twisted",
    "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/A_big_male_Addax_showing_as_the_power_of_his_horns.jpg/1280px-A_big_male_Addax_showing_as_the_power_of_his_horns.jpg"
  },
  {
    "name": "Arabian oryx",
    "continent": "Asia",
    "weight": 150,
    "height": 39,
    "horns": "Straight",
    "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Arabian_oryx_(oryx_leucoryx).jpg/1280px-Arabian_oryx_(oryx_leucoryx).jpg"
  }]
```

