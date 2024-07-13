import { Usuario } from '../models/Usuario';

export class UsuarioService {
    private usuarios: Usuario[] = [];

    async listarUsuarios(): Promise<Usuario[]> {
        return this.usuarios;
    }

    async encontrarUsuario(id: number): Promise<Usuario | undefined> {
        return this.usuarios.find(u => u.id === id);
    }

    async cadastrarUsuario(usuario: Usuario): Promise<void> {
        this.usuarios.push(usuario);
    }

    async deletarUsuario(id: number): Promise<void> {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
    }
}
