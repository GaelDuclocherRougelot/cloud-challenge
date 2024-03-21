import React from 'react';

function formatCreatedAt(createdAt) {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);

  const timeDifference = currentDate.getTime() - createdDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const weeksDifference = Math.floor(daysDifference / 7);
  const monthsDifference = Math.floor(daysDifference / 30);
  const yearsDifference = Math.floor(daysDifference / 365);

  if (yearsDifference > 0) {
    return `créé par il y a ${yearsDifference} an${yearsDifference > 1 ? 's' : ''}`;
  } else if (monthsDifference > 0) {
    return `créé il y a ${monthsDifference} mois`;
  } else if (weeksDifference > 0) {
    return `créé il y a ${weeksDifference} semaine${weeksDifference > 1 ? 's' : ''}`;
  } else if (daysDifference > 0) {
    return `créé il y a ${daysDifference} jour${daysDifference > 1 ? 's' : ''}`;
  } else if (hoursDifference > 0) {
    return `créé il y a ${hoursDifference} heure${hoursDifference > 1 ? 's' : ''}`;
  } else if (minutesDifference > 0) {
    return `créé il y a ${minutesDifference} minute${minutesDifference > 1 ? 's' : ''}`;
  } else {
    return `créé il y a quelques instants`;
  }
}

export const CorrectCard = ({solution}) => {

  return (
      <div className='flex flex-col gap-10 p-10 size-full'>
        <div className="flex flex-col rounded-lg border border-border_card w-full p-6 gap-6 ">
          <div className="flex items-center gap-4">
            {/* <img src="#" alt="profile picture" /> */}
            <div className="flex flex-col">
              <p className="text-sm">{solution.createdBy.lastName} {solution.createdBy.firstName } - Niveau {solution.level} </p>
              <p>Challenge crée par {solution.challengeData.createdBy.lastName} {solution.challengeData.createdBy.firstName} </p>
              <p className="text-xs">{formatCreatedAt(solution.createdAt)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-hidden">
            <p className="text-2xl"></p>
            <p className="text-sm line-clamp-3 text-ellipsis">

            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg">Lien Github: {solution.githubLink}</p>
            <a href="#" className="text-sm">

            </a>
          </div>
          <div className="flex justify-between gap-2 items-center">
            <div className="flex flex-col gap-2 flex-wrap">
              <p className="text-lg">Catégories: </p>
              <div className="flex gap-2">
                    <span className="rounded-md bg-bl_active text-white w-fit px-4 py-[3px] text-xs">
                      {solution.challengeData.category}
                    </span>{' '}
              </div>
            </div>
            <button className="w-fit h-fit self-end border border-btn_green text-sm text-btn_green px-4 py-3 rounded-md hover:bg-btn_green hover:text-white transition-colors duration-300 ease-in-out">
              Soumettre ma réponse
          </button>
          </div>
        </div>
      </div>
  );
};