# october-scraping

##
L’idée globale : créer une API en Node.js, avec une seule route qui prend en paramètre le nom d’une entreprise française, et qui renvoie en JSON son numéro de téléphone, trouvé sur le web par les moyens de ton choix.

Exemple : La route prendrait en paramètre EXPERDECO (et éventuellement d’autres informations que l’on a sur l’entreprise, comme le SIREN ou l’adresse) et renverrait +33 450346354.
Ce que l’on va regarder :

La qualité du code, qu’il soit facile à relire et à comprendre, bien organisé.
La pertinence du résultat, pas forcément 100% de réussite, mais un minimum de faux positifs.
La robustesse de l'API (gestion des erreurs, tests, ...)
Tu trouveras en pièce-jointe d'autres exemples d'entreprises.
N'hésite pas si tu as des questions et bonne chance !


## Installing

```
npm install
npm start
```

The local server run on port 5000

Also the API is deployed here : https://thawing-plateau-97313.herokuapp.com

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
│ ├───Units testing (not implemented)
```

## Endpoints

- [company/:siret](#company)

---

## company

Used to HTTP GET information on a company

**URL** : `/company/:siret`

**Method** : `GET`

**Headers** : `Content-Type: application/json`

**Data constraints**

The SIRET code (French: Système d’identification du répertoire des établissements), or SIRET number, is an INSEE code which allows the geographic identification of any French establishment or business

#### Success Response

The result is the informations of the company

**Code** : `200 OK`

**Content example for '303830244'**

```json
{
  "company_siret": "303830244",
  "company_name": "EXPERDECO",
  "company_tel": "0450346354",
  "company_address": "70 ROUTE DU GIFFRE | 74970 MARIGNIER"
}
```

#### Error Response

**Condition** : SIRET not found

**Code** : `404 : Data not found`

---

## Unit Testing (NOT IMPLEMENTED ON THIS API)

Using mocha & chai for testing
visit http://mochajs.org and http://chaijs.com for details

Running test :

```
npm test
```

**Expectation** : x/x tests are passing

```
  Javascript Function



  x passing (x ms)
```
