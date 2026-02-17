// The route we are creating:
const router = require('express').Router();
let Items = require('../models/items-model');

//API call to get current data from the database:
router.route('/').get((req,res) =>{
    Items.find()
    .then(items => res.json(items))
    .catch(err=> res.status(400).json("Error: "+err));

});

router.route('/add').post((req, res) => {
    const itemName = req.body.itemName;
    const description = req.body.description;
    const price = req.body.price;

    newuser.save()
    .then(()=>res.json("User Added!"))
    .catch(err => res.status(400).json("Error "+ err));
})

module.exports = router;