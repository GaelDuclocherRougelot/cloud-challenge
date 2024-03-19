const Home = () => {
  return (
    <header>
      <div className='flex bg-red-500'>
        <h1>Accueil</h1>
      </div>
      <div className='flex justify-between'>
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
      <p>Challenge réalisés cette semaine <br/><span>12</span></p>
      </div>
      <input type="text" placeholder='Chercher un challenge...' />
    </header>
      

      // faire une boucle .map pour afficher les challenges
  );
};

export default Home;