const Celebrity = require('../models/Celebrity');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true
});


const celebrities = [
    {
        name: "Tom Cruise",
        occupation: "actor",
        catchPhrase: "Hello World"
    },
    {
        name: "Oprah Winfrey",
        occupation: "TV Host",
        catchPhrase: "Welcome to my show"
    },
    {
        name: "Michael Jackson",
        occupation: "musician",
        catchPhrase: "I am a world-class musician"
    }

]

Celebrity.create(celebrities)
.then(data => {
    console.log(`${data.length} items were inserted`);
})
.catch(err => {console.log(err)});