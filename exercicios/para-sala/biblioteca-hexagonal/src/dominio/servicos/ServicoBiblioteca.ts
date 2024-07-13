import { Livro } from "../entidades/Livro";
import { Usuario } from "../entidades/Usuario";
import { IRepositorio } from "../../portas/IRepositorio";
import { IServicoNotificacao } from "../../portas/IServicoNotificacao";

export class ServicoBiblioteca {
  constructor(
    private repositorio: IRepositorio,
    private servicoNotificacao: IServicoNotificacao
  ) {}

  async emprestarLivro(usuarioId: string, livroId: string): Promise<void> {
    const livro = await this.repositorio.obterLivroPorId(livroId);
    if (!livro || !livro.estaDisponivel) {
      throw new Error("Livro não disponível");
    }
    livro.estaDisponivel = false;
    await this.repositorio.atualizarLivro(livro);
    await this.servicoNotificacao.notificar(usuarioId, `Você emprestou o livro: ${livro.titulo}`);
  }

  async devolverLivro(usuarioId: string, livroId: string): Promise<void> {
    const livro = await this.repositorio.obterLivroPorId(livroId);
    if (!livro || livro.estaDisponivel) {
      throw new Error("Livro não está emprestado");
    }
    livro.estaDisponivel = true;
    await this.repositorio.atualizarLivro(livro);
    await this.servicoNotificacao.notificar(usuarioId, `Você devolveu o livro: ${livro.titulo}`);
  }
}
