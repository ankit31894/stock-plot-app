module.exports = function(app) {

    var appDetail=require("../package.json"),
    appName=appDetail.name.replace(/-/g," ");


    app.get('/getall', function(req, res,next) {
      require("./getall.js")(req,res,next)
    });

    app.get('*', function(req, res) {
      res.render('../public/views/index.ejs',{
        appName:appName
      }); // load the index.ejs file
    });
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(err);
    });

};

// route middleware to make sure a user is logged in
