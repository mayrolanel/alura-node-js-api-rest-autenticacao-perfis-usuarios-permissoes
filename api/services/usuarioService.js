const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuarioService {

    async cadastrar(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        })

        if (usuario) {
            throw new Error('Usuário já cadastrado')
        }

        try {
            const senhaHash = await hash(dto.senha, 8);

            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            });

            return novoUsuario;
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário')
        }
    }

    async buscarTodosUsuarios(){
        const usuarios = await database.usuarios.findAll({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                }
            ]
        });
        return usuarios;
    }

    async buscarUsuarioPorId(id) {
        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao'],
                    through: {
                        attributes: [],
                    }
                }
            ],
            where: {
                id: id
            }
        })

        if(!usuario) {
            throw new Error('Usuário não existe')
        }

        return usuario;
    }

    async editarUsuario(dto) {
        const usuario = await this.buscarUsuarioPorId(dto.id);

        try {
            usuario.nome = dto.nome;
            usuario.email = dto.email;

            await usuario.save();
        } catch (error) {
            throw new Error('Erro ao editar usuário')
        }
    }

    async deletarUsuario(id){
        await this.buscarUsuarioPorId(id);
        try {
            database.usuarios.destroy({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar deletar o usuario!')
        }
    }
}

module.exports = UsuarioService;