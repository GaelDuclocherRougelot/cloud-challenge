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
//import { UseAuthContext } from '../../hooks/UseAuthContext';

const Home = () => {
  const [challengeList, setChallengeList] = useState([])
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    fetchData()
  }, [searchInput])

  const fetchData = async () => {
    try {
      const q = query(
        collection(db, 'challenges'),
        orderBy('createdAt', 'desc'),
        limit(3)
      )

      onSnapshot(q, (querySnapshot) => {
        let items = []
        querySnapshot.forEach((doc) => {
          items.push({ key: doc.id, ...doc.data() })
        })
        setChallengeList(items)
      })
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error)
    }
  }
  const filteredChallengeList = challengeList.filter((challenge) =>
    challenge.title.toLowerCase().includes(searchInput.toLowerCase())
  )

  const showNext = ({ item }) => {
    if (challengeList.length < 2) {
      console.log('MAX PAGE')
    } else {
      const fetchNextData = async () => {
        const q = query(
          collection(db, 'challenges'),
          orderBy('createdAt', 'desc'),
          limit(3),
          startAfter(item.createdAt)
        )

        onSnapshot(q, (querySnapshot) => {
          let items = []
          querySnapshot.forEach((doc) => {
            items.push({ key: doc.id, ...doc.data() })
          })
          console.log('data ====> ', items)
          if (items.length === 0) {
            fetchData()
            setPage(1)
          } else {
            setChallengeList(items)
            setPage(page + 1)
          }
        })
      }
      fetchNextData()
    }
  }

  const showPrevious = ({ item }) => {
    if (page === 1) {
      return // Do nothing if it's already the first page
    }

    const fetchPreviousData = async () => {
      const q = query(
        collection(db, 'challenges'),
        orderBy('createdAt', 'desc'),
        endBefore(item.createdAt),
        limitToLast(3)
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
        <ChallengeCards challengeList={filteredChallengeList} />
        <div className="flex self-end gap-6 items-center">
          <p>page: {page}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => showPrevious({ item: challengeList[0] })}
              className={`${page === 1 ? '' : ' border-black'} border p-2`}
            >
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.0234 7.74497L3.44866 7.74497L7.7148 13.6013H5.92279L0.974998 7.0131L5.92279 0.399302H7.7148L3.44866 6.25565L19.0234 6.25565V7.74497Z"
                  fill="#120F3C"
                />
              </svg>
            </button>
            <button
              className={`${challengeList.length < 3 ? '' : ' border-black'} border p-2`}
              onClick={() => {
                showNext({ item: challengeList[challengeList.length - 1] })
              }}
            >
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.976562 6.25577H16.5513L12.2852 0.399414H14.0772L19.025 6.98763L14.0772 13.6014H12.2852L16.5513 7.74508H0.976562V6.25577Z"
                  fill="#120F3C"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
