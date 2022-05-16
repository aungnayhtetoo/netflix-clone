import { collection, DocumentData, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../lib/firebase"
import { Movie } from "../typing"

function useList(uid: string | undefined) {
    const [list, setList] = useState<Movie[] | DocumentData[]>([])

    useEffect(() => {
        // adding movie list for every single customer using the user's uid
        if(!uid) return

        // get all the document inside myList for a specific uid
        return onSnapshot(collection(db, "customers", uid, "myList"), (snapshot) => {
            setList(snapshot.docs.map(doc => ({
                // merging the id with the data array
                id: doc.id,
                ...doc.data()
            })))
        })

    }, [db, uid])

  return list
}

export default useList
