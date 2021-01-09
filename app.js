// Basic required imports 
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const { urlencoded } = require("body-parser");

// create an instance of express for our app 
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));










const port = 3100;
const server = app.listen(port, function (){
    console.log(`Server running`);
    console.log(`running on localhost:  ${port}`);
}); 


// get call to return JSON that formats natural and UNIX 
app.get('/dateValues/:dateVal', function(req, res, next){
    //console.log(`Correct URL => working`);
    // req is anything that is going to be passed in 
    //res is anything we are sending out 

    //gets the data for date 
    var dateVal = req.params.dateVal;
    
    //options for formatting date in natural date view 
    var dateFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    //if its a unix code 
    if (isNaN(dateVal)){
        var naturalDate = new Date(dateVal);
        naturalDate = naturalDate.toLocaleDateString("en-us", dateFormatOptions);
        var unixDate = new Date(dateVal).getTime()/1000;
    }
    else {
        var unixDate = dateVal;
        var naturalDate = new Date(dateVal * 1000);
        naturalDate = naturalDate.toLocaleDateString("en-us", dateFormatOptions);
    }
    //return in json form
    res.json({unix: unixDate, natural: naturalDate});
});



