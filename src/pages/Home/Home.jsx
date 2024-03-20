import { collection, limit, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import ChallengeCards from '../../components/ChallengeCards/ChallengeCards'
import Navbar from '../../components/Navbar/Navbar'
import { db } from '../../utils/firebase_init'
import Header from './component/Header'

const Home = () => {
  const [challengeList, setChallengeList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'challenges'), limit(10))

      onSnapshot(q, (querySnapshot) => {
        let items = []
        querySnapshot.forEach((doc) => {
          items.push(doc.data())
        })
        setChallengeList(items)
      })
    }
    fetchData()
  }, [])

  return (
    <div className="flex size-full">
      <Navbar />
      <main className="flex flex-col pl-[270px] p-10 size-full">
        <Header />
        <ChallengeCards challengeList={challengeList} />
      </main>
    </div>
  )
}

export default Home
