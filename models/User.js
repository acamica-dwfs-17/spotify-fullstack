// @ts-nocheck
const Sequelize = require('sequelize');
const db = require('../lib/database');
const UserRelation = require('../models/UserRelation');
// @ts-ignore
const Model = Sequelize.Model;
class User extends Model {}
User.init(
    {
        FirstName: {
            type: Sequelize.STRING
        },
        LastName: {
            type: Sequelize.STRING
        },
        UserName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Mail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ProviderID: {
            type: Sequelize.STRING
        },
        Main: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        ProviderType: {
            type: Sequelize.STRING
        },
        AuthApi: {
            type: Sequelize.STRING
        },
        LastLogin: {
            type: Sequelize.DATE
        },
        Active: {
            type: Sequelize.BOOLEAN
        },
        Token: {
            type: Sequelize.TEXT
        }
    },
    {
        sequelize: db,
        timestamps: true,
    }
);
//User.sync({force:true});
User.hasMany(UserRelation, {foreignKey: 'UserID_1'})
module.exports = User


// // Create a new user
// User.create({ FirstName: 'Jane', LastName: 'Doe' }).then(jane => {
//   console.log("Jane's auto-generated ID:", jane.id);
// });