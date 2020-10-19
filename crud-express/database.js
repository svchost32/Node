//操作数据库

var fs = require('fs')
const {
    finished
} = require('stream')
var dbpath = './views/db.json'


exports.find = function (callback) {
    fs.readFile(dbpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).contents)
    })
}

/**
 * 
 * @param {*} id 
 * @param {*} callback 
 */
exports.findbyID = function (id, callback) {
    fs.readFile(dbpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var stus = JSON.parse(data).contents
        var target = stus.find(function (item) {
            return item.id === id
        })
        callback(null, target)
    })
}


// find(function (err,data) {})

exports.save = function (content, callback) {
    fs.readFile(dbpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var stus = JSON.parse(data).contents
        //处理id问题
        content.id = stus[stus.length - 1].id + 1
        //添加
        stus.push(content)
        var result = JSON.stringify({
            contents: stus
        })
        fs.writeFile(dbpath, result, function (err) {
            if (err) {
                return callback(err) //错就是错误对象
            }
            callback(null) //成功就没错
        })
    })
}
exports.update = function (content, callback) {
    fs.readFile(dbpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var stus = JSON.parse(data).contents

        content.id = parseInt(content.id)
        //ES6方法，符合对应项，返回
        var target = stus.find(function (item) {
            return item.id === parseInt(content.id)
        })
        for (var key in content) {
            target[key] = content[key]
        }


        var result = JSON.stringify({
            contents: stus
        })
        fs.writeFile(dbpath, result, function (err) {
            if (err) {
                return callback(err) //错就是错误对象
            }
            callback(null) //成功就没错
        })
    })

}




exports.delete = function (id, callback) {
    fs.readFile(dbpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var stus = JSON.parse(data).contents

        //findindex es6
        var target = stus.findIndex(function (item) {
            return item.id === parseInt(id)
        })

        stus.splice(target, 1)

        var result = JSON.stringify({
            contents: stus
        })
        fs.writeFile(dbpath, result, function (err) {
            if (err) {
                return callback(err) //错就是错误对象
            }
            callback(null) //成功就没错
        })
    })
}