const { Router } = require('express');
const PermissaoController = require('../controllers/permissaoController')

const router = Router();

router
    .post('/permissao', PermissaoController.cadastrar)
    .get('/permissao', PermissaoController.buscarTodas)
    .get('/permissao/:id', PermissaoController.buscarPorId)
    .put('/permissao/:id', PermissaoController.editar)
    .delete('/permissao/:id', PermissaoController.deletar)

module.exports = router;