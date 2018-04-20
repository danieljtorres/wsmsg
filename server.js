const express = require('express');
const app = express();

const port = 666;

const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'wsmsg'
});

app.get('/numeros', function (req, res) {
    connection.connect();

    connection.query('SELECT * FROM numeros', function (error, results, fields) {
        if (error) throw error;
        
        if (results.length) {
            res.status(200).json({data:results});
        } else {
            res.status(404).json({data: 'No se encontraron resultados'});
        }
        connection.end();
    });

});

app.listen(port, function () {
    console.log('puerto '+port+'!');
});