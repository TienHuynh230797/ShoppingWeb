/*var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.redirect('/catalog');
});

router.get('/', function(req, res) {
    res.redirect('/catalog');
});

module.exports = router;
*/

var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/productController');
var type_controller = require('../controllers/typeController');
var auth_controller = require("../controllers/AuthController");

//get catalog home page
router.get('/', product_controller.index);
router.get('/', product_controller.layout);

// route to login page
//router.get('/login', auth_controller.login);

// route for login action
router.post('/login', auth_controller.doLogin);
//router.get('/',auth_controller.loginOK);
router.get('/signup', auth_controller.signup);
router.post('/signup', auth_controller.doSignup);

router.get('/user/:id', auth_controller.showUserDetail);
router.get('/signout', auth_controller.logout);
router.post('/updateUserInfo', auth_controller.updateUserDetail);

router.get('/product/:id', product_controller.product_detail);
router.post('/product/:id', product_controller.postComment);
router.get('/type/:id', type_controller.type);
router.get('/search/', product_controller.search);
router.post('/advanced-search', product_controller.advanced_search_init);

module.exports = router;