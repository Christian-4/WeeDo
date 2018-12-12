const express = require('express');
const router  = express.Router();

/* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

router.use('/', require('./auth'));

router.use('/', require('./plan'));

router.use('/', require('./friend'));

module.exports = router;

