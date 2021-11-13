import expressLoader from './express';
import Logger from './logger';
import db from '../models'
//We have to import at least all the events once so they can be triggered

export default async ({ expressApp }) => {
  
  db.sequelize.sync();
  Logger.info('✌️ DB loaded and connected!');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
