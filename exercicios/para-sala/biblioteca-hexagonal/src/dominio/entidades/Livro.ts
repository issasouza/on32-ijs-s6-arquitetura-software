export class Livro {
    constructor(
      public id: string,
      public titulo: string,
      public autor: string,
      public estaDisponivel: boolean = true
    ) {}
  }
  