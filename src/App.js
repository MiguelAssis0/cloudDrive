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

  useEffect(()=>{
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
  },[]);

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
      ) :
        <div className="App__login">
          <div className="login__header">
            <h1>Cloud<span>Drive</span></h1>
            <a href="/" onClick={(e) => { handleLogin(e) }}>Entrar</a>
          </div>

          <div className="login__body">
            <div className="body__init"><a href="/" onClick={(e) => { handleLogin(e) }}>Começar Agora</a></div>
          </div>
          <div className="login__footer">
            <p>© 2024 Cloud Drive. Todos os direitos reservados.</p>
            <p>Este é um projeto feito para estudos, apenas para testar as funcionalidades. Não use este projeto para arquivos pessoais.</p>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
