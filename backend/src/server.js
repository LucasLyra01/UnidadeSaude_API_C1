require('dotenv').config({
    path: ".env"
});

const express = require('express');
const sync = require('./infra/postgres').sincronizarPostgres;
const app = express();

const port = process.env.APP_PORT;
const hostname = process.env.APP_HOSTNAME;

(async () => await sync())()

const defaultRoutes = require('./routes/default');

const pessoasRoutes = require('./routes/pessoas-routes');
const unidadesRoutes = require('./routes/unidades-routes');
const agendamentosRoutes = require('./routes/agendamento-routes');

const pessoasRoutesPg = require('./routes/pessoas-routes-pg');
const unidadesRoutesPg = require('./routes/unidades-routes-pg');
const agendamentosRoutesPg = require('./routes/agendamento-routes-pg');


app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use('/', defaultRoutes);

app.use('/api/pessoas', pessoasRoutes);
app.use('/api/unidades', unidadesRoutes);
app.use('/api/agendamentos', agendamentosRoutes);

app.use('/api/pessoaspg', pessoasRoutesPg);
app.use('/api/unidadespg', unidadesRoutesPg);
app.use('/api/agendamentospg', agendamentosRoutesPg);


app.listen(port, hostname, () => {
    console.log(`Servidor rodando no endereço: https://${hostname}:${port}`);
});