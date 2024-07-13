import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../services/usuarioService';

const usuarioService = new UsuarioService();

export const listarUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarios = await usuarioService.listarUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar usuários' });
    }
};

export const encontrarUsuario = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    try {
        const usuario = await usuarioService.encontrarUsuario(id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao encontrar usuário' });
    }
};

export const cadastrarUsuario = async (req: Request, res: Response): Promise<void> => {
    const novoUsuario: Usuario = req.body;
    try {
        await usuarioService.cadastrarUsuario(novoUsuario);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário' });
    }
};

export const deletarUsuario = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    try {
        await usuarioService.deletarUsuario(id);
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
};
