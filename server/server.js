var express = require('express');
var app = express();
// const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer');
var path = require('path');
var app = express();

app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// form-urlencoded
var upload = multer();
// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));


// default options
// app.use(fileUpload());


const Model = require('./Model/QueryDb');
let Db = new Model();

app.use(session({
	secret: 'ffff',
	resave: true,
	saveUninitialized: true
}));



app.use(function (req, res, next) {
	/*
	  * var err = new Error('Not Found'); err.status = 404; next(err);
	  */

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,
	// Content-Type, Accept");

	// Pass to next layer of middleware
	next();
});



/*
 * var storage = multer.diskStorage({ destination: function (req, file,
 * callback) { // let dest; // console.log(dest);
 * 
 * var uploadPath = __dirname + '/uploadmultiple/'; callback(null, uploadPath); },
 * filename: function (req, file, callback) { callback(null, file.fieldname +
 * '-' + Date.now()); } });
 */




var common = require('./Common/common');

app.post('/uploadmultiple', function (req, res) {
	// var upload = multer({ storage : storage }).array('userPhoto',2);

	// var commonnew = new common();
	// const userPhoto = common.storage('userPhoto', 2, '/imageupload/', req,
	// res);
	// const uploadmultiple = common.storage('uploadmultiple', 3,
	// '/uploadmultiple/', req, res);
	var upload = multer({ dest: 'E:/reactlogin/server/uploadmultiple/' })
	// var p = multer({ storage: userPhoto }).array('userPhoto', 2);
	// var m = multer({ storage: uploadmultiple }).array('uploadmultiple', 3);
	// console.log(imagename);
	var p = upload.fields([{ name: 'userPhoto', maxCount: 2 }, { name: 'uploadmultiple', maxCount: 3 }])

	// console.log(p);

	p(req, res, function (err) {

		console.log(req.files);
		if (err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});

   /*
	 * m(req, res, function (err) {
	 * 
	 * console.log(req.files); if (err) { return res.end("Error uploading
	 * file."); } res.end("File is uploaded"); });
	 */



});




app.post('/chech', function (req, res) {
	var commonobj = new common();
	var s = commonobj.InsertDateFormat("9.9.2017");
	var v = commonobj.DispDateFormat("2017.9.9");
	res.send({ InsertDateFormat: s, DispDateFormat: v });
});


app.post('/data', function (req, res) {

	// var commonnew = new common();
	let trans_Andriodhomepageimage = Db.SelectRecBySp("SELECT * FROM bind_activestatus");
	var bind_gender = Db.SelectRecBySp('SELECT * FROM bind_gender');
	var time = Db.myDateTime();
	var timesec = Db.myDateTime();

	res.send({ artist: time, music: trans_Andriodhomepageimage, bind_gender: bind_gender, timesec: timesec });
	// Db.RunQuery("insert into test(b,c) values(1,2)");
	// Db.RunQuery("insert into test(b,c) values(1,2)");
});


app.post('/statevsdistict', function (req, res, next) {
	var sql = "SELECT district_id as value, district_Name as label FROM bindmaster_district where  IsActive = 1 ";
	let state = req.body.state;

	if (state)
		sql += ' and  state_id = ' + state + ' ';

	Db.query(sql).then(rows => {
		Db.query('SELECT * FROM bind_activestatus').then(rowssec => {
			res.send({ ss: state, message: rows });
		});

	});
});


app.post('/myform', function (req, res, next) {
	
	var a = req.body.a;
	var b = req.body.b;
	var RfId = req.body.RfId;
	
	if(!a)
	{
		res.send({ id : 'a' ,ErrorMessage : "Please enter a"});
		return false;
	}
	
	if(!b)
	{
		res.send({ id : 'b' ,ErrorMessage : "Please enter b"});
		return false;
	}
	
	
	if(RfId)
		{
			 Db.RunQuery('update test set b = "'+a+'" , c = "'+b+'"  where a = '+RfId+' ').then(rowssec => {
				 res.send({success : "success" , message:"updated ", rowssec : rowssec });
			});
		}
		
	else
		{
			 Db.RunQuery('insert into test(b,c) values("'+a+'","'+b+'")').then(rowssec => {
				  res.send({success : "success" , message:"inserted ", rowssec : rowssec });
			 });
		}
});


const Pagination = require('./Controller/pagination');





app.post('/editupdate', function (req, res, next) {
	
	
	
	
	
	var sql = "SELECT * FROM test";
	let RfId = req.body.RfId;

	if (RfId)
		sql += ' where  a = ' + RfId + ' ';
		
	 //page_id = parseInt(req.params.page),
     //currentPage = page_id > 0 ? page_id : currentPage,
	 currentPage = 0;
    		 
	//console.log(sql);
	Db.query(sql).then(rowssec => {
		Db.numRows("SELECT *  FROM test").then(totalCount => {
			var Paginationlink = new Pagination(totalCount,currentPage,'view',10);
			//const Paginate = new Pagination(totalCount,currentPage,pageUri,perPage);
			res.send({data : rowssec , totalCount : totalCount ,pages : Paginationlink.links()});
		
		});	
	});

	
	
});



app.get('/', function (req, res) {
	res.send('Hello Worldaaa');
})




var singleclick = require('./singleclick');
app.post('/singleclick', function (req, res) {

	var data = singleclick.SelectRecBySp("SELECT * FROM bind_activestatus;");

	//var data = singleclick.myDateTime();
	res.send(data);
})




app.post('/upload', function (req, res) {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the
	// uploaded file
	let sampleFile = req.files.sampleFile;
	var uploadPath = __dirname + '/imageupload/' + sampleFile.name;
	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv(uploadPath, function (err) {
		if (err)
			return res.status(500).send(err);

		res.send('File uploaded!');
	});
});


const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`listening on ${PORT}`))