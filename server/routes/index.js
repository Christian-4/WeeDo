const express = require('express');
const router  = express.Router();

/* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

// router.use('/api/auth', require('./auth'));

router.use('/', require('./auth'));

router.use('/', require('./plan'));

router.use('/', require('./friend'));

router.use('/', require('./user'));

router.use('/', require('./chat'));



module.exports = router;

