export interface IServicoNotificacao {
    notificar(usuarioId: string, mensagem: string): Promise<void>;
  }
  