var express = require('express');
var Hashids = require('hashids');
var router = express.Router();
var hashids = new Hashids("This doesn't need to be secret");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next){
	//save results
	
	var id = Math.floor((1 + Math.random()) * 0x10000)
	var shortId = hashids.encode(id);
	//redirect to results page
	res.redirect('results/'+shortId);
});

router.get(/^\/results\/(\w+)$/, function(req,res,next){
	var id = req.params[0];
	res.send(id);
});

module.exports = router;
