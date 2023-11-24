import './index.scss';
import PerifericosAdmin from '../../../components/layout/controleAdmin';
import {cadastrarProduto, editarProduto, listarProduto, listarporNome, deletarProduto, buscarId, adicionarImagem} from '../../../api/produtoEndpoints'

import axios from 'axios';

import storage from 'local-storage';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

export default function Config() {
  const [listarTodos, setListarTodos] = useState ([])
  const [listarNome, setListarNome] = useState ('')
  const [categoria, setCategoria] = useState ('')
  const [nome, setNome] = useState ('')
  const [marca, setMarca] = useState ('')
  const [modelo, setModelo] = useState ('')
  const [disponivel, setDisponivel] = useState (true)
  const [promocao, setPromocao] = useState ('')
  const [valor, setValor] = useState ('')
  const [detalhes, setDetalhes] = useState ('')
  const [quantidade, setQuantidade] = useState ('')
  const [imagem, setImagem] = useState ('')
  const [id, setId] = useState (0)
  const [listarAlguns, setListarAlguns] = useState ([])

  const {idparams} = useParams ();
  const navigate = useNavigate ();


  //Inserir Produto
  async function Salvar() { 

    try {
      if (id === 0) {
        const novoProduto = await cadastrarProduto(categoria, nome, marca, modelo, disponivel, promocao, valor, detalhes, quantidade)
        await uploadImagem(novoProduto.id)

        setId(novoProduto.id);
        toast.success("Registro Salvo!")

      }else {
        await editarProduto(id, categoria, nome, marca, modelo, disponivel, promocao, valor, detalhes, quantidade)
        toast.success('Produto alterado!')
      }


    } catch (error) {
      toast.error('não foi possivel cadastrar esse produto')
      
    }

  }


  async function uploadImagem(id) {


    const formData = new FormData();
    formData.append('capa', imagem)

    const reposta = await axios.put(`http://129.148.42.252:5011/produto/${id}/capa`, formData, {

        headers: {
            "Content-Type": "multipart/form-data"
        },

    })


}


  //Adicionar Novo Produto
  async function novoClick() {
    setId(0)
    setCategoria('')
    setNome('')
    setMarca('')
    setModelo('')
    setDisponivel(true)
    setPromocao('')
    setValor('')
    setDetalhes('')
    setQuantidade('');
  };

  //listar Todos
  async function carregarlistaProdutos() {
    const listar = await listarProduto();
    setListarTodos(listar)
  };

  useEffect(() => {
    carregarlistaProdutos();
  }, []);

  //Listar por Nome
  async function Filtrar() {

    try {
      if (listarNome != 0) {
        const filtro = await listarporNome(listarNome);
        setListarTodos(filtro)

      } else {
        const listar = await listarProduto();
        setListarTodos(listar)
      }
    } catch (error) {
      toast.error("Esse produto não foi cadastrado!")
    }
    
  }

  //Apagar Registro
  async function Deletar(id) {

    confirmAlert({
      title: 'Confirme',
      message: 'Deseja realmente deletar?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            const apagar = await deletarProduto(id)

            if (listarNome ==='') {
              carregarlistaProdutos()
            }else {
              Filtrar()
            }

            toast.success("Registro Deletado!")
          }
        },
        {
          label: 'Não',
        }
      ]
    });
  };

  
  //Alterar Produto
  useEffect(() => {
      if (idparams) {
        carregarProduto();
      }
  }, [])
  
  async function carregarProduto() {
    const resposta = await buscarId(idparams)

    setId(resposta.id)
    setCategoria(resposta.categoria)
    setNome(resposta.nome)
    setMarca(resposta.marca)
    setModelo(resposta.modelo)
    setDisponivel(resposta.disponivel)
    setPromocao (resposta.promocao)
    setValor(resposta.valor)
    setDetalhes(resposta.detalhes)
    setQuantidade(resposta.quantidade)
  }

  function Editar(idparams) {
    navigate(`/alterarProduto/${idparams}`); 
    window.location.reload(false)
  }


  //Comando por tecla para listar produto
  async function enterClick(e) {
    if (e.key == 'Enter') {
      Filtrar()
    }
  }

  //Selecionar imagem
  function selecionarImagem() {
    document.getElementById('imagemcapa').click();
  }

  //Mostrar imagem 
  function mostrarImagem() {
    return URL.createObjectURL(imagem)
  }

  //Segurança
  useEffect(() => {
    if (!storage('admin-logado')) {
      navigate('/loginCliente')
    }
  }, [])

  

  return (
    <div className="pagina-config">
      
      <PerifericosAdmin fundo2 = '#222222'/>

      <div id='container'>
        <header>
          <p>seja bem-vindo sr.Admin!</p>
        </header>

        <div id='enunciado'>
            <h1>Controle de Produto</h1>
        </div>

        <main>
          <div id='inserir'>
            <div id='enunciado-inserir'>
              <h2>Produto</h2>
            </div>

            <div id='area-cadastro'>
              <form>
                <div>
                  <div className='caixa-inserir'>
                    <label>
                      Produto
                    </label>
                    <input type='text' onKeyDown={enterClick} value={nome} onChange={e => setNome(e.target.value)}/>
                  </div>

                  <div className='caixa-inserir'>
                    <label>
                      Valor
                    </label>
                    <input type='text' value={valor} onChange={e => setValor(e.target.value)}/>
                  </div>

                  <div className='caixa-inserir'>
                    <label>
                      Categoria
                    </label>
                    <input type='text' value={categoria} onChange={e => setCategoria(e.target.value)}/>
                  </div>

                  <div id='group'>
                    <div className='caixa-inserir'>
                      <label>
                        QTD
                      </label>
                      <input type='text' value={quantidade} onChange={e => setQuantidade(e.target.value)}/>
                    </div>

                    <div className='caixa-inserir'>
                      <label>
                        Disponível
                      </label>
                      <input type='checkbox' onKeyDown={enterClick} value={disponivel} onChange={e => setDisponivel(e.target.checked)}/>
                    </div>
                  </div>

                  <div className='caixa-inserir'>
                    <label>
                      Modelo
                    </label>
                    <input type='text' value={modelo} onChange={e => setModelo(e.target.value)}/>
                  </div>

                  <div className='caixa-inserir'>
                    <label>
                      Marca
                    </label>
                    <input type='text' value={marca} onChange={e => setMarca(e.target.value)}/>
                  </div>
                </div>

                <div className='caixa-descricao'>
                    <label>
                      Promoção
                    </label>
                    <input type='text' value={promocao} onChange={e => setPromocao(e.target.value)}/>
                </div>

                <div className='caixa-descricao'>
                  <label>
                    Detalhes
                  </label>
                  <input id='teste' type='text' value={detalhes} onChange={e => setDetalhes(e.target.value)}/>
                </div>
              </form>

              <div id='finalizar'>
                <div>
                  <div id='area-img'>
                    <div id='img-g' onClick={selecionarImagem}>

                      {!imagem && <img id='imagemVazia' src='../assets/icon/icon_upload.png' alt='icon_upload'/>} 
                      
                      {imagem && <img id='imagemConteudo' src={mostrarImagem()} />}
                      
                      <input type='file' id='imagemcapa' onChange={e => setImagem(e.target.files[0])}/>
                    </div>

                    <div id='img-p'>
                      <div>
                        <img src=''/>
                      </div>

                      <div>
                        <img src=''/>
                      </div>
              
                      <div>
                        <img src=''/>
                      </div>
                    </div>
                  </div>

                  <div id='btn-duplo'>
                    <div className='btn-img'>
                      <button>Adicionar Imagem</button>
                    </div>
                    <div className='btn-img'>
                      <button>Remover Imagem</button>
                    </div>
                  </div>
                </div>

                <div id='btn-salvar'>
                  <button onClick={Salvar}>{id === 0 ? 'Salvar' : 'Alterar'}</button> &nbsp; &nbsp;
                  <button onClick={novoClick}>Adicionar</button>
                </div>
              </div>
            </div>

            
          </div>

          <div id='consulta'>
            <div id='conjunto'>
              <div id='enunciado-consulta'>
                <h2>Lista de produtos</h2>
              </div>

              <div className='caixa-consulta'>
                  <div>
                    <label>Nome do produto</label>
                    <input type='text' onKeyDown={enterClick} value={listarNome} onChange={e => setListarNome(e.target.value)}/>
                  </div>

                  <div id='img-consulta'>
                    <button onClick={Filtrar}><img src='../../assets/icon/lupa.png'/></button>
                  </div>
                </div>
            </div>

              <div id='scroll-horizontal'>
                <table>
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Peça</th>
                      <th>Marca</th>
                      <th>Disponível</th>
                      <th>QTD</th>
                      <th>Promoção</th>
                      <th>Valor</th>
                      <th>Promoção</th>
                    </tr>
                  </thead>
                  <tbody> 
                      {listarTodos.map(item =>
                        <tr key={item.id}>
                          <td className='td-center'>{item.id}</td>
                          <td>{item.nome}</td>
                          <td>{item.marca}</td>
                          <td className='td-center'>{item.disponivel ? 'Sim' : 'Não'}</td>
                          <td className='td-center'>{item.quantidade}</td>
                          <td>{item.promocao}</td>
                          <td className='td-center'>{item.valor}</td>
                          <td>
                            <div className='interacao'>
                              <div><button onClick={() => Editar(item.id)}><img src='../../assets/icon/alterar.png' /></button></div>
                              <div><button onClick={() => Deletar(item.id)}><img src='../../assets/icon/lixeira.png' /></button></div>
                            </div>
                          </td>
                        </tr>
                    )}
                
                  </tbody>
                </table>
              </div>
            <div>
              <ToastContainer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};


