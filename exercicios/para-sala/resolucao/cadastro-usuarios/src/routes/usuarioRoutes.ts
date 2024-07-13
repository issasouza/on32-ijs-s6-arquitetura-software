import express from 'express';
import * as usuarioController from '../controllers/usuarioController';

const router = express.Router();

router.get('/usuarios', usuarioController.listarUsuarios);
router.get('/usuarios/:id', usuarioController.encontrarUsuario);
router.post('/usuarios', usuarioController.cadastrarUsuario);
router.delete('/usuarios/:id', usuarioController.deletarUsuario);

export default router;
