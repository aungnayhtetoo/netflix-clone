import { useState, useEffect } from 'react'
import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Movie } from '../typing'

function useLike(uid: string) {
  const [liked, setLiked] = useState<Movie[] | DocumentData>()

  useEffect(() => {
    if (!uid) return

    return onSnapshot(
      collection(db, 'customers', uid, 'myLiked'),
      (snapshot) => {
        setLiked(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      }
    )
  }, [db, uid])

  return liked
}

export default useLike
