// components/Premiados.js
import React from 'react';
import CardPremiados from './cardPremiados'

const Premiados = ({ premiados }) => {
  return (
    <div>
      <h2 className="titulo-categoria">Premiados pelo Oscar</h2>
      {premiados.map((filme, index) => (
      <CardPremiados key={index} filme={filme} />
      ))}
    </div>
  );
};

export default Premiados;
