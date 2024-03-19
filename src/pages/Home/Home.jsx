import React from 'react';

const Home = () => {
  return (
    <header>
      <div className='flex bg-red-500'>
        <h1>Accueil</h1>
      </div>
      <div className='flex'>
      <td>
        Top 3 de la semaine
      <tr>
          John doe
      </tr>
      <tr>
          John doe
      </tr>
      <tr>
          John doe
      </tr>
      </td>
      <p>Challenge réalisés cette semaine</p>
      <p>12</p>
      </div>
      <input type="text" placeholder='Chercher un challenge...' />
    </header>
      

      // faire une boucle .map pour afficher les challenges
  );
};

export default Home;