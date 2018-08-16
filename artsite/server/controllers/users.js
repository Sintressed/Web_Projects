const User = require('../models/user.js');
const Merch = require('../models/merch.js');
const Tour = require('../models/tour.js');
const multer = require('multer');
var DIR = './public/src/assets/static/';
const bcrypt = require('bcrypt');
const session = require('express-session')
var stripe = require("stripe")("sk_test_Jk7FriiDLQCreq4gzCdAMhsz");

//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    clientId: '32899cd0e03b4f469ba46815592b5cb4',
    clientSecret: 'eb0a7bd36ec747799e94c29ce3219b4e',
});
spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log(
        'Something went wrong when retrieving an access token',
        err.message
      );
    }
  )
//sets spotify acess token
setInterval(function() {  
    spotifyApi.clientCredentialsGrant().then(
        function(data) {
          console.log('The access token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
          // Save the access token so that it's used in future calls
          spotifyApi.setAccessToken(data.body['access_token']);
        },
        function(err) {
          console.log(
            'Something went wrong when retrieving an access token',
            err.message
          );
        }
      )
}, 3600000);
module.exports = {
    uploading: function(req,res){
        var path = '';
        upload(req, res, function (err) {
           if (err) {
             // An error occurred when uploading
             console.log(err);
             return res.status(422).send("an Error occured")
           }  
          // No error occured.
           path = req.file.path;
           return res.json(req.file.filename); 
     }); 
    },
    changepass: function(req,res){
        bcrypt.hash(req.body.password, 10)
        .then(hash =>{
           User.create({username: req.body.username, password: hash})
           .then(data =>{
               res.json(data)
           })
            .catch(err =>{
                res.json(err)
            })
        })
        .catch(err =>{
            res.json(err)
        })
    },
    pass: function(req,res){
        User.findOne({username: req.body.username})
        .then(data =>{
            if(data){
                bcrypt.compare(req.body.password, data.password, function(err, bool){
                    if(err){
                        return res.json(err)
                    }
                    else{
                        if(bool === true){
                            if('user' in req.session){
                                
                                req.session.user == data.username;
                            }
                            else{
                                req.session.user = data.username
                            }
                            res.json(req.session.user)
                        }
                        if(bool === false){
                            res.json(bool)
                        }
                    }
                })
            }
            else{
                return res.json('false')
            }
            
        })
        .catch(err =>{
            res.json(err)
        })
    },
    stripeSet: function(req,res){
        const token = req.body.token; // Using Express
        const charge = stripe.charges.create({
          amount: 50,
          currency: 'usd',
          description: 'Electro Swing Site(test)',
          source: token,
        });
    },
    checkSession: function(req,res){
        console.log('checkingsession')
        if(req.session.user === 'Sintressed'){
            res.json('yes')
        }
        else{
            res.json('nope')
        }
    },

    // *** Data functions *** //

    addItem: function(req,res){
        if(req.body.item === 'merch'){
            x = Merch
        }
        else if(req.body.item === 'tour'){
            x = Tour
        }
        x.create(req.body.data)
        .then(data =>{
            res.json(data)
        })
        .catch(err =>{
            res.json(err)
        })
    },
    getItem: function(req,res){
        console.log('req.body.item is: ',req.body.item)
        let x;
        if(req.body.item === 'merch' || req.body.item === 'tour'){
            if(req.body.item === 'merch'){
                x = Merch
            }
            else if(req.body.item === 'tour'){
                x = Tour
            }
            x.find({})
            .then(data =>{
                res.json(data)
            })
            .catch(err =>{
                res.json(err)
            })
        }
        else if(req.body.item === 'music'){
            spotifyApi.getAlbumTracks('5VdZtfz1z6v1qWlqCU9j1E',{ limit : 17, offset : 0}).then(
                function(data) {
                    console.log(data.body)
                    res.json(data.body);
                },
                function(err) {
                    res.json(err)
                }
            );
        }
        else{
            res.json({err: req.body.item})
        }
    },
    delItem: function(req,res){
        if(req.body.call === 'merch'){
            Merch.findById({_id: req.body.item})
            .then(data =>{
                const fs = require('fs');
                console.log(req.body.item)
                Merch.deleteOne({_id: req.body.item})
                .then(data =>{
                    res.json(data)
                })
                .catch(err =>{
                    res.json(err)
                })
                fs.access(DIR + data.img, error => {
                    if (!error) {
                        console.log('working so far')
                        fs.unlink(DIR + data.img,function(error){
                            console.log(error);
                        });
                    } else {
                        console.log(error);
                    }
                });
            })
            .catch(err =>{
                res.json(err)
            })
        }
        else if(req.body.call === 'tour'){
            Tour.findByIdAndRemove({_id: req.body.item})
            .then(data =>{
                res.json(data)
            })
            .catch(err =>{
                res.json(err)
            })
        }
        
    }

}