import mysql from 'mysql2/promise';

// Cria a conexão (pool). As definições específicadas do "createPool" são as predefinições padrões
export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'e-commerce',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // Máximo de conexões inativas; o valor padrão é o mesmo que "connectionLimit"
    idleTimeout: 60000, // Tempo limite das conexões inativas em milissegundos; o valor padrão é "60000"
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

