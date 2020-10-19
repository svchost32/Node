var fs = require('fs')
var express = require('express')
var router = express.Router()
var contents = require('./database')

// contents.update({
//     id:2,
//     name:'bob',
//     gender:1,
//     age:10
// },function (err) { 
//     if(err){
//         return console.log('error')
//     }
//     console.log('success')
//  })



router.get('/', function (req, res) {
    res.render('index.html')
})

router.get('/dash', function (req, res) {
    contents.find(function (err,dashcontent) {
        if (err) {
            return res.status(500).send(err)
        }
        res.render('dashboard.html', {
            section1: [
                '标题1',
                '标题2',
                '标题3',
            ],
            students: dashcontent //db里标题
        })
      })
})


router.get('/dash', function (req, res) {

})
router.get('/dash/new', function (req, res) {
    res.render('new.html')
})
router.post('/dash/new', function (req, res) {
    //先获取数据
    contents.save(req.body,function (err) {
        if (err){
            return res.status(500).send('err')
        }
        res.redirect('/dash')
      })
})
router.get('/dash/edit', function (req, res) {
    contents.findbyID(parseInt(req.query.id),function (err,content) { 
        if(err){
            res.status(500).send('error')
        }
        res.render('edit.html',{
            value:content
        })
       
     })
})
router.post('/dash/edit', function (req, res) {
    //获取数据
    //更新数据
    //响应
    contents.update(req.body,function (err) {  
        if(err){
            res.status(500).send('error')
        }
        res.redirect('/dash')
    })
})
router.get('/dash/delete', function (req, res) {
//获取id
//找到对象
//删除
    contents.delete(req.query.id,function (err) {  
        if(err){
            res.status(500).send('error')
        }
        res.redirect('/dash')
    })
})
router.post('/dash/delete', function (req, res) {

})
module.exports = router