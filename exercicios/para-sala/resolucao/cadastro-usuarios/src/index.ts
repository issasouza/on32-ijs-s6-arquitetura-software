import express, { Request, Response } from 'express';

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('API de Cadastro de Usuários');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
