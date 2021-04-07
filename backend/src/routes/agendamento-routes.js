let router = require('express').Router();

const agendamentoController = require('../controllers/agendamento-controller');

router.post('/', agendamentoController.adicionarAgendamentos);

router.get('/', agendamentoController.listarAgendamentos);

router.get('/:id', agendamentoController.listarAgendamentosPorId);

router.put('/:id', agendamentoController.atualizarAgendamentos);

router.delete('/:id', agendamentoController.removerAgendamentos);

module.exports = router;