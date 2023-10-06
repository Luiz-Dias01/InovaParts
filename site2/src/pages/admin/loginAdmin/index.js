import './index.scss';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';


export default function Admin () {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function entraClick() {
        try {
            const resposta = await axios.post('http://localhost:5000/adm/login', {
                email: email,
                senha: senha
            });
    
            navigate('/configAdm');

        } catch (err) {
            toast.error('Conta Inválida')
        }
    }

    return (
        <div id='pagina-admin'>
            <header>

            </header>

            <div id='container'>
                <main>
                    <div id='enunciado'>
                        Login
                    </div>

                    <form>
                        <div className='caixa-senha'>
                            <label>Digite seu Email</label>
                            <input type='text' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>

                        <div className='caixa-senha'>
                            <label>Digite sua Senha</label>
                            <input type='password' placeholder='Senha' value={senha} onChange={e => setSenha(e.target.value)}/>
                        </div>

                        <div id='senha'>
                            Esqueceu a senha?
                        </div>
                    </form>

                    <div id='btn-entrar'>
                        <button onClick={entraClick}>Entrar</button>
                    </div>

                    <div id ='nav-cadastro'>
                        <p>Não possui cadastro? <Link to='/cadastroCliente'><span>Cadastre-se</span></Link></p>
                    </div>
                </main>
                <div><ToastContainer /></div>
            </div>
        </div>
    );
}
