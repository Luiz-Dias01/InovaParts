import axios from 'axios';
const api = axios.create({
    baseURL: 'http://129.148.42.252:5011'
    // baseURL: 'http://localhost:5011'
});

//Busca por id
export async function BuscarPorId(id) {
    const resp = await api.get(`/produto/busca/${id}`)
    console.log(resp)
    return resp.data
};

//Listar Produtos
export async function listarMercadoria() {
    const resp = await api.get(`/produto`)

    return resp.data
};

//Listar Produtos por Nome
export async function listarporNome(nome) {
    const resp = await api.get(`/produto/busca?nome=${nome}`)

    return resp.data 
};