import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import AuthRequests from '../../fetch/AuthRequests';
import { useState, useEffect } from 'react';

function Navegacao() {
    // Estado para controlar se o usuário está logado ou não
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(''); // Estado para armazenar o nome do usuário

    /**
    * Verifica a autenticação do usuário
    */
    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth');  // recupera o valor de autenticação do localStorage
        const token = localStorage.getItem('token');  // recupera o token do localStorage
        const storedUsername = localStorage.getItem('username');  // recupera o nome do usuário do localStorage
        if (isAuth && token && AuthRequests.checkTokenExpiry()) {  // verifica se isAuth é true, verifica se o token existe e verifica se o token é válido
            setIsAuthenticated(true);  // caso o token seja válido, seta o valor de autenticação para true
            setUsername(storedUsername);  // define o nome do usuário logado
        } else {
            setIsAuthenticated(false);  // caso o token seja inválido, seta o valor de autenticação para false
        }
    }, []);

    const estiloNavbar = {
        backgroundColor: 'var(--primaryColor)',
    }

    const estiloNavOptions = {
        color: 'var(--fontColor)',
    }

    const logout = async () => {
        try {
            AuthRequests.removeToken();
            window.location.href = '/';
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }
    return (
        <>
            <Navbar style={estiloNavbar}>
                <Container>
                    {/* a opção Home é renderizada para todos os usuários, independente de estarem autenticados ou não */}
                    <Navbar.Brand href="/" style={estiloNavOptions}>Home</Navbar.Brand>
                    {isAuthenticated ? ( // verifica se o usuário está autenticado (true)
                        // renderiza as opções de navegação para usuário autenticado
                        <>
                            <Nav className="me-auto">
                                <Nav.Link href="/pessoas" style={estiloNavOptions}>Pessoas</Nav.Link>
                            </Nav>
                            <span>Olá,{username}!</span>
                            <Button variant='light' onClick={logout}>Sair</Button>
                        </>
                    ) : (
                        // renderiza as opções de navegação para usuário não autenticado
                        <Button href='/login' variant='light'>Login</Button>
                    )}
                </Container>
            </Navbar>
        </>
    );
}

export default Navegacao;
