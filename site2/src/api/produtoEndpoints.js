import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:5000'
});


//Cadastrar produtos
export async function cadastrarProduto(categoria, nome, marca, modelo, disponivel, promocao, valor, detalhes, quantidade) {
    const resp = await api.post('/produto', {
        categoria: categoria,
        nome: nome,
        marca: marca,
        modelo: modelo,
        disponivel: disponivel,
        promocao: promocao,
        valor: valor,
        detalhes: detalhes,
        quantidade: quantidade
    })
    return resp.data;
};


//Alterar Produtos
export async function alterarProduto(id, categoria, nome, marca, modelo, disponivel, promocao, valor, detalhes, quantidade) {
    const resp = await api.put(`/produto/${id}`, {
        categoria: categoria,
        nome: nome,
        marca: marca,
        modelo: modelo,
        disponivel: disponivel,
        promocao: promocao,
        valor: valor,
        detalhes: detalhes,
        quantidade: quantidade
    })
    return resp.data;
};


//Listar todos os Produros
export async function listarProduto() {
    const resp = await api.get(`/produto`)

    return resp.data
};


//Listar Produtos por Nome
export async function listarporNome(nome) {
    const resp = await api.get(`/produto/busca?nome=${nome}`)

    return resp.data
};

//Deletar Produto
export async function deletarProduto(id) {
    const resp = await api.delete(`/produto/${id}`)

    return resp.status
};

//Buscar por ID
export async function buscarId(id) {
    const resp = await api.get(`/produto/busca/${id}`)

    return resp.data
};