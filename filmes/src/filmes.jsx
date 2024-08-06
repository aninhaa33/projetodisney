import  './filme.css'

// App.js
import React, { useState, useEffect } from 'react';
import { fetchFilmes } from './services/api';
import Animacao from './Componentes/animacao';
import LiveAction from './Componentes/liveaction';
import Premiados from './Componentes/premiados';
import CardFilme from './Componentes/cardfilmes';
import CardPremiados from './Componentes/cardPremiados';
const App = () => {
  const [animacoes, setAnimacoes] = useState([]);
  const [liveAction, setLiveAction] = useState([]);
  const [premiados, setPremiados] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('premiados'); // Estado para controlar a categoria ativa

  useEffect(() => {
    const carregaFilmes = async () => {
      try {
        const dadosFilmes = await fetchFilmes();
        setAnimacoes(dadosFilmes.Animacoes);
        setLiveAction(dadosFilmes.LiveAction);
        setPremiados(dadosFilmes.GanhadoresdoOscar);
      } catch (error) {
        console.error('Erro ao buscar filmes: ', error);
      }
    };

    carregaFilmes();
  }, []);

  // Função para alternar a categoria ativa
  const selecionaCategoria = (categoria) => {
    setCategoriaAtiva(categoria);
  };

  // Renderização condicional dos componentes de filmes com base na categoria ativa
  let conteudoFilmes;
  if (categoriaAtiva === 'premiados') {
    conteudoFilmes = <Premiados premiados={premiados} />;
  } else if (categoriaAtiva === 'liveAction') {
    conteudoFilmes = <LiveAction liveAction={liveAction} />;
  } else if (categoriaAtiva === 'animacoes') {
    conteudoFilmes = <Animacao animacoes={animacoes} />;
  }

  return (
    <div className="app-container">
      <h1 className="main-title">Lista de Filmes</h1>
      {/* Menu de navegação */}
      <div className="menu">
        <div className={`card ${categoriaAtiva === 'premiados' ? 'active' : ''}`} onClick={() => selecionaCategoria('premiados')}>
          Premiados pelo Oscar
        </div>
        <div className={`card ${categoriaAtiva === 'liveAction' ? 'active' : ''}`} onClick={() => selecionaCategoria('liveAction')}>
          Live Action
        </div>
        <div className={`card ${categoriaAtiva === 'animacoes' ? 'active' : ''}`} onClick={() => selecionaCategoria('animacoes')}>
          Animações
        </div>
      </div>
      <img src="logo.png" alt="Descrição da imagem" className="background-image" />
      {/* Renderiza os filmes com base na categoria ativa */}
      {conteudoFilmes}
    </div>
  );
};

export default App;