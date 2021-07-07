require('dotenv').config({
    path: ".env"
});

const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.APP_PORT;
const hostname = process.env.APP_HOSTNAME;

const defaultRoutes = require('./routes/default');

const pessoasRoutes = require('./routes/pessoas-routes');
const unidadesRoutes = require('./routes/unidades-routes');
const agendamentosRoutes = require('./routes/agendamento-routes');


app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(cors());

app.use('/', defaultRoutes);

app.use('/api/pessoas', pessoasRoutes);
app.use('/api/unidades', unidadesRoutes);
app.use('/api/agendamentos', agendamentosRoutes);

app.listen(port, hostname, () => {
    console.log(`Servidor rodando no endereço: https://${hostname}:${port}`);
});