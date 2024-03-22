import { UseAuthContext } from '../../../hooks/UseAuthContext'

export default function header() {
  const { currentUser } = UseAuthContext()
  console.log(currentUser)
  return (
    <header className="size-full">
      <div className="flex pb-5">
        <h1 className="text-3xl font-semibold">
          Bonjour, {currentUser.firstName}
        </h1>
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
    </header>
  )
}
