import './index.scss';
import Modal from '../../components/modal/popupCarrinho/popupCarrinho.js';
import Header from '../../components/layout/headerProduto/index.js';
import Footer from '../../components/layout/rodape/footer.js';
import Carrinho from '../../components/modal/popupCarrinho/popupCarrinho.js';

import { Produto  } from '../../components/modal/popupProduto/produto';

import storage from 'local-storage';
import { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { BuscarPorId, listarMercadoria, listarporNome } from '../../api/telacompraEndpoints.js';




export default function Compra() {
    const [open,  setOpen] = useState (false);

    const [listarItens, setListarItens] = useState ([])
    const [listarNome, setListarNome] = useState ([])


    const [openManutencao,  setOpenManutencao] = useState (false);
    const [openProduto,  setOpenProduto] = useState (false);
    
    const [openVermais, setOpenVermais] = useState (false)
    const [openVermais2, setOpenVermais2] = useState (false)
    const [openAmortecedor, setOpenAmortecedor] = useState (false)
    const [openFreio, setOpenFreio] = useState (false)
    const [openDirecao, setOpenDirecao] = useState (false)
    const [openMotor, setOpenMotor] = useState (false)
    const [openEmbreagem, setOpenEmbreagem] = useState (false)
    const [openSuspensao, setOpenSuspensao] = useState (false)
    const [openCarro, setOpenCarro] = useState (false)
    const [openCardmanutencao, setOpenCardmanutencao] = useState (false)

    const [categoria, setCategoria] = useState ('')
    const [nome, setNome] = useState ('')
    const [marca, setMarca] = useState ('')
    const [modelo, setModelo] = useState ('')
    const [disponivel, setDisponivel] = useState ('')
    const [promocao, setPromocao] = useState ('')
    const [valor, setValor] = useState ('')
    const [detalhes, setDetalhes] = useState ('')
    const [quantidade, setQuantidade] = useState ('')
    const [id, setId] = useState (0)

    const idparams = useParams ();
    const navigate = useNavigate ();


    //card
    //manutencao
    const manutencaoStyle = {
        display: 'none'
    }

    //Categoria
    const amortecedorStyle = {
        display: 'none'
    }

    const freioStyle = {
        display: 'none'
    }

    const direcaoStyle = {
        display: 'none'
    }

    const motorStyle = {
        display: 'none'
    }

    const embreagemStyle = {
        display: 'none'
    }

    const suspensaoStyle = {
        display: 'none'
    }



    //Marca

    //Fornecedor

    //Tipo de carro
    //Carro
    const carroStyle = {
        display: 'none'
    }

    //Caminhão

    //Moto

    //Botão Ver-mais
    const vermaisStyle = {
        display: 'none'
    }

    //Filtrar produto
    async function filtrarProduto() {

        try {
            if (listarNome != 0) {
            const filtro = await listarporNome(listarNome);
            setListarItens(filtro)

            } else {
            const listar = await listarMercadoria();
            setListarItens(listar)
            }
        } catch (error) {
            alert(error)
        }
    
    }

    async function IconeTodos() {
        const listar = await listarMercadoria();
        setListarItens(listar)
    }

    async function maiorPreco() {
        
    }

    //Carregar produto
    async function carregarLista() {
        const listar = await listarMercadoria();
    
        setListarItens(listar)
    };

    useEffect( () => {
        carregarLista()
    }, [])

    //Visualizar produto
    function BuscarPorId(idparams) {
        navigate(`/produto/${idparams}`); 
        window.location.reload(false)
    }

    //Tecla enter
    async function enterClick(e) {
        if (e.key == 'Enter') {
            filtrarProduto()
        }
    }

    useEffect(() => {
        if (!storage('usuario-logado')) {
            navigate('/loginCliente')
        }
    }, [])

    return (
        <div id='pagina-compra'>
            <header>
                <nav>
                    <div id='menu'>
                        <div id='apresentacao'>
                            <Link to='/'><img src='../assets/icon/logo.png'/></Link>
                            <p>InovaPartes</p>
                        </div>

                        <div id='config-car'>
                            <button onClick={() => setOpen(true)}>
                                <img src='../assets/icon/icon_Carrinho.png'/>
                            </button>

                            <img src='../assets/icon/icone_Usuario.png'/>
                        </div>
                        
                    </div>
                </nav>

                <Carrinho isOpen = {open}
                        setOpen = {setOpen}/>

                <div id='area-pesquisa'>
                    <div className='txt-header'>
                        <h1>Inovapartes</h1>
                        <p>
                            Invista no seu veículo  
                        </p>

                        <p>
                            do conforto e com a segurança da sua <span>casa!</span>
                        </p>
                    </div>

                    <div id='alinhar-caixa-pesquisa'>
                        <div id='caixa-pesquisa'>
                            <input type='text' placeholder='Pesquisa' onKeyDown={enterClick} value={listarNome} onChange={e => setListarNome(e.target.value)}/>
                            <img onClick={filtrarProduto} src='../assets/icon/lupa.png'/>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <section id='departamento'>
                    <div id='faixa-departamento'> 
                        <p>
                            Departamento
                        </p>
                    </div>
                    <div id='card-agrupamento'>
                        <div className='card-selecao'>Performance</div>

                        <div className='card-selecao'>Turbinas</div >

                        <div className='card-selecao'>Kit Turbo</div>

                        <div className='card-selecao'>fueltech</div>

                        

                        <div onMouseOut={() => setOpenCardmanutencao(false)} >
                            <div onMouseEnter={() => setOpenCardmanutencao(true)} className='card-manutencao'>Manutenção Preventiva</div>

                            <span   className='card-orientacao' style={openCardmanutencao ? null : manutencaoStyle}>
                                <div className='conteudo-card' >
                                    <p>Barra de torção</p>
                                    <p>MC Pherson/Telescopia</p>
                                    <p>Feixe de molas</p>
                                    <p>Duplo "A"</p>
                                    <p>Multiplink</p>
                                    <p>Suspensão a ar</p>
                                    <p>Suspensão de rosca</p>
                                    <p>Suspensão Hidropneumática</p>
                                </div>
                            </span> 
                        </div>

                        
                    </div>
                </section>

                
            
                <section id='area-produto'>
                    <aside>
                        <h2>Ordenar</h2>
                        <div id='ordenamento'>
                            <div>
                                <div className='circulo-opcao'>
                                <img onClick={IconeTodos} src='../assets/icon/icon-todos.svg'/>
                                </div>

                                <div className='nome-opcao'>Todos</div>
                            </div>

                            <div>
                                <div className='circulo-opcao'>
                                <img id='icon-menor-preco' src='../assets/icon/icon-menor-preco.svg'/>
                                </div>

                                <div className='nome-opcao'>Menor preço</div>
                            </div>

                            <div>
                                <div className='circulo-opcao'>
                                    <img onClick={maiorPreco} src='../assets/icon/icon-maior-preco.svg'/>
                                </div>

                                <div className='nome-opcao'>Maior preço</div>
                            </div>
                        </div>

                        <div className='linha-aside'><hr/></div>

                        <div id='categoria'>
                            <h2>Categoria</h2> 
                            <div className='selecao'>
                                <div className='topico-selecao'>
                                    <p>Amortecedores</p>

                                    <div onClick={() => setOpenAmortecedor(!openAmortecedor)}>{openAmortecedor ? <img src='../assets/icon/seta-cima.png'/> : <img src='../assets/icon/seta-baixo.png'/>}</div>
                                </div>

                                <span className='subtopico-selecao' style={openAmortecedor ? null : amortecedorStyle}>
                                    <div>
                                        <p>Hidráulicos</p>
                                        <p>Pressurizados</p>
                                    </div>
                                </span>

                                <div className='topico-selecao'>
                                    <p>Freios</p>
                                    
                                    <div onClick={() => setOpenFreio(!openFreio)}>{openFreio ? <img src='../assets/icon/seta-cima.png'/> : <img src='../assets/icon/seta-baixo.png'/>}</div>
                                </div>

                                <span className='subtopico-selecao' style={openFreio ? null : freioStyle}>
                                    <div>
                                        <p>Frios a Disco</p>
                                        <p>Freios ABS</p>
                                        <p>Freios a Tambor</p>
                                    </div>
                                </span>

                                <div className='topico-selecao'>
                                    <p>Direção</p>
                                    
                                    <div onClick={() => setOpenDirecao(!openDirecao)}>{openDirecao ? <img src='../assets/icon/seta-cima.png'/> : <img src='../assets/icon/seta-baixo.png'/>}</div>
                                </div>

                                <span className='subtopico-selecao' style={openDirecao ? null : direcaoStyle}>
                                    <div>
                                        <p>Mecânica</p>
                                        <p>Hidráulica</p>
                                        <p>Elétrica</p>
                                        <p>Eletro-Hidráulica</p>
                                    </div>
                                </span>

                                <div className='topico-selecao'>
                                    <p>Motor</p>
                                    
                                    <div onClick={() => setOpenMotor(!openMotor)}>{openMotor ? <img src='../assets/icon/seta-cima.png'/> : <img src='../assets/icon/seta-baixo.png'/>}</div>
                                </div>

                                <span className='subtopico-selecao-motor' style={openMotor ? null : motorStyle}>
                                    <div>
                                        <p>Motores de corrente alternada (CA)</p>
                                        <p>Motores de corrente contínua (CC)</p>
                                        <p>Motores Universais (CA e CC)</p>
                                    </div>
                                </span>

                                <div className='topico-selecao'>
                                    <p>Embreagem</p>
                                    
                                    <div onClick={() => setOpenEmbreagem(!openEmbreagem)}>{openEmbreagem ? <img src='../assets/icon/seta-cima.png'/> : <img src='../assets/icon/seta-baixo.png'/>}</div>
                                </div>

                                <span className='subtopico-selecao' style={openEmbreagem ? null : embreagemStyle}>
                                    <div>
                                        <p>Cerâmica</p>
                                        <p>Carbono</p>
                                        <p>Multidisco</p>
                                    </div>
                                </span>

                                <div className='topico-selecao'>
                                    <p>Suspensão</p>
                                    
                                    <div onClick={() => setOpenSuspensao(!openSuspensao)}>{openSuspensao ? <img src='../assets/icon/seta-cima.png'/> : <img src='../assets/icon/seta-baixo.png'/>}</div>
                                </div>

                                <span className='subtopico-selecao-suspensao' style={openSuspensao ? null : suspensaoStyle}>
                                    <div>
                                        <p>Barra de torção</p>
                                        <p>MC Pherson/Telescopia</p>
                                        <p>Feixe de molas</p>
                                        <p>Duplo "A"</p>
                                        <p>Multiplink</p>
                                        <p>Suspensão a ar</p>
                                        <p>Suspensão de rosca</p>
                                        <p>Suspensão Hidropneumática</p>
                                    </div>
                                </span>

                            </div>
                            <div className='linha-aside'><hr/></div>

                            <h2>Marcas</h2> 
                            <div className='selecao'>
                                <span className='subtopico-selecao' style={openCarro ? null : carroStyle}>
                                    <div>
                                        <p>Bosch</p>
                                        <p>Exedy</p>
                                        <p>Ferodo</p>
                                        <p>GSP</p>
                                        <p>Fremax</p>

                                        <p>KeN</p>
                                        <p>KYB</p>
                                        <p>Mann Filter</p>
                                        <p>Monroe</p>
                                        <p>NGK</p>

                                        <p>Pierburg</p>
                                        <p>Textar</p>
                                        
                                    </div>
                                </span>
                            </div>
                            <div className='linha-aside'><hr/></div>

                            <h2>Fornecedores</h2> 
                            <div className='selecao'>
                                <div className='topico-selecao'>
                                    <p>Amortecedores</p>
                                    <img src='../assets/icon/seta-baixo.png'/>
                                </div>

                                <div className='topico-selecao'>
                                    <p>Frios</p>
                                    <img src='../assets/icon/seta-baixo.png'/>
                                </div>
                                
                                <div className='topico-selecao'>
                                    <p>Direção</p>
                                    <img src='../assets/icon/seta-baixo.png'/>
                                </div>

                                <div className='topico-selecao'>
                                    <p>Motor</p>
                                    <img src='../assets/icon/seta-baixo.png'/>
                                </div>

                                <div className='topico-selecao'>
                                    <p>Embreagem</p>
                                    <img src='../assets/icon/seta-baixo.png'/>
                                </div>

                                <div className='topico-selecao'>
                                    <p>Suspensão</p>
                                    <img src='../assets/icon/seta-baixo.png'/>
                                </div>
                            </div>
                            <div className='linha-aside'><hr/></div>

                            <h2>Tipo de carro</h2> 
                            <div className='selecao'>
                                <div className='topico-selecao'>
                                    <p>Carro</p>

                                    <div onClick={() => setOpenCarro(!openCarro)}>{openCarro ? <img src='../assets/icon/seta-cima.png'/> : <img src='../assets/icon/seta-baixo.png'/>}</div> 
                                </div>

                                <span className='subtopico-selecao' style={openCarro ? null : carroStyle}>
                                    <div>
                                        <p>Amarok</p>
                                        <p>Argo</p>
                                        <p>Azera</p>
                                        <p>Astra</p>
                                        <p>Aircross</p>

                                        <p>Blazer</p>
                                        <p>Boxer</p>
                                        <p>Boxter</p>
                                        <p>Bravo</p>
                                        <p>Boxer</p>

                                        <p>Celta</p>
                                        <p>Corolla</p>
                                        <p>Corsa</p>
                                        <p>Civic</p>
                                        <p>City</p>

                                        <p>Defender</p>
                                        <p>Discovery</p>
                                        <p>Dobló</p>
                                        <p>Duster</p>
                                        <p>Durango</p>

                                        <p>EcoSport</p>
                                        <p>Edge</p>
                                        <p>Equinox</p>
                                        <p>Etios</p>
                                        <p>Elantra</p>

                                        <p>Fiat Mobi</p>
                                        <p>Fiat Toro</p>
                                        <p>Fiesta</p>
                                        <p>Fiorino</p>
                                        <p>Focus</p>
                                    </div>
                                </span>

                                <div className='topico-selecao'>
                                    <p>Moto</p>
                                    <img src='../assets/icon/seta-baixo.png'/>
                                </div>

                                <div className='topico-selecao'>
                                    <p>Caminhão</p>
                                    <img src='../assets/icon/seta-baixo.png'/>
                                </div>
                                
                            </div>
                        </div>
                    </aside>

                    <article>
                        <div className='lista-produtos'>
                            <div className='nome-area'>
                                Amortecedores
                            </div>

                            <div className='produtos-agrupamento'>
                                {listarItens.map(item => 
                                    <div onClick={() => setOpenProduto(true)} className='produto'>
                                        <div className='produto-nome'>{item.nome}, {item.marca}, {item.modelo}</div>

                                        <div className='produto-valor'><span className='cifrao'>R$</span> <span className='valor'>{item.valor}</span>
                                        </div>

                                        <div className='btn-saibaMais'>
                                            <button onClick={BuscarPorId}>Saiba mais</button>
                                        </div>

                                        {/* .toLocaleString('pt-br', {minimumFractionDigits: 2}) */}
                                    </div>

                                )}
                                
                            </div>

                            <div className='ver-mais'>
                                <button onClick={() => setOpenVermais(!openVermais)}>{openVermais ? 'Ver menos' : 'Ver mais'}</button>
                            </div>

                            <div className='linha-produto'><hr/></div>
                        
                        </div>

                        <div className='lista-produto'>
                            <div className='nome-area'>
                                Freios
                            </div>

                            <div className='produtos-agrupamento'>
                                <div onClick={() => setOpenProduto(true)} className='produto'>1</div>
                                <div onClick={() => setOpenProduto(true)}  className='produto'>2</div>
                                <div onClick={() => setOpenProduto(true)} className='produto'>3</div>
                                <div onClick={() => setOpenProduto(true)} className='produto'>4</div>
                                <div onClick={() => setOpenProduto(true)} className='produto'>5</div>
                                <div onClick={() => setOpenProduto(true)}  className='produto'>6</div>
                                <div onClick={() => setOpenProduto(true)} className='produto'>7</div>
                                <div onClick={() => setOpenProduto(true)}  className='produto'>8</div>
                                <div onClick={() => setOpenProduto(true)} className='produto'>9</div>
                                <div onClick={() => setOpenProduto(true)} className='produto'>10</div>
                                <div onClick={() => setOpenProduto(true)} className='produto'>11</div>
                                <div onClick={() => setOpenProduto(true)} className='produto'>12</div>
                                <span style={openVermais2 ? null : vermaisStyle}>
                                    <div onClick={() => setOpenProduto(true)} className='produto'>13</div>
                                    <div onClick={() => setOpenProduto(true)} className='produto'>14</div>
                                    <div onClick={() => setOpenProduto(true)} className='produto'>15</div>
                                    <div onClick={() => setOpenProduto(true)} className='produto'>16</div>
                                    <div onClick={() => setOpenProduto(true)} className='produto'>17</div>
                                    <div onClick={() => setOpenProduto(true)} className='produto'>18</div>
                                    <div onClick={() => setOpenProduto(true)} className='produto'>19</div>
                                    <div onClick={() => setOpenProduto(true)} className='produto'>20</div>
                                </span>
                            </div>

                            <div>
                                <Produto isopenProduto = {openProduto}
                                        setOpenProduto = {setOpenProduto}/>
                            </div>

                            <div className='ver-mais'>
                                <button onClick={() => setOpenVermais2(!openVermais2)}>{openVermais2 ? 'Ver menos' : 'Ver mais'}</button>
                            </div>

                            <div className='linha-produto'><hr/></div>
                        </div>
                    </article>
                </section>
  
            </main>

            <div>
                <Footer/>
            </div>
        </div>
    );
}