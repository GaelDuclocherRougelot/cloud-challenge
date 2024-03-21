import {
  collection,
  endBefore,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import ChallengeCards from '../../components/ChallengeCards/ChallengeCards'
import Navbar from '../../components/Navbar/Navbar'
import { db } from '../../utils/firebase_init'
import Header from './component/Header'
import {getAllChallenges} from "../../api/challenge.js";
//import { UseAuthContext } from '../../hooks/UseAuthContext';

const Home = () => {
  const [challengeList, setChallengeList] = useState([])
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('');
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

useEffect(() => {
  fetchData();
}, [searchInput]);

const fetchData = async () => {
  try {
    const q = query(collection(db, 'challenges'), orderBy('createdAt', 'desc'));

    onSnapshot(q, (querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ key: doc.id, ...doc.data() });
      });
      setChallengeList(items);
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
};

  const showNext = ({ item }) => {
    if (challengeList.length === 0) {
      alert('Thats all we have for now !')
    } else {
      const fetchNextData = async () => {
        const q = query(
          collection(db, 'challenges'),
          orderBy('created', 'desc'),
          limit(2),
          startAfter(item.created)
        )

        onSnapshot(q, (querySnapshot) => {
          let items = []
          querySnapshot.forEach((doc) => {
            items.push({ key: doc.id, ...doc.data() })
          })
          setChallengeList(items)
          setPage(page + 1)
        })
      }
      fetchNextData()
    }
  }

  const showPrevious = ({ item }) => {
    const fetchPreviousData = async () => {
      const q = query(
        collection(db, 'challenges'),
        orderBy('created', 'desc'),
        endBefore(item.created),
        limitToLast(2)
      )

      onSnapshot(q, (querySnapshot) => {
        let items = []
        querySnapshot.forEach((doc) => {
          items.push({ key: doc.id, ...doc.data() })
        })
        setChallengeList(items)
        setPage(page - 1)
      })
    }
    fetchPreviousData()
  }

  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesData = await getAllChallenges();
        setChallenges(challengesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des challenges :", error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="flex size-full">
      <Navbar />
      <main className="flex flex-col gap-10 pl-[270px] p-10 size-full">
        <Header />
        <input
          className="px-5 py-1 border"
          type="text"
          placeholder="Chercher un challenge..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
       <ChallengeCards challenges={challenges} />
        <div>
          {
            //show previous button only when we have items
            page === 1 ? (
              ''
            ) : (
              <button onClick={() => showPrevious({ item: challengeList[0] })}>
                Previous
              </button>
            )
          }
          <p>page: {page}</p>
          {
            //show next button only when we have items
            challengeList.length < 2 ? (
              ''
            ) : (
              <button
                onClick={() =>
                  showNext({ item: challengeList[challengeList.length - 1] })
                }
              >
                Next
              </button>
            )
          }
        </div>
      </main>
    </div>
  )
}

export default Home
