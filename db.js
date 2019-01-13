const { Client } = require('pg');

async function connect() {
    const client = new Client({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT
    });

    await client.connect();

    return client;
};

async function insert(conteudo) {
    try {
        const client = await connect();

        await client.query(
            `INSERT INTO ${ process.env.PGTABLE } (conteudo) VALUES ($1)`,
            [conteudo]
        );

        await client.end();

        return 'Inserido com sucesso';
    } catch (e) {
        console.error(e.stack);

        return 'Erro ao inserir o registro no banco de dados.';
    }
};

async function select() {
    try {
        const client = await connect();

        let result = await client.query(
            `SELECT id, conteudo FROM ${ process.env.PGTABLE } ORDER BY id DESC LIMIT 50`
        );

        await client.end();

        let retorno = JSON.stringify(result.rows, null, '\u00A0'.repeat(4));

        return retorno;
    } catch (e) {
        console.error(e.stack);

        return 'Erro ao consultar a quantidade de registros no banco de dados.';
    }
};

async function count() {
    try {
        const client = await connect();

        let result = await client.query(
            `SELECT COUNT(1) as count FROM ${ process.env.PGTABLE }`
        );

        await client.end();

        let row = result.rows[0];

        return `Atualmente existe(m) ${ row.count } registro(s) cadastrado(s) no banco de dados`;
    } catch (e) {
        console.error(e.stack);

        return 'Erro ao consultar a quantidade de registros no banco de dados.';
    }
};

module.exports = {
    insert,
    select,
    count
};
