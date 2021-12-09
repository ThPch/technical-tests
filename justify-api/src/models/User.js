/**====================================*\
 *  DEPENDENCIES CONFIGURATION
 ======================================*/
 require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const nbMaxWords = process.env.MAX_WORDS_DAY;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    },
    count:{
        type: Number,
        min:0,
        max:80000,
        default:0
    }
})

/**
* Update the word's count of an account with the email in the mongoDB
* @param { String } mail
* @param { number } nbMots
*/
userSchema.pre('save', async (next) => {
    // Hash the password before saving the user model
    console.log(this)
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error('Invalid login credentials')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user
}

/**
* Get the word's count of an account with the email, returning the whole user object
* @param { String } mail
*/
userSchema.statics.getCount = async function(mail) {
    const user = await User.findOne({ email: mail });
    if (!user) {
        throw new Error(`User doesn't exist with the email : ${mail}`);
    }
    return user;
  };


/**
* Update the word's count of an account with the email in the mongoDB and returning the user updated
* @param { String } mail
* @param { number } nbMots
*/
userSchema.statics.updateCount = async function (mail, nbMots) {
    if(nbMots>=nbMaxWords)
    {   //I Have to check the max of a payload entity
        throw new Error("Max words limit at 80 000 words");
    }
    else{
        const user = await User.findOneAndUpdate({ email: mail }, { $inc: { count: nbMots } }, {new: true},);
        if (!user) {
            throw new Error(`User doesn't exist with the email : ${mail}`);
        }
        return user;
    }
  };

/**
* Will the words count of every users in the mongoDB
*/
userSchema.statics.resetCount = async function () {
    this.collection.updateMany({}, {'$set': {'count' : 0}}, {multi: true},
    function(error){
        if(error){
            return(error)
        }
    });
};


const User = mongoose.model('User', userSchema)

module.exports = User