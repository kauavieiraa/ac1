async function connect() {
    const mysql = require('mysql2/promise');

    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'usbw',
        database: 'rhac1',
        port: 3308
    })

    console.log('Conectou no MySQL');
    global.connection = connection;
    return connection;
}

connect();

async function getCargos(req, res) {
    const conn = await connect();

    const cargos = await conn.query('SELECT * FROM cargo');
    console.log(cargos[0]);
    res.send(cargos[0]);
}

async function getSetores(req, res) {
    const conn = await connect();

    const setores = await conn.query('SELECT * FROM setor');
    console.log(setores[0]);
    res.send(setores[0]);
}

async function getFuncionarios(req, res) {
    const conn = await connect();

    const funcionarios = await conn.query('SELECT * FROM funcionario');
    console.log(funcionarios[0]);
    res.send(funcionarios[0]);

}

async function getSetorByName(req, res) {
    const conn = await connect();
    const nome = req.params.nome;

    const setor = await conn.query('SELECT * FROM setor WHERE nome = ?', nome);
    console.log(setor[0]);
    res.send(setor[0]);
}

async function getFuncionarioNameById(req, res) {
    const conn = await connect();
    const id = req.params.id;

    const funcionario = await conn.query('SELECT nome FROM funcionario WHERE cod_funcionario = ?', id);
    console.log(funcionario[0]);
    res.send(funcionario[0]);
}

async function getAllFuncionariosByCargo(req, res) {
    const conn = await connect();
    const cargo = req.body;

    const funcionario = await conn.query('SELECT * FROM funcionario WHERE cod_cargo = ?', cargo.cod_cargo);
    console.log(funcionario[0]);
    res.send(funcionario[0]);
}

async function getAllCargosSemFuncionario(req, res) {
    const conn = await connect();

    const cargos = await conn.query('SELECT * FROM cargo WHERE cod_cargo NOT IN (SELECT cod_cargo FROM funcionario)');
    console.log(cargos[0]);
    res.send(cargos[0]);

}

async function insertFuncionario(req, res) {
    const conn = await connect();
    const { nome, data_admissao, cod_cargo, cod_setor } = req.body;
    if (!nome || !cod_cargo || !cod_setor) return res.status(400).send('Nome, cargo e setor são obrigatórios');

    const result = await conn.query('INSERT INTO funcionario (nome, data_admissao, cod_cargo, cod_setor) VALUES (?, ?, ?, ?)',
        [nome, data_admissao, cod_cargo, cod_setor]);
    console.log(result);

    res.send(result);
}

async function atualizarFuncionario(req, res) {
    const conn = await connect();
    let id = req.params.id;
    const { nome, data_admissao, cod_cargo, cod_setor } = req.body;

    const result = await conn.query('UPDATE funcionario SET nome = ?, data_admissao = ?, cod_cargo = ?, cod_setor = ? WHERE id = ?',
        [nome, data_admissao, cod_cargo, cod_setor, id])

    res.send(result);
}


async function excluirFuncionario(req, res) {
    const conn = await connect();
    let id = req.params.id;

    const result = await conn.query('delete from funcionario where cod_funcionario = ?', id)
    res.send(result)
}



module.exports = { getCargos, getSetores, getFuncionarios, getSetorByName, getFuncionarioNameById, getAllFuncionariosByCargo, getAllCargosSemFuncionario, insertFuncionario, atualizarFuncionario, excluirFuncionario };