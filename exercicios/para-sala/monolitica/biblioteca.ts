import * as fs from 'fs';         // Importa o módulo 'fs' para manipulação de arquivos
import Table from 'cli-table3';  // Importa a biblioteca 'cli-table3' para criar tabelas no console

// Define a interface Livro para especificar a estrutura de cada livro na biblioteca
interface Livro {
    id: string;
    titulo: string;
    autor: string;
    estaDisponivel: boolean;
}

let livros: Livro[] = [];  // Declara uma variável para armazenar os livros da biblioteca

// Carrega os dados do arquivo JSON que contém os livros da biblioteca
function carregarDados(): void {
    try {
        const dados = fs.readFileSync('./dados/biblioteca.json', 'utf-8');  // Lê o arquivo JSON
        if (dados.trim() === '') {
            console.log('Arquivo JSON vazio. Inicializando com dados padrão.');
            inicializarDadosPadrao();  // Inicializa com dados padrão se o arquivo estiver vazio
        } else {
            livros = JSON.parse(dados).livros;  // Converte os dados do arquivo JSON para o array de livros
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);  // Exibe erro se houver problemas ao carregar dados
        console.log('Inicializando com dados padrão.');
        inicializarDadosPadrao();  // Inicializa com dados padrão em caso de erro
    }
}

// Inicializa dados padrão se o arquivo JSON estiver vazio ou não existir
function inicializarDadosPadrao(): void {
    livros = [
        { id: 'livro1', titulo: 'Dom Casmurro', autor: 'Machado de Assis', estaDisponivel: true },
        { id: 'livro2', titulo: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis', estaDisponivel: true }
    ];
    salvarDados();  // Salva os dados iniciais no arquivo JSON
}

// Salva os dados atuais (array de livros) no arquivo JSON
function salvarDados(): void {
    try {
        fs.writeFileSync('./dados/biblioteca.json', JSON.stringify({ livros }, null, 2));  // Converte e escreve os dados no arquivo JSON
    } catch (error) {
        console.error('Erro ao salvar dados:', error);  // Exibe erro se houver problemas ao salvar dados
    }
}

// Lista todos os livros na biblioteca em formato de tabela no console
function listarLivros(): void {
    const table = new Table({
        head: ['ID', 'Título', 'Autor', 'Disponível'],  // Cabeçalho da tabela
        colWidths: [10, 30, 20, 12],  // Tamanhos das colunas
        wordWrap: true  // Habilita quebra de linha automática nas células da tabela
    });

    livros.forEach(livro => {
        table.push([livro.id, livro.titulo, livro.autor, livro.estaDisponivel ? 'Sim' : 'Não']);  // Adiciona cada livro como uma linha na tabela
    });

    console.log('\n--- Lista de Livros na Biblioteca ---');
    console.log(table.toString());  // Exibe a tabela formatada no console
}

// Empresta um livro da biblioteca
function emprestarLivro(idLivro: string): void {
    const livro = livros.find(livro => livro.id === idLivro);  // Busca o livro pelo ID
    if (livro && livro.estaDisponivel) {
        livro.estaDisponivel = false;  // Marca o livro como não disponível
        salvarDados();  // Salva os dados atualizados no arquivo JSON
        console.log(`\nLivro "${livro.titulo}" emprestado com sucesso.`);
    } else if (livro && !livro.estaDisponivel) {
        console.log(`\nO livro "${livro.titulo}" já está emprestado.`);
    } else {
        console.log('\nFalha ao emprestar o livro. Livro não encontrado ou não disponível.');
    }
}

// Devolve um livro à biblioteca
function devolverLivro(idLivro: string): void {
    const livro = livros.find(livro => livro.id === idLivro);  // Busca o livro pelo ID
    if (livro && !livro.estaDisponivel) {
        livro.estaDisponivel = true;  // Marca o livro como disponível
        salvarDados();  // Salva os dados atualizados no arquivo JSON
        console.log(`\nLivro "${livro.titulo}" devolvido com sucesso.`);
    } else if (livro && livro.estaDisponivel) {
        console.log(`\nO livro "${livro.titulo}" já está disponível na biblioteca.`);
    } else {
        console.log('\nFalha ao devolver o livro. Livro não encontrado ou não emprestado.');
    }
}

// Função principal para simular a interação do usuário
async function main() {
    carregarDados();  // Carrega os dados da biblioteca do arquivo JSON

    listarLivros();  // Lista os livros disponíveis na biblioteca

    // Exemplo de empréstimo e devolução de livros
    const idLivroEmprestimo = 'livro1';
    console.log(`\n--- Emprestar Livro ID: ${idLivroEmprestimo} ---`);
    emprestarLivro(idLivroEmprestimo);

    const idLivroDevolucao = 'livro2';
    console.log(`\n--- Devolver Livro ID: ${idLivroDevolucao} ---`);
    devolverLivro(idLivroDevolucao);

    listarLivros();  // Lista os livros disponíveis na biblioteca após as operações
}

main().catch(console.error);  // Executa a função principal e trata erros, se houverem
