'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

console.log(config)
let sequelize  = new Sequelize(config.database, config.username, config.password, config);


db.Proxy = require('./proxy')(sequelize , Sequelize)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
