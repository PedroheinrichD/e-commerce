import { pool } from "../db";

async function createInitialTables() {
    try {
        await pool.query(`
            CREATE TABLE usuario (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user VARCHAR(100) NOT NULL,
                password VARCHAR(8) NOT NULL
            ) 
        `)

        await pool.query(`
             CREATE TABLE produto(
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                categoria VARCHAR(100) NOT NULL,
                preco DOUBLE NOT NULL,
                descricao VARCHAR(100),
                imagens VARCHAR(150)
            ) 
        `)

        await pool.query(`
             CREATE TABLE variacao(
                id INT AUTO_INCREMENT PRIMARY KEY,
                tamanho CHAR(1) NOT NULL,
                cor VARCHAR(10) NOT NULL,
                qtd_disponivel INT NOT NULL,
                id_produto INT,
                
                FOREIGN KEY (id_produto) REFERENCES produto(id)
            ) 
        `)

        await pool.query(`
             CREATE TABLE carrinho(
                id INT AUTO_INCREMENT PRIMARY KEY,
                valor_total DOUBLE,
                cupom VARCHAR(100)
            ) 
        `)

        await pool.query(`
            CREATE TABLE itemCarrinho(
            id INT AUTO_INCREMENT PRIMARY KEY,
            qtd INT,
            id_carrinho INT,
            id_variacao INT,

            FOREIGN KEY (id_carrinho) REFERENCES carrinho(id),
            FOREIGN KEY (id_variacao) REFERENCES variacao(id)
           )
        `)

        await pool.query(`
            CREATE TABLE favoritos(
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_usuario INT,
            id_variacao INT,

            FOREIGN KEY (id_usuario) REFERENCES usuario(id),
            FOREIGN KEY (id_variacao) REFERENCES variacao(id)
           )
        `)

        console.log('TABELAS CRIADAS COM SUCESSO!');


    } catch (error) {
        console.log(error);
    }
    finally {
        pool.end()
    }
}


// iniciar a criação de tabelas -> npx tsx src/lib/database/createTables.ts
createInitialTables()