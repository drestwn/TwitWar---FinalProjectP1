'use strict';
const {
  Model
} = require('sequelize');
const displayAgo = require('../helper/index')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User,{foreignKey:'UserId'})
      Post.hasMany(models.PostTag,{foreignKey:'PostId'})
      
    }

    get published(){
      return displayAgo(this.createdAt)
    }

  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg:'title cannot be empty'},
        notEmpty: {msg:'title cannot be empty'}
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg:'content cannot be empty'},
        notEmpty: {msg:'content cannot be empty'}
      }
    },
    image: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.beforeCreate(el => {
    
  })
  return Post;
};