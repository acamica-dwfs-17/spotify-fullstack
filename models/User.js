// @ts-nocheck
const Sequelize = require('sequelize');
const sequelize = require('../lib/database');

// @ts-ignore
const Model = Sequelize.Model;
class User extends Model {}
User.init(
    {
        // attributes
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
            type: Sequelize.INTEGER
        },
        AuthApi: {
            type: Sequelize.STRING
        },
        Created: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Updated: {
            type: Sequelize.DATE
        },
        LastLogin: {
            type: Sequelize.DATE
        }
    },
    {
        sequelize,
        modelName: 'Users'
    }
);

// Create a new user
User.create({ FirstName: 'Jane', LastName: 'Doe' }).then(jane => {
  console.log("Jane's auto-generated ID:", jane.id);
});