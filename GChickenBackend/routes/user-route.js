// The route we are creating:
const router = require('express').Router();
let User = require('../models/user-model');

//API call to get current data from the database:
router.route('/').get((req,res) =>{
    User.find()
    .then(user => res.json(user))
    .catch(err=> res.status(400).json("Error: "+err));

});

router.route('/add').post((req, res) => {
 const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const firmName = req.body.firmName;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.password;

       const newuser = new User({ 
            username,
            firstname,
            lastname,
            firmName,
            email,
            mobile, 
            password
        });

    newuser.save()
    .then(()=>res.json("User Added! "))
    .catch(err => res.status(400).json("Error "+ err));
})

//To allow admin to delete user info
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Excercise data deleted!'))
    .catch(err=> res.status(400).json('Error: '+err))
});
module.exports = router;