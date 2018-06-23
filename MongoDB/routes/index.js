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
var category_controller = require('../controllers/categoryController');

//get catalog home page
router.get('/', product_controller.index);
router.get('/', product_controller.layout);

router.get('/product/:id', product_controller.product_detail);
router.get('/categories/:id', category_controller.categories);

module.exports = router;