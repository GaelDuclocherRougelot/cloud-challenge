import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import {auth} from "../../utils/firebase_init.js";
import {getCreatedChallenges} from "../../api/challenge.js";
import ChallengeCard from "../../components/ChallengeCards/ChallengeCard.jsx";


export default function Profil() {
  const [activeTab, setActiveTab] = useState('created');
  const [createdChallenges, setCreatedChallenges] = useState([]);
  const user = auth.currentUser

  useEffect(() => {
    const fetchCreatedChallenges = async () => {
      try {

        const challenges = await getCreatedChallenges(user.uid);
        setCreatedChallenges(challenges);
      } catch (error) {
        console.error('Erreur lors de la récupération des challenges créés :', error);
      }
    };

    fetchCreatedChallenges();
  }, [activeTab]);
  return (
      <div className='flex flex-col gap-10 pl-[270px] p-10 size-full'>
        <Navbar />
        <div className="flex justify-around">
          <button
              className={`px-4 py-2 rounded-md ${activeTab === 'created' ? 'bg-blue-500 text-white' : 'text-blue-500 border border-blue-500'}`}
              onClick={() => setActiveTab('created')}
          >
            Challenges Créés
          </button>
        </div>
        <div className="mt-8">
          {activeTab === 'created' && (
              <div className='flex flex-wrap justify-center items-center w-full gap-4'>
                {createdChallenges.map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} isProfilePage={true}/>
                ))}
              </div>
          )}
          {/* Ajouter d'autres cas pour les onglets restants */}
        </div>
      </div>
  );
}