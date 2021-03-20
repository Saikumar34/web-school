var express = require('express');
var router = express.Router();
var path = require('path');
var models  = require(path.join(__dirname,"..","models","schema"));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home',name: req.session.name });
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home',name: req.session.name });
});

router.get('/results', function(req, res, next) {
  res.render('results', { title: 'results',name: req.session.name,rno:req.session.rno});
});

router.get('/evaluation', function(req, res, next) {
  res.render('evaluation', { title: 'evaluation',name: req.session.name});
});


router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About',name: req.session.name });
});

router.get('/slogin', function(req, res, next) {
  res.render('slogin', { title: 'Login' });
});

router.get('/tlogin', function(req, res, next) {
  res.render('tlogin', { title: 'Login' });
});

router.get('/ssignup', function(req, res, next) {
  res.render('ssignup', { title: 'Signup' });
});

router.get('/tsignup', function(req, res, next) {
  res.render('tsignup', { title: 'Signup' });
});


//student signup
router.post('/ssignup', function(req, res, next) {
  let newUser = new models.Student({
    firstname:req.body.fn,
    lastname:req.body.ln,
    rno:req.body.rno,
    email:req.body.email,
    password:req.body.pwd

  });
  let newStore = new models.Marks({
    rno:req.body.rno
  });
  newStore.save((err,row)=>{
    if(err)
    {
        console.log("error occured:"+err);
        res.redirect("/ssignup");
    }
    else
    {
      console.log("student successfully added in marks table");
    }
  });
  newUser.save((err,user)=>{
      if(err)
      {
          console.log("error occured:"+err);
          res.redirect("/ssignup");
      }
      else
      {
        console.log("successfully added");
          req.session.name = user.firstname;
          req.session.email = user.rno;
          models.Marks.findOne({rno:user.rno},(err,mark)=>{
            if(mark)
            {
              console.log("results displayed");
              res.render('results', { title: 'results',name: req.session.name,rno:user.rno,mark:mark});
            }
            else
            {
              console.log("error occured :"+err);
            }
        });
      }
  });
  
});

//student login
router.post('/slogin', function(req, res, next) {
  
  var email=req.body.email;
  var password=req.body.pwd;

  models.Student.findOne({email:email,password:password},(err,row)=>{
      if(row)
      {
        console.log("successfully logined");
        req.session.name = row.firstname;
        req.session.email = row.email;
        console.log(row.rno);
        models.Marks.findOne({rno:row.rno},(err,mark)=>{
          if(mark)
          {
            console.log("results displayed");
            res.render('results', { title: 'results',name: req.session.name,rno:row.rno,mark:mark});
          }
          else
          {
            console.log("error occured :"+err);
          }
      });
      }
      else
      {
        console.log("error occured:"+err);
        res.redirect("/slogin");
      }
  });
  
});

//teacher signup
router.post('/tsignup', function(req, res, next) {
  let newUser = new models.Teacher({
    firstname:req.body.fn,
    lastname:req.body.ln,
    subject:req.body.sub,
    email:req.body.email,
    password:req.body.pwd

  });

  newUser.save((err,user)=>{
      if(err)
      {
          console.log("error occured:"+err);
          res.redirect("/tsignup");
      }
      else
      {
        console.log("successfully added");
          req.session.name = user.firstname;
          req.session.email = user.email;
          req.session.sub = user.subject;                                                                                          
          res.redirect("/evaluation");

      }
  });
  
});

//teacher login
router.post('/tlogin', function(req, res, next) {
  
  var email=req.body.email;
  var password=req.body.pwd;
  models.Teacher.findOne({email:email,password:password},(err,row)=>{
      if(row)
      {

        console.log("successfully logined");
        req.session.name = row.firstname;
        req.session.email = row.email;
        req.session.sub = row.subject;
        res.redirect("/evaluation");
      }
      else
      {
        console.log("error occured:"+err);
        res.redirect("/tlogin");
      }
  });
  
});

//storing results
router.post('/store', function(req, res, next) {
console.log(req.session.sub);
console.log(req.body);
var subj = req.session.sub;
var myquery = { rno: req.body.rno };
var newvalues;
if(subj=='telugu')
{
  newvalues = { $set: {telugu:req.body.mk } };
}
if(subj=='hindi')
{
  newvalues = { $set: {hindi:req.body.mk } };
}
if(subj=='english')
{
  newvalues = { $set: {english:req.body.mk } };
}
if(subj=='maths')
{
  newvalues = { $set: {maths:req.body.mk } };
}
if(subj=='science')
{
  newvalues = { $set: {science:req.body.mk } };
}
if(subj=='social')
{
  newvalues = { $set: {social:req.body.mk } };
}
  models.Marks.updateOne(myquery, newvalues, function(err, res) {
    if(err)
      {
          console.log("error occured:"+err);
      }
      else
      {
          console.log(newvalues);
          console.log("marks successfully added");
          console.log(res);
      }
  });

  res.redirect("/evaluation");
});

// Logout 
router.get("/logout",(req,res,next)=>{
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
