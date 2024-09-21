const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.text());
app.use(bodyParser.json());

const DB = require('./BancoDeDados/DB');

const cors = require('cors');
app.use(cors());

app.get('/cargos', DB.getCargos);

app.get('/setores', DB.getSetores);

app.get('/funcionarios', DB.getFuncionarios);

app.get('/setor/:nome', DB.getSetorByName);

app.get('/funcionario/:id', DB.getFuncionarioNameById);

app.get('/funcionarios/cargo', DB.getAllFuncionariosByCargo);

app.get('/cargos/sem-funcionario', DB.getAllCargosSemFuncionario);

app.post('/funcionario', DB.insertFuncionario);

app.put('/funcionario/:id', DB.atualizarFuncionario);

app.delete('/funcionario/:id', DB.excluirFuncionario);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});