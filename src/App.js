import { useEffect, useState } from 'react';

import Home from './Pages/Home';
import { auth, provider, signInWithPopup } from './Firebase';
import './public/App.css';
import './public/Home.css';
import './public/AppLogin.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLogin({
          name: user.displayName,
          foto: user.photoURL,
          email: user.email,
          uid: user.uid
        });
      } else {
        setLogin(null);
      }
    })
  }, []);

  function handleLogin(e) {
    e.preventDefault();

    signInWithPopup(auth, provider)
      .then((result) => {
        setLogin(result.user.email);
        window.location.reload();
      }).catch((error) => {
        setLogin(null);
      })
  }

  return (
    <div className="App">
      {login ? (
        <Router>
          <Routes>
            <Route path="/" element={<Home login={login} />} />
          </Routes>
        </Router>
      ) : (
        <div className="App__login">
          <div className="login__header">
            <h1>Cloud<span>Drive</span></h1>
            <a href="/" onClick={(e) => { handleLogin(e) }}>Entrar</a>
          </div>

          <div className="login__body">
            <div className="body__init">
              <a href="/" onClick={(e) => { handleLogin(e) }}>Começar Agora</a>
            </div>

            <div className="body__cntnt">
              <div className="body__content">
                <h2>Bem-vindo ao Cloud Drive!</h2>
                <p>Armazene seus arquivos de forma segura e acessível em qualquer lugar.</p>
                <p>Crie uma conta agora mesmo e comece a usar o Cloud Drive!</p>
              </div>
              {/* Nova Seção: Recursos */}
              <div className="body__features">
                <h2>Recursos Incríveis</h2>
                <div className="features__grid">
                  <div className="feature__card">
                    <h3>🛡️ Segurança Máxima</h3>
                    <p>Criptografia de ponta a ponta para proteger seus arquivos sensíveis com tecnologia AES-256</p>
                  </div>
                  <div className="feature__card">
                    <h3>🌐 Acesso Universal</h3>
                    <p>Acesse seus arquivos de qualquer dispositivo: computador, smartphone ou tablet</p>
                  </div>
                  <div className="feature__card">
                    <h3>🔄 Sincronização Inteligente</h3>
                    <p>Mantenha seus arquivos atualizados automaticamente em todos os seus dispositivos</p>
                  </div>
                </div>
              </div>
              {/* Nova Seção: Planos */}
              <div className="body__pricing">
                <h2>Planos que Cabem no Seu Bolso</h2>
                <div className="pricing__cards">
                  <div className="plan__card">
                    <h3>Grátis</h3>
                    <p className="price">0R$/mês</p>
                    <ul>
                      <li>5GB de armazenamento</li>
                      <li>Uploads até 500MB</li>
                      <li>Acesso básico</li>
                    </ul>
                  </div>
                  <div className="plan__card recommended">
                    <h3>Premium</h3>
                    <p className="price">199.99R$/mês</p>
                    <ul>
                      <li>2TB de armazenamento</li>
                      <li>Uploads ilimitados</li>
                      <li>Prioridade no suporte</li>
                    </ul>
                  </div>
                </div>
              </div>


              {/* Nova Seção: Depoimentos */}
              <div className="body__testimonials">
                <h2>O Que Nossos Usuários Dizem</h2>
                <div className="testimonials__grid">
                  <div className="testimonial__card">
                    <p>"O Cloud Drive revolucionou minha produtividade! Agudo acesso meus arquivos de trabalho de qualquer lugar."</p>
                    <p className="author">- Carlos Silva, Designer</p>
                  </div>
                  <div className="testimonial__card">
                    <p>"A segurança me deixou tranquilo para armazenar meus documentos importantes. Recomendo para todos!"</p>
                    <p className="author">- Ana Souza, Advogada</p>
                  </div>
                </div>
              </div>

              {/* Nova Seção: FAQ */}
              <div className="body__faq">
                <h2>Perguntas Frequentes</h2>
                <div className="faq__item">
                  <h3>Meus arquivos estão realmente seguros?</h3>
                  <p>Sim! Usamos criptografia militar e protocolos de segurança de última geração para proteger seus dados.</p>
                </div>
                <div className="faq__item">
                  <h3>Posso migrar de plano facilmente?</h3>
                  <p>Claro! Você pode alterar seu plano a qualquer momento sem perder seus arquivos ou configurações.</p>
                </div>
                <div className="faq__item">
                  <h3>Há limite de transferência de dados?</h3>
                  <p>Nossos planos Premium possuem transferência ilimitada. O plano grátis tem limite de 10GB/mês.</p>
                </div>
              </div>

            </div>
            <div className="login__footer">
              <p>© 2024 Cloud Drive. Todos os direitos reservados.</p>
              <p>Este é um projeto feito para estudos, apenas para testar as funcionalidades. Não use este projeto para arquivos pessoais.</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}


export default App;
