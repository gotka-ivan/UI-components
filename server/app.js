const mysql = require('mysql')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.json())

let mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
})

mysqlConnection.connect((error)=> {
    !error ? console.log('DB connection succeded') : console.log('DB connection faled')
})


app.get('/api/family/list',(req,res)=> {
    mysqlConnection.query('SELECT * FROM families',(err,rows,fields)=>{
        !err ? res.json(rows) : res.status(503)
    })
})

app.post('/api/family/info',(req,res)=> {
    mysqlConnection.query('SELECT * FROM families WHERE id = ?',[req.body.id],(err,rows,fields)=>{
        !err ? res.send(rows) : res.status(503)
    })
})

app.post('/api/family/delete',(req,res)=> {
    mysqlConnection.query('DELETE FROM families WHERE id = ?',[req.body.id],(err,rows,fields)=>{
        !err ? res.send(rows) : res.status(503)
    })
})

app.post('/api/family/add',(req,res)=> {
    const family = req.body.family
    if(family.id) {
        mysqlConnection.query("UPDATE `families` SET `name`='"+family.name+"', `lastname`='"+family.lastname+"', `middlename`='"+family.middlename+"' WHERE `id`='"+family.id+"'",(err,rows,fields)=> {
            !err ? res.send(rows) : res.status(503)
        })
    } else {
        mysqlConnection.query("INSERT INTO `families` (`id`, `name`, `lastname`, `middlename`) VALUES (NULL, '"+family.name+"', '"+family.lastname+"', '"+family.middlename+"')",(err,rows,fields)=> {
            !err ? res.send(rows) : res.status(503)
        })
    }
})

app.listen(3080,()=> console.log('Server listened on port 3080'))
