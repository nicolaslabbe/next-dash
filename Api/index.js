import Weather from './Weather'
import News from './News'
import Train from './Train'
import Db from './Db'
import Fixture from './Fixture'

// export {
// 	Weather
// }
var express = require('express');
var router = express.Router();

// define the home page route
router.use('/weather', Weather);
router.use('/news', News);
router.use('/train', Train);
router.use('/db', Db);
router.use('/fixture', Fixture);

// // define the home page route
// router.get('/', function(req, res) {
//   res.send('Api index');
// });

module.exports = router;