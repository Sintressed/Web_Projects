const users = require('../controllers/users.js');


module.exports = function(app){
    app.post('/api/upload',function(req,res){
        users.uploading(req,res);
    })
    app.post('/addMerch', function(req,res){
        users.addMerch(req,res);
    })
    app.post('/getMerch', function(req,res){
        users.getMerch(req,res);
    })
    app.post('/addTour', function(req,res){
        users.addTour(req,res);
    })
    app.post('/getTour', function(req,res){
        users.getTour(req,res);
    })
    app.post('/getMusic', function(req,res){
        users.getMusic(req,res)
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
    app.post('/delItem', function(req,res){
        users.delItem(req,res)
    })
}