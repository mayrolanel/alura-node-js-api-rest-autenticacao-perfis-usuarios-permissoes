const PermissaoService = require('../services/permissaoService');
const permissaoService = new PermissaoService();

class PermissaoController{

    static async cadastrar(req, res){
        try {
            const { nome, descricao } = req.body;
            const permissao = await permissaoService.cadastrar({ nome, descricao})
            res.status(201).send(permissao)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async buscarTodas(req, res) {
        const permissoes = await permissaoService.buscarTodasPermissoes();

        res.status(200).json(permissoes)
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const permissao = permissaoService.buscarPermissaoPorId(id)
            res.status(200).json(permissao)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async editar(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao } = req.body;
            const permissao = await permissaoService.editarPermissao({ id, nome, descricao })
            res.status(200).json(permissao)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletar(req, res){
        try {
            const { id } = req.params;
            await permissaoService.deletarPermissao(id)
            res.status(200).send({ message: 'Permissão deletada com sucesso!'})
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = PermissaoController;