const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig)

const app = express();

// configuration =====================
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // 왜 ./views/home.html일 때는 안되는걸까?
    res.render('home.html');
});

app.get('/goods', (req, res) => {
    connection.query('SELECT * from Goods', (error, rows, fields) => {
        if (error) throw error;
        console.log('Goods info is: ', rows);
        res.send(rows);
    });
});

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
