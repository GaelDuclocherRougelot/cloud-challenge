/* eslint-disable react/prop-types */
import ChallengeCard from './ChallengeCard'

export default function ChallengeCards({ challengeList }) {
  return (
    <section className="size-full flex flex-col gap-6">
      {challengeList.length > 0 ? (
        challengeList.map((challenge, index) => (
          <ChallengeCard key={index} challenge={challenge} />
        ))
      ) : (
        <p>Chargement des challenges...</p>
      )}
    </section>
  )
}
