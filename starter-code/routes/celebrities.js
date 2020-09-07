const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res) => {
    Celebrity.find()
    .then(celebrities => {
        res.render('celebrities/index', {
            celebrities: celebrities
        });
    })
    .catch(err => {
        console.log(err)
    });
});

router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new');
});

router.get('/celebrities/:id', (req, res) => {
    Celebrity.findById(req.params.id)
    .then(celebrity => {
        res.render('celebrities/show', {
            celebrity: celebrity
        })
    })
});

router.post('/celebrities', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({
        name,
        occupation,
        catchPhrase
    }).then(celebrity => {
        res.redirect('/celebrities');
    })
    .catch((err) => {
        console.log(`${err}, please try again!`)
        res.redirect('/celebrities/new')
    })
})

router.post('/celebrities/:id/delete', (req, res) => {
    Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/celebrities');
    })
    .catch(err => next(err));
})

router.get('/celebrities/:id/edit', (req, res) => {
    Celebrity.findById(req.params.id)
    .then(celebrity => {
        res.render('celebrities/edit', {
            celebrity: celebrity
        });
    }) 
});

router.post('/celebrities/:id', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate(req.params.id, {
        name,
        occupation,
        catchPhrase
    })
    .then(() => res.redirect('/celebrities'))
    .catch(err => next(err));
})

module.exports = router;