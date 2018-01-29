const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    //DB connection的pool
    pool: 
    {
        //最大connection數
        max: 5,
        min: 0,
        //一個connection如果30000毫秒沒做事才被release
        idle: 30000
    }
});

//定義模型
var User = sequelize.define('user', {
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    mail: Sequelize.STRING
});
//用上面定義的model建table, 卡在這裡滿長時間的, 最後發現是MySQL的Engine我沒有設定好, 要是innoDB才給建
var user = User.sync();
//var user = User.sync({ force: false });//force本來就預設false了

module.exports = User;