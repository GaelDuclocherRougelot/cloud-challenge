/* eslint-disable react/prop-types */
import { useState } from 'react'
import { createSolution } from '../../api/solution.js'
import { UseAuthContext } from '../../hooks/UseAuthContext.jsx'
import { auth } from '../../utils/firebase_init.js'
function formatCreatedAt(createdAt) {
  const currentDate = new Date()
  const createdDate = new Date(createdAt)

  const timeDifference = currentDate.getTime() - createdDate.getTime()
  const secondsDifference = Math.floor(timeDifference / 1000)
  const minutesDifference = Math.floor(secondsDifference / 60)
  const hoursDifference = Math.floor(minutesDifference / 60)
  const daysDifference = Math.floor(hoursDifference / 24)
  const weeksDifference = Math.floor(daysDifference / 7)
  const monthsDifference = Math.floor(daysDifference / 30)
  const yearsDifference = Math.floor(daysDifference / 365)

  if (yearsDifference > 0) {
    return `créé il y a ${yearsDifference} an${yearsDifference > 1 ? 's' : ''}`
  } else if (monthsDifference > 0) {
    return `créé il y a ${monthsDifference} mois`
  } else if (weeksDifference > 0) {
    return `créé il y a ${weeksDifference} semaine${weeksDifference > 1 ? 's' : ''}`
  } else if (daysDifference > 0) {
    return `créé il y a ${daysDifference} jour${daysDifference > 1 ? 's' : ''}`
  } else if (hoursDifference > 0) {
    return `créé il y a ${hoursDifference} heure${hoursDifference > 1 ? 's' : ''}`
  } else if (minutesDifference > 0) {
    return `créé il y a ${minutesDifference} minute${minutesDifference > 1 ? 's' : ''}`
  } else {
    return `créé il y a quelques instants`
  }
}

export default function ChallengeCard({ challenge }) {
  const [showPopup, setShowPopup] = useState(false)
  const [githubLink, setGithubLink] = useState('')
  const { currentUser } = UseAuthContext()
  const user = auth.currentUser

  const togglePopup = () => {
    if (challenge.createdBy.uid === user.uid) {
      return
    }
    setShowPopup(!showPopup)
  }

  const handleGithubLinkChange = (e) => {
    setGithubLink(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await createSolution(challenge, githubLink, currentUser)
    setShowPopup(false)
    setGithubLink('')
  }
  return (
    <>
      <div className="flex flex-col rounded-lg border border-border_card w-full p-6 gap-6">
        <div className="flex items-center gap-4">
          {/* <img src="#" alt="profile picture" /> */}
          <div className="flex flex-col">
            <p className="text-md">
              {challenge.createdBy.firstName} {challenge.createdBy.lastName} -
              Niveau {challenge.level}
            </p>
            <p className="text-xs">{formatCreatedAt(challenge.createdAt)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 overflow-hidden">
          <p className="text-2xl">{challenge.title}</p>
          <p className="text-sm line-clamp-3 text-ellipsis">
            {challenge.description}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg">Lien Github:</p>
          <a href="#" className="text-sm">
            {challenge.githubLink}
          </a>
        </div>
        <div className="flex justify-between gap-2 items-center">
          <div className="flex flex-col gap-2 flex-wrap">
            <p className="text-lg">Catégories:</p>
            <div className="flex gap-2">
              <span className="rounded-md bg-bl_active text-white w-fit px-4 py-[3px] text-xs">
                {challenge.category}
              </span>{' '}
            </div>
          </div>
          <button
            onClick={togglePopup}
            className={`${challenge.createdBy.uid === user.uid ? 'border-gray-300 text-gray-300' : 'text-btn_green border-btn_green hover:bg-btn_green hover:text-white '} w-fit h-fit self-end border text-sm  px-4 py-3 rounded-md  transition-colors duration-300 ease-in-out`}
          >
            Soumettre ma réponse
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl mb-4">Votre réponse</h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-[40vw]"
            >
              <div className="flex flex-col">
                <label htmlFor="githubLink" className="text-lg">
                  Lien Github :
                </label>
                <input
                  type="text"
                  id="githubLink"
                  name="githubLink"
                  value={githubLink}
                  onChange={handleGithubLinkChange}
                  className="border rounded p-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePopup}
                  className="border text-gray-800 py-2 px-4 rounded"
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 my-4 text-white font-semibold py-2 px-4 rounded"
                >
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
