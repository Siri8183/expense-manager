let express = require('express');
let router = express.Router();

// app.get('/hello', function (req, res) {
//     res.send('Hello'); 
//  });

 router.route('member').get(function (req, res) {
    console.log('in router');
        res.json({name:'john'}); 
     } 
 );

 module.exports = router;