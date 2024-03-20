import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom/dist'

const nav_links = [
  {
    title: 'Accueil',
    slug: '/home',
  },
  {
    title: 'Créer un challenge',
    slug: '/create-challenge',
  },
  {
    title: 'Corriger des challenges',
    slug: '/correct-challenges',
  },
  {
    title: 'Mon Profil',
    slug: '/my-profil',
  },
  {
    title: 'Contribution',
    slug: '/contribution',
  },
]

export default function Navbar() {
  const location = useLocation()
  return (
    <nav className="flex bg-white fixed flex-col w-[240px] h-[100vh]  left-0 top-0 rounded-e-xl shadow-md border-r border-y p-4">
      <ul className="flex flex-col gap-6">
        {nav_links.length > 0 &&
          nav_links.map((link, index) => (
            <Link
              to={link.slug}
              className={`${location.pathname === link.slug ? 'bg-bleue text-white' : ''} p-3  rounded-md`}
              key={index}
            >
              <li>{link.title}</li>
            </Link>
          ))}

        <button className="bg-blue-300 text-white p-3 rounded-md">
          Déconnexion
        </button>
      </ul>
    </nav>
  )
}
