const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https"); 
const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:
                {
                    FNAME: firstname,
                    LNAME: lastname

                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us13.api.mailchimp.com/3.0/lists/4691b1510f";
    const options = {
        method: "POST",
        auth: "Prasoon1:8f31595d9ea9a853e74d087ebabeb18b-us13"
    }
    
    const request = https.request(url ,options , function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
            if(response.statusCode === 200)
            {
                res.sendFile(__dirname + "/success.html")
            }
            else
            {
                res.sendFile(__dirname+ "/failure.html")
            }
        })

    });
    request.write(jsonData);
    request.end();
});
    app.post("/failure", function(req,res){
        res.redirect("/");
    });
app.listen(process.env.PORT || 3000,function(req,res){
    console.log("server is running on port 3000!!");
});

//API KEY 8f31595d9ea9a853e74d087ebabeb18b-us13
// lit id 4691b1510f.