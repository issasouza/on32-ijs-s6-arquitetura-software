import { RepositorioArquivo } from './adaptadores/RepositorioArquivo';
import { ServicoNotificacaoEmail } from './adaptadores/ServicoNotificacaoEmail';
import { ServicoBiblioteca } from './dominio/servicos/ServicoBiblioteca';
import { Usuario } from './dominio/entidades/Usuario';

async function executarTestesManuais() {
  try {
    // Criar instâncias dos adaptadores
    const repositorio = new RepositorioArquivo();
    const servicoNotificacao = new ServicoNotificacaoEmail();
    const servicoBiblioteca = new ServicoBiblioteca(repositorio, servicoNotificacao);
    const usuario = new Usuario('usuario1', 'Alice', 'alice@example.com');

    try {
      // Testar empréstimo de livro
      console.log('--- Emprestar Livro ---');
      const sucessoEmprestimo = await servicoBiblioteca.emprestarLivro('livro1', usuario.id);
      console.log('Livro emprestado com sucesso.');
    } catch (error) {
      console.log('Falha ao emprestar o livro.');
    }
    
    try {
      // Testar empréstimo de livro já emprestado
      console.log('--- Tentar Emprestar o Mesmo Livro Novamente ---');
      const sucessoEmprestimoNovo = await servicoBiblioteca.emprestarLivro('livro1', usuario.id);
      console.log('Livro emprestado com sucesso.');
    } catch (error) {
      console.log('Falha ao emprestar o livro.');
    }
    
    try {
      // Testar devolução de livro
      console.log('--- Devolver Livro ---');
      const sucessoDevolucao = await servicoBiblioteca.devolverLivro('livro1', usuario.id);
      console.log('Livro devolvido com sucesso.');
    } catch (error) {
      console.log('Falha ao devolver o livro.');
    }
    
    try {
      // Testar devolução de livro que não está emprestado
      console.log('--- Tentar Devolver o Mesmo Livro Novamente ---');
      const sucessoDevolucaoNovo = await servicoBiblioteca.devolverLivro('livro1', usuario.id);
      console.log('Livro devolvido com sucesso.');
    } catch (error) {
      console.log('Falha ao devolver o livro.');
    }
  } catch (error) {
    console.error('Erro ao executar testes manuais:', error);
  }
}
executarTestesManuais().catch(console.error);
