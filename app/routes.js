module.exports = function(app) {

    var appDetail=require("../package.json"),
    appName=appDetail.name.replace(/-/g," ");
    app.get('/getall', function(req, res,next) {
      require("./getall.js")(req,res,next)
    });

    app.get('*', function(req, res) {
      res.render('index.ejs',{
        appName:appName
      });
    });
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(err);
    });

};
