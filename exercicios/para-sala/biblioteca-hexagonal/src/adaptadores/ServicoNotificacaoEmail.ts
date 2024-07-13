import { IServicoNotificacao } from "../portas/IServicoNotificacao";

export class ServicoNotificacaoEmail implements IServicoNotificacao {
  async notificar(usuarioId: string, mensagem: string): Promise<void> {
    console.log(`Enviando e-mail para o usuário ${usuarioId}: ${mensagem}`);
  
  }
}
