import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import AuthRequests from '../../fetch/AuthRequests';

function Navegacao() {
    const estiloNavbar = {
        backgroundColor: 'var(--primaryColor)',
    }

    const estiloNavOptions = {
        color: 'var(--fontColor)',
    }

    const handleLogout = async () => {
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
                    <Navbar.Brand href="/" style={estiloNavOptions}>Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/pessoas" style={estiloNavOptions}>Pessoas</Nav.Link>
                    </Nav>
                    {AuthRequests.checkTokenExpiry() ? (
                        <Button variant='light' onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button href='/login' variant='light'>Login</Button>
                    )}
                </Container>
            </Navbar>
        </>
    );
}

export default Navegacao;