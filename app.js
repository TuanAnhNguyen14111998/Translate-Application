var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
const translate = require('google-translate-api');
const country = require('./models/country')


var app = express();
var port = process.env.PORT || 3000;




app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.set("view engine", "ejs");

app.get('/', function(req, res){

    data = {
        country: country
    }

    res.render("index", { data: data });
})

app.post('/translate', function(req, res) {
    

    // Lay du lieu tu client gui len:
    var info_param = req.body;

    // Lay cac thong tin can thiet
    // Noi dung can dich
    var noidung = info_param.txtNoiDung;
    // Ngon ngu can dich
    var ngonngu = info_param.language;

    // kiem tra neu co noidung thi moi thuc hien dich
    
        noidungdadich = '12r3r'
        
        translate(noidung, {to: ngonngu}).then(res => {
           noidungdadich = res.text;
            
        }).catch(err => {
            console.error(err);
        });
        
        setTimeout(function(){
            res.render('translated', { data: noidungdadich })
        }, 3000);
        
    

})






app.listen(port, function() {
    console.log("App listening on port: " + port);
})