'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {foreignKey:'UserId'})
      User.hasMany(models.Post,{foreignKey:'UserId'})
    }

    showStatus(){
      const roles = this.roles
      if(roles === true){
        return 'VERIFIED'
      } else {
        return 
      }
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roles: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate(instance, options){
        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(instance.password,salt)

        instance.password=hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};