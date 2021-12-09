/**====================================*\
 *  DEPENDENCIES CONFIGURATION
 ======================================*/
 require('dotenv').config();
const express = require('express');
const util = require('util');
const User = require('../models/User');
const authenticateJWT = require('../middleware/auth');
const { countWords, justifyStr } = require("../js/jsFunctions.js");
const jwt = require("jsonwebtoken");
const accessTokenPrivate = process.env.ACCESS_TOKEN_KEY;
const maxWordsPerDay = process.env.MAX_WORDS_DAY;
const router = express.Router()

/**====================================*\
 *  ROUTES
 ======================================*/

/**
* Get the homepage
*/
router.get('/', function(req, res) { 
    res.send('Hello world  ! ') 
});

/**
* Get all the users
*/
router.get('/api/users',async (req, res) => {
    try {
        await User.find({}, (err, users) => {
            if(err){
                res.send(err)
            }

            //destructuring array to remove unwanted fields
            let userList = users.map(e => e._doc).map(({password, count, ...u}) => ({   ...u }))
            res.json(userList)
        })
        
    } catch (error) {
        res.status(404).send(error)
    }
});

/**
* Post request to sign up to the API, will create an user based on the params
* @param { body } email, password, username
*/
router.post('/signUp', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

/**
* Post request to get a token using an email and a password
* @param { body } email, password
*/
router.post('/api/token', async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }

        //Will get the access token using the encryption of jwt.sign(email/password), private Token key)
        const accessToken = await jwt.sign({ email: user.email, password: user.password }, accessTokenPrivate);
        util.log(`User signed : ${user.email}`)
        res.send({ email, accessToken })

    } catch (error) {
        res.status(400).send({ error: error.message })
    }
});

/**
* Post request to disconnect the user from the service, this request isn't implemented as the need isn't in the requirement
* @param { String } email
*/
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        req.logout();
        res.redirect("/");
    });
});


/**
* Post request to justify a text with a width of 80 characters
* @param { body, plainText } text
* @header { bearer String } accessToken
*/
router.post('/api/justify', authenticateJWT, async(req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    let compteur=0, user, text;

    //1 : handling data from the react app 2 : handling data from postman
    !!req.body.data ? text = req.body.data.toString() : text = req.body.toString()

    text = text.toString()
    if(text.length>1)
    {
        compteur = countWords(text)
    }

    //Get the word's count of the user
    try {
        user = await User.getCount(req.user.email)

        //The user doesn't exist
        if (!user) {
            console.log("test")
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }

        
        //The user is at his full words capacity for today, we sent back a status code 402 with a message
        if(user.count > maxWordsPerDay)
        {
            util.log(`User : ${user.email} is at his full freemium capacity : ${user.count}`)
            return res.status(402).send({error: 'Payment Required'})
        }
        else{
            //We update the word's count on the DB
            try {
                await User.updateCount(req.user.email, compteur)
                util.log(`${user.email} uptaded his words to : ${user.count}`)
                
                //We send back the text justified to the body
                res.send(justifyStr(text));
            }
            catch (error) {
                util.log(`${error}}`)
                res.status(400).send({ error: error.message })
            }
        }
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
});

module.exports = router