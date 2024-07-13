import { IRepositorio } from "../portas/IRepositorio";
import { Livro } from "../dominio/entidades/Livro";
import fs from "fs/promises";
import path from "path";

const caminhoArquivoDados = path.join(__dirname, "../dados/biblioteca.json");

export class RepositorioArquivo implements IRepositorio {
  private async lerDados(): Promise<{ livros: Livro[] }> {
    const dados = await fs.readFile(caminhoArquivoDados, "utf-8");
    return JSON.parse(dados);
  }

  private async escreverDados(dados: { livros: Livro[] }): Promise<void> {
    await fs.writeFile(caminhoArquivoDados, JSON.stringify(dados, null, 2), "utf-8");
  }

  async obterLivroPorId(livroId: string): Promise<Livro | null> {
    const dados = await this.lerDados();
    const livro = dados.livros.find(livro => livro.id === livroId);
    return livro || null;
  }

  async atualizarLivro(livro: Livro): Promise<void> {
    const dados = await this.lerDados();
    const indiceLivro = dados.livros.findIndex(l => l.id === livro.id);
    if (indiceLivro !== -1) {
      dados.livros[indiceLivro] = livro;
      await this.escreverDados(dados);
    }
  }
}
