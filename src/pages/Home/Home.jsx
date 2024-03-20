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

const Home = () => {
  const [challengeList, setChallengeList] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'challenges'), limit(2))

      onSnapshot(q, (querySnapshot) => {
        let items = []
        querySnapshot.forEach((doc) => {
          items.push({ key: doc.id, ...doc.data() })
        })
        setChallengeList(items)
      })
    }
    fetchData()
  }, [])

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

  return (
    <div className="flex size-full">
      <Navbar />
      <main className="flex flex-col gap-10 pl-[270px] p-10 size-full">
        <Header />
        <ChallengeCards challengeList={challengeList} />
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
