import { alterarImg, alterarProduto, cadastrarProdutos, deletarProduto, filtroValorMaior, filtroValorMenor, imagemProduto, inserirCategoria, inserirImg, listarCategoria, listarImg, listarImgInfo, listarPorId, listarPorNome, listarProdutos } from '../repository/produtoRepository.js';

import Router from 'express';
import multer from 'multer';

const server = Router();
const upload = multer({dest: 'storage/imgProdutos'});


server.post('/produto', async (req, resp) => {
    try {
        const cadastrar = req.body;

        if(!cadastrar.categoria)
            throw new Error('Categoria inválida.');

        if(!cadastrar.nome)
            throw new Error('Nome inválido.');

        if(!cadastrar.marca)
            throw new Error('Marca inválida.');

        if(!cadastrar.modelo)
            throw new Error('Modelo inválido.');

        if(cadastrar.disponivel == undefined)
            throw new Error('Disponibilidade obrigatória.');

        if(!cadastrar.promocao)
            throw new Error('Campo promoção obrigaratório.');

        if(cadastrar.valor == undefined || cadastrar.valor <= 0)
            throw new Error('Valor inválido.');

        if(!cadastrar.detalhes)
            throw new Error('Detalhes inválidos.');

        if(cadastrar.quantidade == undefined || cadastrar.quantidade < 0)
            throw new Error('Quantidade inválida.');

        const produtoCadastrado = await cadastrarProdutos(cadastrar);
        resp.send(produtoCadastrado);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.put('/produto/:id/capa', upload.single('capa'), async (req, resp) => {
    try {
        const {id} = req.params;
        const imagem  = req.file.path;

        const resposta = await imagemProduto(imagem , id);
        if(resposta !== 1)
            throw new Error('A imagem não pode ser salva.');

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/produto', async (req, resp) => {
    try {
        const dados = await listarProdutos();
        if(dados.length === 0)
            throw new Error('Não há produtos cadastrados.');

        resp.send(dados);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
        
    }
})

server.get('/produto/busca', async (req, resp) => {
    try {
        const {nome, categoria, marca} = req.query;
        const dados = await listarPorNome(nome, categoria, marca);
        console.log(nome)
        
        if(dados.length === 0)
            throw new Error('Produto não encontrado.');

        resp.send(dados);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });

    }
})

server.get('/produto/busca/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const dados = await listarPorId(id);

        if(dados.length === 0)
            throw new Error('Produto não encontrado.');

        resp.send(dados);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });    

    }
})

server.put('/produto/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const produto = req.body;

        if(!produto.categoria)
            throw new Error('Categoria inválida.');

        if(!produto.nome)
            throw new Error('Nome inválido.');

        if(!produto.marca)
            throw new Error('Marca inválida.');

        if(!produto.modelo)
            throw new Error('Modelo inválido.');

        if(produto.disponivel == undefined)
            throw new Error('Disponibilidade obrigatória.');

        if(!produto.promocao)
            throw new Error('Campo promoção obrigaratório.');

        if(produto.valor == undefined || produto.valor <= 0)
            throw new Error('Valor inválido.');

        if(!produto.detalhes)
            throw new Error('Detalhes inválidos.');

        if(produto.quantidade == undefined || produto.quantidade < 0)
            throw new Error('Quantidade inválida.');

        const resposta = await alterarProduto(id, produto);
        if(resposta !== 1)
            throw new Error('O produto não pode ser alterado.');
        else
            resp.status(200).send();
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})


server.delete('/produto/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarProduto(id);

        if(resposta !== 1)
            throw new Error('O produto não pode ser deletado.');

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.post('/categoria', async (req, resp) => {
    try {
        const categoria = req.body;

        if(!categoria.categoria)
            throw new Error('Categoria inválida.')

        const resposta = await inserirCategoria(categoria);
        resp.send(resposta);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/categoria', async (req, resp) => {
    try {
        const dados = await listarCategoria();

        if(dados.length === 0)
            throw new Error('Não há nenhuma categoria cadastrada.');

        resp.send(dados);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})


server.get('/filtro/maior', async (req, resp) => {
    try {
        const {valor} = req.query;
        const dados = await filtroValorMaior(valor);

        if(dados.length === 0)
            throw new Error('Não há produtos referente a esse valor.');

        resp.send(dados);   

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})


server.get('/filtro/menor', async (req, resp) => {
    try {
        const {valor} = req.query;
        const dados = await filtroValorMenor(valor);

        if(dados.length === 0)
            throw new Error('Não há produtos referente a esse valor.');

        resp.send(dados);   

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})



server.post('/imagem', async (req, resp) => {
    try {
        const imagem = req.body;
        const resposta = await inserirImg(imagem);
        
        resp.send(resposta);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.put('/imagem/:id', upload.single('capa'), async (req, resp) => {
    try {
        const {id} = req.params;
        const img = req.file.path;

        const resposta = await alterarImg(img, id);
        if(resposta !== 1)
            throw new Error('A imagem não pode ser salva.');

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/imagem', async (req, resp) => {
    try {
        const dados = await listarImg();
        if(dados.length === 0)
            throw new Error('Não há imagens cadastradas.');

        resp.send(dados);

    } catch (err) {
        resp.status(400).send({
            error: err.message
        });
    }
})

server.get('/imagem/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const dados = await listarImgInfo(id);
        console.log(dados)

        if(dados.length === 0)
            throw new Error('Não há nenhuma imagem cadastrada para este produto.');

        resp.send(dados);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

export default server;
