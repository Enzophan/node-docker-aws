const { Model, DataTypes } = require('sequelize');
const sequelize = require("../Database/sqlite_database");

class User extends Model {

}

User.init({
    username: {
        type: DataTypes.STRING,
        validate: {
            is: ['[a-z]', 'i'],        // will only allow letters
            max: 23,                  // only allow values <= 23
            // isIn: {
            //     args: [['en', 'zh']],
            //     msg: "Must be English or Chinese"
            // }
        }
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: false
})

module.exports = User;