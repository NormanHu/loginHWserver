const express = require('express');
const app = express(); //建立一個Express伺服器
var bodyParser = require('body-parser');
var register = require('./register');
var login = require('./login');
/*
// 根據表格，設定router
var initRouter = function (table) {
    Object.keys(table).forEach((k) => { 
      app.use(k, table[k]); 
    });
  }
  */
//extended為false:輸入為string或array
//extended為true:輸入為anytype
//url編碼解析器
app.use(bodyParser.urlencoded({ extended: false }));
//json解析器
app.use(bodyParser.json());

//app.use: Mounts the specified middleware function or functions at the specified path: 
//the middleware function is executed when the base of the requested path matches path.
//安裝一個middleware在指定路徑上, 當該path就是request path時, 執行該function
//use login.js裡的那個router
app.use('/login', login);
app.use('/register', register);

app.listen(3000, function () {
    console.log('Example app is running on port 3000!');}
);