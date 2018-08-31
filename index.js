const express = require('express');
const gatos = require('./data/gatos.json');
const sobre = require('./data/sobre.json'); 
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('static'));
app.use(bodyParser.urlencoded());
app.use(expressMongoDb('mongodb://PLuGaDu:PLuGaDu-08@ds237932.mlab.com:37932/plugadu'));

app.get('', (req, res) => {
    res.render('index');
});

app.get('/gatos', (req, res) => {
    res.render('gatos', {'gatos': gatos});
});

app.get('/sobre', (req, res) => {
    res.render('sobre', {'sobre': sobre});
});

app.get('/contato', (req, res) => {
    res.render('contato');
});

app.post('', (req, res) => {
    req.db.collection('mensagens').insert(req.body, (erro) => {
        console.log(erro);
        res.render('Obrigado');
    });
});

app.get('/adm/msg/', (req, res) => {
    req.db.collection('mensagens').find().toArray((erro, dados) => {
        res.render('adm-msg', {'mensagem': dados});
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor inicializado')
});