var express = require('express');
var Hashids = require('hashids');
var router = express.Router();
var hashids = new Hashids("This doesn't need to be secret");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ping');

var Blob = mongoose.model(
	'Blob', {
		id: String,
		username: String, 
		email: String, 
		url: String, 
		dates: {
			date: Date,
			urlstatus: String
		}
	})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function censor(censor) {
  var i = 0;

  return function(key, value) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
      return '[Circular]'; 

    if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
      return '[Unknown]';

    ++i; // so we know we aren't using the original object anymore

    return value;  
  }
}

router.post('/', function(req, res, next){
	//save results
	console.log(req)
	var inUrl = req.param('URL');
	var inName = req.param('name');
	var inEmail = req.param('email');
	
	var id = Math.floor((1 + Math.random()) * 0x10000)
	var shortId = hashids.encode(id);
	
	var input = new Blob({
		id: shortId,
		username: inName,
		email: inEmail,
		url: inUrl,
		dates: {}
	})
	console.log(input);
	input.save(function(err){
		if(err) return handle(err);
	})
	
	//redirect to results page
	res.redirect('results/'+shortId);
});

router.get(/^\/results\/(\w+)$/, function(req,res,next){
	var inId = req.params[0];
	var blob = Blob.find({id : inId})
	console.log(blob.username);
	res.send(blob);
});

module.exports = router;
