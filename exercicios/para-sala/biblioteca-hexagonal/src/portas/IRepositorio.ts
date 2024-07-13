import { Livro } from "../dominio/entidades/Livro";

export interface IRepositorio {
  obterLivroPorId(livroId: string): Promise<Livro | null>;
  atualizarLivro(livro: Livro): Promise<void>;
}
