/* eslint-disable react/prop-types */
import ChallengeCard from './ChallengeCard'

export default function ChallengeCards({ challenges }) {
  return (
    <section className="size-full flex flex-col gap-6">
      {challenges.length > 0 ? (
        challenges.map((challenge, index) => (
          <ChallengeCard key={index} challenge={challenge} />
        ))
      ) : (
        <p>Chargement des challenges...</p>
      )}
    </section>
  )
}
