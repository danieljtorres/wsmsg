const express = require('express');
const app = express();

const port = 666;

const mysql      = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 10, // default = 10
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'wsmsg'
});

app.get('/', function(req, res){
    res.sendFile(__dirname+'/public/index.html');
});

app.get('/numeros', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM numeros', function (error, results, fields) {
            connection.release();
            if (error) console.log(error);
            
            if (results.length) {
                res.status(200).json({data:results});
            } else {
                res.status(404).json({data: 'No se encontraron resultados'});
            }
        });
    });

});

app.listen(port, function () {
    console.log('puerto '+port+'!');
});