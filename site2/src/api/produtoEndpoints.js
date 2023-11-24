import axios from 'axios';
const api = axios.create({
    // baseURL: 'http://localhost:5011'
    baseURL: 'http://129.148.42.252:5011'
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
export async function editarProduto(id, categoria, nome, marca, modelo, disponivel, promocao, valor, detalhes, quantidade) {
    console.log('produtoEndpoint tem conexão')
    const resp = await api.put(`/produto/${id}`, {
        categoria: categoria,
        nome: nome,
        marca: marca,
        modelo: modelo,
        disponivel: disponivel,
        promocao: promocao,
        valor: valor,
        detalhes: detalhes,
        quantidade: quantidade,
    })

    return resp.data[0];
};


//Listar todos os Produtos
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

//Buscar produto por ID
export async function buscarId(id) {
    const resp = await api.get(`/produto/busca/${id}`)
    return resp.data[0]
};

//imagem do produto
export async function adicionarImagem(id, img) {
    const formData = new FormData();
    formData.append('capa', img);

    const resp =await api.post(`/imagem`. formData, {
        headers: {
            "constet-Type": "multipart/form-data"
        },
    })

    return resp.status;
}

