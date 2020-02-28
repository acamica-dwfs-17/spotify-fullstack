// @ts-nocheck
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require('firebase/app');

// Add the Firebase products that you want to use
require('firebase/auth');
require('firebase/firestore');

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: 'AIzaSyA4c8kKjjDYX2XoCYsQiTVeU5QjKrZX2Mk',
    authDomain: 'akmik-a63c6.firebaseapp.com',
    databaseURL: 'https://akmik-a63c6.firebaseio.com',
    projectId: 'akmik-a63c6',
    storageBucket: 'akmik-a63c6.appspot.com',
    messagingSenderId: '713161444824',
    appId: '1:713161444824:web:763fb43e5246e4fca0b6ad',
    measurementId: 'G-2CEQ7WH1DX'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const callbackRouter = require('./routes/callback');
const topRouter = require('./routes/top');
const apiRouter = require('./routes/api');
const UserRelation = require('./models/UserRelation');
const User = require('./models/User');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use('/callback', callbackRouter);
app.use('/top', topRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
