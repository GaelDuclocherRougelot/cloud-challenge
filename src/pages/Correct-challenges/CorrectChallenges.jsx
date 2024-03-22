import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { UseAuthContext } from '../../hooks/UseAuthContext.jsx'
import { getAllSolutions } from '../../api/solution.js'
import { CorrectCard } from './component/CorrectCard.jsx'

export default function CorrectChallenges() {
  const { currentUser } = UseAuthContext()
  const [solutions, setSolutions] = useState([])

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const solutionsData = await getAllSolutions()
        setSolutions(solutionsData)
      } catch (error) {
        console.error('Erreur lors de la récupération des solutions :', error)
      }
    }

    fetchSolutions()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-10 size-full">
        <h1 className="text-3xl font-semibold">Correction</h1>
        {solutions.length > 0 ? (
          solutions.map((solution, index) => (
            <CorrectCard key={index} solution={solution} />
          ))
        ) : (
          <p>Aucune solutions soumise</p>
        )}
      </div>
    </>
  )
}
