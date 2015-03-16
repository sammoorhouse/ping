var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next){
	//save results
	
	//redirect to results page
	res.redirect('results/123456');
});

router.get(/^\/results\/(\w+)$/, function(req,res,next){
	var id = req.params[0];
	res.send(id);
});

module.exports = router;
