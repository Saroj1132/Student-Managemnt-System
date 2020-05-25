var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session')
var {globalVariables}=require("./configure")
var flash=require("connect-flash")
var fileuplaod=require('express-fileupload')

var Adminrouter=require("./routes/Admin/AdminIndex")
var Teacherrouter=require("./routes/Teacher/TeacherIndex")
var pagerouter=require('./routes/Admin/pages/Page')
var Course=require("./routes/Admin/AddCourse")
var student=require("./routes/Student/Studentindex")


var app = express();

app.use(session({
  secret: 'anysecret',
  saveUninitialized: true,
  resave: true
}));

app.use(flash())
app.use(globalVariables)


app.use(fileuplaod())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Adminrouter)
app.use("/admin", pagerouter)
app.use('/Course', Course)
app.use("/teacher", Teacherrouter)
app.use("/student", student)
// catch 404 and forward to error handler


//add menu

var adminpage=require("./models/adminpage")


adminpage.find()
.exec()
.then(doc=>{
  app.locals.menu=doc
})

var teachpage=require("./models/Teacherpage")


teachpage.find()
.exec()
.then(doc=>{
  app.locals.menus=doc
})

var studpage=require("./models/Studentpage")

studpage.find()
.exec()
.then(doc=>{
  app.locals.menuss=doc
})


app.listen(3000)

module.exports = app;
