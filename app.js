'use strict';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');

class Server 
{
  constructor()
  {
    this.app = express();
    this.api();
    this.routes();
  }

  api()
  {
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(cookieParser('SECRET_GOES_HERE'));
    this.app.use(methodOverride());
    this.app.use((err, req, res, next) => {
      err.status = 404;
      next(err);
    });
    this.app.use(errorHandler());
  }

  routes()
  {
    this.app.get('/signup', (req, res) => {
      res.sendFile('register.html', { root: path.join(__dirname, 'public') });
    });
  }
}

exports.Server = Server;
