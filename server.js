const express = require('express');
const port = process.env.PORT || 8000;

const app = express()
app.set('view engine', 'hbs');
app.get('/', function(req,res){
    res.render('index',{
        pageTitle: 'Centrica Break Tool'
    });
})

app.get('/info', function(req,res){
    res.send('First node project by Szymon Tokarski');
})
app.listen(port);