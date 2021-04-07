const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
const hostname = 'localhost';

const mongoose = require('mongoose');

const alunosRoutes = require('./routes/alunos-routes');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api/alunos', alunosRoutes);

mongoose.connect('mongodb://root:Chuteira3940@localhost:27017/DevWeb?authSource=admin', 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Erro ao conectar ao Mongo"));
db.once('open', function(){
    console.log("Banco de dados conectado com sucesso");
});

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Servidor rodando'
    });
});

app.listen(port, hostname, () =>{
    console.log(`Servidor rodando no endereço: https://${hostname}:${port}`);
});