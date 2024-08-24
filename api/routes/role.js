const { Router } = require('express');
const RolerController = require('../controllers/roleController');

const router = Router();

router
    .post('/roles', RolerController.cadastrar)
    .get('/roles', RolerController.buscarTodasRoles)
    .get('/roles/:id', RolerController.buscarRolePorId)
    .put('/roles/:id', RolerController.editarRole)
    .delete('/roles/:id', RolerController.deletarRole)

module.exports = router;