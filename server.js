var express        = require('express');
var app           = express();
const fileUpload  = require('express-fileupload');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var multer      = require('multer');
//var upload      = multer();
var app           = express();



// SET STORAGE
/*var storage = multer.diskStorage({
  destination: function (req, file, cb) {

   // var uploadPath = __dirname + '/uploadmultiple';

    cb(null, '/uploadmultiple')
  },
  filename: function (req, file, cb) {
     console.log(file);
    cb(null, file.fieldname + '-' + Date.now())
  }
})*/
//var upload = multer({ storage: storage })

//var upload = multer({ storage : storage }).array('userPhoto',2);
//var upload = multer({ storage : storage }).array('userPhoto',2);


app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
//app.use(upload.array()); 
app.use(express.static('public'));


// default options
app.use(fileUpload());

var storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "/uploadmultiple");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });



app.get('/', function (req, res) {
   res.send('Hello Worldaaa');
})

app.post('/insert', function (req, res) {

   res.send(req.body.name);
})

var upload = multer({ storage : storage }).array('userPhoto',2);
app.post('/uploadmultiple',function(req,res){
    upload(req,res,function(err) {
        //console.log(req.body);
        //console.log(req.files);
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded multi");
    });
});
/*
var upload = multer({storage: Storage}).array("multiimg", 3);
app.post("/uploadmultiple", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
         return res.end("File uploaded sucessfully!.");
     });
 });

*/

//Uploading multiple files
//app.post('/uploadmultiple', upload.array('multiimg', 3), (req, res, next) => {
 /*app.post('/uploadmultiple', upload.array('multiimg', 3), function(req, res, next) {  
  const files = req.files



  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
 
    res.send(files)
     // console.log(req.files.originalname);
     });
//})*/



app.post('/upload', function (req, res) {
   if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
   }

   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
   let sampleFile = req.files.sampleFile;
   var uploadPath = __dirname + '/imageupload/' + sampleFile.name;
   // Use the mv() method to place the file somewhere on your server
   sampleFile.mv(uploadPath, function (err) {
      if (err)
         return res.status(500).send(err);

      res.send('File uploaded!');
   });
});


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})