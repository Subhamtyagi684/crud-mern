const express = require('express')
const router = express.Router() ;
const multer  = require('multer')

const MongoClient  = require('mongodb').MongoClient;

var mongo_url = "mongodb://localhost:27017";
var data;
var dbo;

MongoClient.connect(mongo_url, function(err, db) {
	  if (err) throw err;
	  dbo = db.db("customers");
	});	

var jsonFile = require('../jsondata.json')

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[1] === "pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Not a PDF File!!"), false);
//   }
// };


const upload = multer({
  storage: multerStorage,
});





router.get('/',(req,res)=> {
	if (data && !undefined){
		console.log(data)
	}
	else{
		console.log('not found')
	}
	res.render('home')
})


router.get('/getform',(req,res)=> {
	res.render('getform')
})



router.post('/submit',upload.single('cust_image'),function(req,res){
	const myobj = {
		name: req.body.cust_name,
		age:req.body.cust_age,
		profile_image_name:req.file.filename
	}
	dbo.collection("cust_info").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
	res.send('form posted')
	// res.redirect('/submitted-form')
})

router.get('/submitted-form',function(req,res){
	res.send('<center><h1>Form submitted</h1></center>')
})

module.exports = router