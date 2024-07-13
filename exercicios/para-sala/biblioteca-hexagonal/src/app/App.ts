import { ServicoBiblioteca } from "../dominio/servicos/ServicoBiblioteca";
import { RepositorioArquivo } from "../adaptadores/RepositorioArquivo";
import { ServicoNotificacaoEmail } from "../adaptadores/ServicoNotificacaoEmail";

async function main() {
  const repositorio = new RepositorioArquivo();
  const servicoNotificacao = new ServicoNotificacaoEmail();
  const servicoBiblioteca = new ServicoBiblioteca(repositorio, servicoNotificacao);

  const usuarioId = "usuario1";
  const livroId = "livro1";

  try {
    await servicoBiblioteca.emprestarLivro(usuarioId, livroId);
    console.log("Livro emprestado com sucesso");

    await servicoBiblioteca.devolverLivro(usuarioId, livroId);
    console.log("Livro devolvido com sucesso");
  } catch (error) {
    console.error((error as any).message);
  }
}

main();
