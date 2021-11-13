import fs from 'fs';
import path from 'path'
import  { Sequelize, Dialect ,DataTypes } from 'sequelize';

const basename = path.basename(__filename);

const db: any = {};
const dbName = process.env.DB_NAME as string 
const dbUser = process.env.DB_USERNAME as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DIALECT as Dialect
const dbPassword = process.env.DB_PASSWORD

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  // logging: false,
  logging: console.log

});

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
