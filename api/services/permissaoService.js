const database = require('../models')
const uuid = require('uuid')

class PermissaoService{

    async cadastrar(dto){
        const permissao = await database.permissoes.findOne({
            where: {
                nome: dto.nome
            }
        });

        if(permissao){
            throw new Error('Permissao já cadastrada')
        }

        try {
            const novaPermissao = await database.permissoes.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return novaPermissao;
        } catch (error) {
            throw new Error('Erro ao cadastrar permissao')
        }
    }

    async buscarTodasPermissoes() {
        const permissoes = await database.permissoes.findAll();
        return permissoes
    }

    async buscarPermissaoPorId(id) {
        const permissao = await database.permissoes.findOne({
            where: {
                id: id
            }
        })

        if(!permissao){
            throw new Error('Permissão não encontrada');
        }

        return permissao;
    }

    async editarPermissao(dto){
        const permissao = await database.permissoes.findOne({
            where: {
                id: dto.id
            }
        });

        if(!permissao){
            throw new Error('Permissão não encontrada');
        }

        try {
            permissao.nome = dto.nome;
            permissao.descricao = dto.descricao;
            await permissao.save();
            return await permissao.reload();
        } catch (error) {
            throw new Error('Erro ao editar permissão')
        }
    }

    async deletarPermissao(id){
        const permissao = await database.permissoes.findOne({
            where: {
                id: dto.id
            }
        });

        if(!permissao){
            throw new Error('Permissão não encontrada');
        }

        try {
            await database.permissoes.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao deletar permissão')
        }
    }
}

module.exports = PermissaoService