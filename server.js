const express = require('express');
const port = process.env.PORT || 8000;

const app = express();
//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))



app.set('view engine', 'hbs');
app.use()
app.get('/', function(req,res){
    res.render('index',{
        pageTitle: 'Centrica Break Tool'
    });
})

app.get('/info', function(req,res){
    res.send('First node project by Szymon Tokarski');
})
app.listen(port);