const users = require('../controllers/users.js');


module.exports = function(app){
    app.post('/api/upload',function(req,res){
        users.uploading(req,res);
    })
    app.post('/pass', function(req,res){
        users.pass(req,res)
    })
    app.post('/stripeSet', function(req,res){
        users.stripeSet(req,res)
    })
    app.post('/checkSession', function(req,res){
        users.checkSession(req,res)
    })

     // *** Data functions *** //
     
    app.post('/addItem', function(req,res){
        users.addItem(req,res)
    })
    app.post('/delItem', function(req,res){
        users.delItem(req,res)
    })
    app.post('/getItem', function(req,res){
        users.getItem(req,res)
    })
}