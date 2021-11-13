import { Model ,Optional} from 'sequelize';

interface UserAttributes {
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    role: string;
    phone_number: string;
    password: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserAttributes> implements UserAttributes {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    role: string;
    phone_number: string;
    password: string;

    // static associate(models:any) {
    // }
  };
  
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};