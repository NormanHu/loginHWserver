const express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const User = require('./User');
const config = require('./config');
var salt = 'salt20180127'
//login
router.post('/', function(req, res) {
    console.log('post:');
    console.log(req.body);
    console.log(req.body.Account);
    console.log(req.body.Password);

    var inputAccount=req.body.Account;
    var inputpassword=req.body.Password;
    //----------流程概述----------
    //檢查帳號存在否
    //if(帳號不存在)
    //  Fail 回傳
    //else
    //  檢查密碼正確與否
    //  if(密碼不正確)
    //      Fail 回傳
    //  else
    //      生token
    //      成功 回傳token
    //----------------------------

    //檢查帳號存在否
    User.findAll({
        where:{
            name:inputAccount
        }
    }).then(function(result){
        
        //錯誤:資料庫查到2筆以上資料, 照理來說不會發生, 但有發生的話還是該知道一下
        if(result.length>1)
        {
            console.log("result.length = " +result.length);
            res.json({ 'success': false, 'errorMessage':'資料庫錯誤'});
        }
        //帳號不存在
        else if(result.length==0)
        {
            //Fail 回傳
            console.log('帳號不存在');
            res.json({ 'success': false, 'errorMessage':'帳號不存在'});
        }
        //帳號存在, 密碼不正確
        else if(inputpassword!=result[0].password)
        {
            //Fail 回傳
            console.log('密碼不正確');
            res.json({ 'success': false, 'errorMessage':'密碼不正確'});
        }
        //密碼正確
        else
        {
            console.log('密碼正確');
            //生token, secretOrPrivateKey就是salt的意思
            var token = jwt.sign({ Account: inputAccount }, salt);
            console.log(token);
            //let decoded=jwt.decode(token);
            //console.log(decoded);

            //成功 回傳token及一些必要資訊
            res.json({ 'success': true, 'account':inputAccount, 'email':result[0].mail,'jwt':token});
            console.log('result[0].Email = '+result[0].mail);
        }
    }).catch(function(err){
        console.log(err.message);
        res.json({ 'success': false, 'errorMessage':'錯誤'});
    });
});

module.exports = router;
