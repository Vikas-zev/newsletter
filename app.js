const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
})


app.post('/', function (req, res) {

    const firstNamee = req.body.fname;
    const secondNamee = req.body.sname;
    const email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstNamee,
                LNAME: secondNamee
            }

        }]

    }
    const jsonData = JSON.stringify(data);

    const url = 'https://us5.api.mailchimp.com/3.0/lists/4a2dcc5a40';

    const options = {
        method: 'POST',
        auth: 'zev:d4503387f2925a61d02058cac524ecc7-us5'

    }


    const request = https.request(url, options, function (response) {

        if (response.statusCode == 200) {
            res.sendFile(__dirname + '/success.html')
        } else {
            res.sendFile(__dirname + '/failure.html')
        }

        response.on('data', function (data) {

            console.log(JSON.parse(data));
        });


    });

    request.write(jsonData);
    request.end();

});


app.post('/failure', function (req, res) {
    res.redirect('/');
});


app.listen(process.env.PORT || 3000, function () {
    console.log('server is rnnnnnnunning');
});



//API KEY
//d4503387f2925a61d02058cac524ecc7-us5

//Audience ID  
//4a2dcc5a40