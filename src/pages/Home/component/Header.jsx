export default function header() {
  return (
    <header className="size-full py-3">
      <div className="flex pb-5">
        <h1 className="text-3xl font-semibold">Accueil</h1>
      </div>
      <div className="flex justify-between pb-10">
        <ul className="">
          Top 3 de la semaine
          <li>John Doe</li>
          <li>John Doe</li>
          <li>John Doe</li>
        </ul>
        <p className="text-lg">
          Challenges réalisés cette semaine <br />
          <span className="text-3xl font-semibold">12</span>
        </p>
      </div>
      <input
        className="px-5 py-1 border"
        type="text"
        placeholder="Chercher un challenge..."
      />
    </header>
  )
}
