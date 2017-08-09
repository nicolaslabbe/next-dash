import Weather from './Weather'

// export {
// 	Weather
// }
var express = require('express');
var router = express.Router();

// define the home page route
router.use('/weather', Weather);

// // define the home page route
// router.get('/', function(req, res) {
//   res.send('Api index');
// });

module.exports = router;