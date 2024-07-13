"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarUsuario = exports.cadastrarUsuario = exports.encontrarUsuario = exports.listarUsuarios = void 0;
const usuarioService_1 = require("../services/usuarioService");
const usuarioService = new usuarioService_1.UsuarioService();
const listarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuarioService.listarUsuarios();
        res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao listar usuários' });
    }
});
exports.listarUsuarios = listarUsuarios;
const encontrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const usuario = yield usuarioService.encontrarUsuario(id);
        if (usuario) {
            res.status(200).json(usuario);
        }
        else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao encontrar usuário' });
    }
});
exports.encontrarUsuario = encontrarUsuario;
const cadastrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const novoUsuario = req.body;
    try {
        yield usuarioService.cadastrarUsuario(novoUsuario);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário' });
    }
});
exports.cadastrarUsuario = cadastrarUsuario;
const deletarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield usuarioService.deletarUsuario(id);
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
});
exports.deletarUsuario = deletarUsuario;
