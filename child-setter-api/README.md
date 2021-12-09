# child-setter API
See instructions.md for more details

- The application needs to have an endpoint that takes a body containing a `JSON` document following the format presented below under [Appendix 1 Input](#appendinx-1-input) as one of the parameters.
- Upon receiving a call, the [HapiJS](https://hapi.dev/) application should run an algorithm to turn the input into the format shown under [Appendix 2 Output](#appendix-2-output). The `JSON` document needs to be re-organized by moving children into the correct parents.
- The application should then return the formatted document in a `JSON` document.

## Requirements

- [node.js](https://nodejs.org/en/download/current/) >= `8.4.0`
- .env file at the root of the folder, you can use the sample in the bin folder

## Installing

```
git clone https://github.com/ThPch/child-setter.git
cd child-setter

npm install
npm start
```

The local server run on port 5000

## Infos in the main folder

```
├───bin
│ ├───Dev.env sample file
├───config
│ ├───Default values of environment variables, which are common across all environments can be configured via `config/default.json`
│     Values specific to a particular environment can be set by creating a file with same name in config directory. Like `config/test/json` for test environment.
│     `config/custom-environment-variables` is used to read values from environment variables. For ex. if `APP_PORT` env var is set it can be accessed as `config.get('app.port')`.
├───test
│ ├───Unit testing
├───server
│ ├───server & api configuration
```

## Infos in the server/api folder

```
├───routes
│ ├───[HapiJS](https://hapi.dev/) routes that define API structure
├───services
│ ├───Encapsulates all business logic ad can also make calls to the data access layer
├───controllers
│ ├───Controllers receive incoming client requests, and they leverage services. It can also respond to the client
```

## Endpoints

- [api/child-setter](#child-setter)
- [api/](#fetch)

---

## child-setter

Used to HTTP POST a JSON similar to [Appendix 1 Input](#appendinx-1-input)

**URL** : `/api/child-setter`

**Method** : `POST`

**Headers** : `Content-Type: application/json`

**Data constraints** : Must be a JSON like

#### Appendix 1 Input

```json
{
  "0": [
    {
      "id": 10,
      "title": "House",
      "level": 0,
      "children": [],
      "parent_id": null
    }
  ],
  "1": [
    {
      "id": 12,
      "title": "Red Roof",
      "level": 1,
      "children": [],
      "parent_id": 10
    },
    {
      "id": 18,
      "title": "Blue Roof",
      "level": 1,
      "children": [],
      "parent_id": 10
    },
    { "id": 13, "title": "Wall", "level": 1, "children": [], "parent_id": 10 }
  ],
  "2": [
    {
      "id": 17,
      "title": "Blue Window",
      "level": 2,
      "children": [],
      "parent_id": 12
    },
    { "id": 16, "title": "Door", "level": 2, "children": [], "parent_id": 13 },
    {
      "id": 15,
      "title": "Red Window",
      "level": 2,
      "children": [],
      "parent_id": 12
    }
  ]
}
```

#### Success Response

The result is the converted romanian number

**Code** : `200 OK`

**Content example for the data**

#### Appending 2 Output

```json
[
  {
    "id": 10,
    "title": "House",
    "level": 0,
    "children": [
      {
        "id": 12,
        "title": "Red Roof",
        "level": 1,
        "children": [
          {
            "id": 17,
            "title": "Blue Window",
            "level": 2,
            "children": [],
            "parent_id": 12
          },
          {
            "id": 15,
            "title": "Red Window",
            "level": 2,
            "children": [],
            "parent_id": 12
          }
        ],
        "parent_id": 10
      },
      {
        "id": 18,
        "title": "Blue Roof",
        "level": 1,
        "children": [],
        "parent_id": 10
      },
      {
        "id": 13,
        "title": "Wall",
        "level": 1,
        "children": [
          {
            "id": 16,
            "title": "Door",
            "level": 2,
            "children": [],
            "parent_id": 13
          }
        ],
        "parent_id": 10
      }
    ],
    "parent_id": null
  }
]
```

#### Error Response

**Condition** : Bad Request, for example the type of the body isn't a JSON

**Code** : `400 : Invalid request payload JSON format`

**Condition** : bad url or route

**Code** : `404 : Not Found`

**Condition** : Bad format, the algorithm can't apply to the sent data

**Code** : `500 : Failed to set children to their parents on the JSON AND TypeError: arr[key].map is not a function`

---

## Unit Testing

Using mocha & chai for testing
visit http://mochajs.org and http://chaijs.com for details

Running test :

```
npm test
```

```
/POST /child-setter
√ it should get place the sort the children to their parent using parent_id

/GET /
√ it should provide an array of github repositories

/GET /login
√ it should be 404 error as the route /login doesnt exist

3 passing (56ms)
```

**Expectation** : 3/3 tests are passing
