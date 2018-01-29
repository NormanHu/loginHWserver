var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var bodyParser = require('body-parser');
const User = require('./User');
const config = require('./config');

//register
router.post('/', function(req, res) {
    //----------流程概述----------
    //資料格式驗證
    //if(資料格式有誤)
    //    回傳FAIL 請重新輸入
    //else//資料格式無誤
    //    檢查帳號存在與否
    //    if(帳好已存在)
    //        回傳FAIL 請重新輸入
    //    else//帳號不存在
    //        新增資料
    //        .then
    //        if(新增失敗)
    //            回傳FAIL 請重新輸入
    //        else//新增成功
    //            回傳註冊成功
    //----------------------------
    var inputAccount=req.body.Account;
    var inputpassword=req.body.Password;
    var inputEmail=req.body.Email;
    //資料格式驗證
        //先空著.....晚點再弄

    //if(資料格式有誤)
    if(false)
    {
        //回傳FAIL 請重新輸入
        res.json({ 'success': false, 'errorMessage':'資料格式有誤, 請重新輸入'});
    }
    else//資料格式無誤
    {
        //檢查帳號存在否
        User.findAll({
            where:{
                name:inputAccount
            }
        }).then(function(result){
            if(result.length==1)//帳號已存在
            {
                //回傳FAIL 請重新輸入
                res.json({ 'success': false, 'errorMessage':'帳號已存在, 請重新輸入'});
            }
            else if(result.length==0)//帳號不存在
            {
                //新增資料
                User.create({
                    name: inputAccount,
                    password: inputpassword,
                    mail: inputEmail
                }).then(function(result){
                        //回傳註冊成功 
                        console.log('註冊成功');
                        res.json({ 'success': true});
                }).catch(function(err){
                        console.log(err.message);
                        res.json({ 'success': false, 'errorMessage':'新增資料失敗'});
                });
            }
            else//帳號找到兩人以上
            {
                console.log('資料庫錯誤');
                console.log('result.length = '+result.length);
                res.json({ 'success': false, 'errorMessage':'資料庫錯誤'});
            }
        }).catch(function(err){
            console.log(err.message);
            res.json({ 'success': false, 'errorMessage':'錯誤'});
        });  
    }
});

module.exports = router;
