import { conexao } from "./connection.js";

export async function cadastrarPedido(pedidos) {
    const comando =
    `INSERT INTO tb_pedido (id_cliente, id_produto, id_cartao, id_endereco, nr_quantidade, ds_status)
                    VALUES (?, ?, ?, ?, ?, ?)`

    const [resposta] = await conexao.query(comando, [pedidos.cliente, pedidos.produto, pedidos.cliente,
    pedidos.cartao, pedidos.endereco, pedidos.quantidade, pedidos.status]);
    pedidos.id = resposta.insertId;
    return pedidos;
}

export async function listarPedidos() {
    const comando =
    `SELECT tb_pedido.id_pedido                 as pedidoId,
            tb_produto.id_produto 				as produtoId,
            tb_cliente.nm_cliente               as cliente,
                       nm_produto				as produto,
                       ds_marca 				as marca,
             tb_cartao.id_cartao 				as cartaoId,
                       nm_titular				as titular,
           tb_endereco.id_endereco 				as endereco,
                       nm_logradouro			as logradouro,
                       ds_cidade				as cidade,
                       ds_estado				as estado,
             tb_pedido.nr_quantidade 			as quantidade,
                       ds_status 				as statusPedido
                FROM tb_pedido
                    INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_pedido.id_cliente
                        INNER JOIN tb_produto ON tb_produto.id_produto = tb_pedido.id_produto
                            INNER JOIN tb_cartao ON tb_cartao.id_cartao = tb_pedido.id_cartao
                                INNER JOIN tb_endereco ON tb_endereco.id_endereco = tb_pedido.id_endereco
                                    ORDER BY tb_produto.id_produto`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function listarStatusPedidos(status) {
    const comando = 
    `SELECT tb_pedido.id_pedido                 as pedidoId,
            tb_produto.id_produto 				as produtoId,
            tb_cliente.id_cliente               as clienteId,
                       nm_produto				as produtoNome,
             tb_cartao.id_cartao 				as cartao,
                       nm_titular				as titular,
           tb_endereco.id_endereco 				as endereco,
                       nm_logradouro			as logradouro,
                       ds_cep					as cep,
                       ds_cidade				as cidade,
                       ds_estado				as estado,
             tb_pedido.nr_quantidade 			as quantidade,
                       ds_status 				as statusPedido
                            FROM tb_pedido
                                INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_pedido.id_cliente
                                    INNER JOIN tb_produto ON tb_produto.id_produto = tb_pedido.id_produto
                                        INNER JOIN tb_cartao ON tb_cartao.id_cartao = tb_pedido.id_cartao
                                            INNER JOIN tb_endereco ON tb_endereco.id_endereco = tb_pedido.id_endereco
                                                WHERE ds_status LIKE ?`

    const [resposta] = await conexao.query(comando, [`%${status}%`]);
    return resposta;
}

export async function alterarStatusPedido(status, id) {
    const comando =
    `UPDATE tb_pedido
	    SET ds_status = ?
		    WHERE id_pedido = ?`

    const [resposta] = await conexao.query(comando, [status, id]);
    return resposta.affectedRows;
}

export async function deletarPedido(id) {
    const comando = 
    `DELETE FROM tb_pedido
        WHERE id_pedido = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}