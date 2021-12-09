# Justifying Back End API
See instructions.pdf for more details

This API is built to provide a service to a registered user. The user which isn't registered can sign up and then have to get a access token to login.
Once logged in, he can use the service where a text can be justified to 80 characters

## Installing

```
npm install
npm start
```

The local server run on port 5000
The public server will be communicated through email.

## .env file format

ACCESS_TOKEN_KEY=
MAX_WORDS_DAY=
MONGODB_URL=
PORT=5000

## Infos

| Credentials  | Value           |
| ------------ | :-------------- |
| **email**    | tictac@trip.com |
| **password** | voyage2020      |

## Endpoints

- [Users](#Users)
- [Token](#Token)
- [Justify](#Justify)

---

## Users

Fetching all users from the DB

**URL** : `/api/users`

**Method** : `GET`

#### Success Response

A list of users (\_id, name, email)

**Code** : `200 OK`

**Content example**

```json
{
  "_id": "eyJhbGciAzJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "name": "username",
  "email": "email@mail.com"
}
```

#### Error Response

**Condition** : No users in the DB

**Code** : `404 Users not found : No user in the DB`

## Token

Used to get an access Token for a registered User.

**URL** : `/api/token`

**Method** : `POST`

**Headers** : `Content-Type: application/json`

**Data constraints**

```json
{
  "email": "[valid email]",
  "password": "[password in plain text]"
}
```

#### Success Response

A token to access api service justify endpoints

**Code** : `200 OK`

**Content example**

```json
{
  "accessToken": "eyJhbGciAzJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRpY3RhY0B0cmlwLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JE1Nc2tTR2w1YUxFbVZzemNtc3d4d08xVjMueUVXMzkwbmliZFFjckKZukZqcDA2ckxUTWRxIiwiaWF0IjoxNjAyNjc3OTM0fQ.s-T2W58zI7saaTxKwVXY4SqsbTKUphRdB4KccoH08Bs"
}
```

#### Error Response

**Condition** : Something get wrong with the request.

**Code** : `400 BAD REQUEST : Invalid login credentials`

---

## Justify

Get a justified text

**URL** : `/api/justify`

**Method** : `POST`

**Auth required** : Authorization header with Bearer token

**Headers** : `Content-Type: application/json`

**Body** : `raw`

#### Success Response

**Code** : `200 OK`

**Content example**

```plain text
	Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,
	mes  yeux  se  fermaient  si  vite  que  je n’avais pas le temps de me dire: «Je
	m’endors.»  Et, une demi-heure après, la pensée qu’il était temps de chercher le
```

#### Error Response

**Condition** : If access token is wrong.

**Code** : `400 Bad Request`

**Message** : `User doesn't exist with the email : ****@****.***`

**Condition** : If the word's count excess 80 000 words

**Important note** : Every night at midnight, the word's count is reseted to 0 for every registered users.

**Code** : `402 Payment Required`

**Message** : `Payment Required`

---

## Unit Testing

Using mocha & chai for testing
visit http://mochajs.org and http://chaijs.com for details

Running test :

```
npm test -- --recursive
```

- Test of the function countWords()
- Test of the function justifyStr()

**Expectation** : 2/2 tests are passing

```
  Javascript Function
    Words count and justifying
      √ should return the correct total words in a string
      √ should return a string of 217 characters transformed (justifyed width of 80 characters) into 246 characters


  2 passing
```
