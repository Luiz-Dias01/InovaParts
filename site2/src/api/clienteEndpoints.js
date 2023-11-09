import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:5000'
});

//Login
export async function loginCliente(email, senha) {
    const resp = await api.post('/usuario/login', {
        email: email,
        senha: senha
    })

    return resp.data
};

//listar clientes
export async function listarCliente() {
    const resp = await api.get('/usuario')

    return resp.data
}

//Listar clientes por Nome
export async function listarporNome(nome) {
    const resp = await api.get(`/produto/busca?nome=${nome}`)

    return resp.data
};