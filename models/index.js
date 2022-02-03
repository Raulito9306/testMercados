const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './bin/db/markets.db',
    logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Markets = require("./markets.model.js")(sequelize, Sequelize);


module.exports = db;