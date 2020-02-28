// @ts-nocheck
const Sequelize = require('sequelize');
const sequelize = require('../lib/database');

// @ts-ignore
const Model = Sequelize.Model;
class UserRelation extends Model {}
UserRelation.init(
    {
        UserID_1: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            // references: {
            //     model: 'users',
            //     key: 'id', 
            //  }
        },
        UserID_2: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            // references: {
            //     model: 'users',
            //     key: 'id',
            //  }
        },
    },
    {
        sequelize,
        timestamps: true,
    }
);

UserRelation.sync({force:true});
// // Create a new use