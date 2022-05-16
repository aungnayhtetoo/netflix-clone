import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import toast, { Toaster } from 'react-hot-toast'
import { modalState, movieState } from '../atoms/modalAtom'
import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from '@heroicons/react/outline'

import { ThumbUpIcon as ThumbUpSolid } from '@heroicons/react/solid'
import { Element, Genre, Movie } from '../typing'
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from 'react-icons/fa'
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import useAuth from '../hooks/useAuth'

function Modal() {
  // Returns a tuple instead of a value
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([])
  const [likedMovies, setLikedMovies] = useState<DocumentData[] | Movie[]>([])
  const [trailer, setTrailer] = useState('')
  const [muted, setMuted] = useState(false)
  const [genres, setGenres] = useState<Genre[]>([])

  const [addedToList, setAddedToList] = useState(false)
  const [addedToLiked, setAddedToLiked] = useState(false)

  const { user } = useAuth()

  const toastStyle = {
    background: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '15px',
    borderRadius: '9999px',
    maxWidth: '1000px',
  }

  useEffect(() => {
    if (!movie) return

    const fetchMovie = async () => {
      // gives back the movie or video
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message))

      if (data?.videos) {
        const index = data.videos.results.findIndex((element: Element) => {
          return element.type === 'Trailer'
        })
        // console.log('Index',index)
        setTrailer(data.videos.results[index]?.key)
      }

      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])

  // console.log(trailer, genres)

  const handleClose = () => {
    setShowModal(false)
    setMovie(null)
  }

  const handleLike = async () => {
    if (addedToLiked) {
      await deleteDoc(
        doc(db, 'customers', user!.uid, 'myLiked', movie?.id.toString()!)
      )
      toast(`${movie?.title || movie?.original_title} has been Unliked`, {
        icon: '👎',
        duration: 5000,
        style: toastStyle,
      })
    } else {
      await setDoc(
        doc(db, 'customers', user!.uid, 'myLiked', movie?.id.toString()!),
        {
          ...movie,
        }
      )
      toast(`${movie?.title || movie?.original_title} has been Liked.`, {
        icon: '👍',
        duration: 5000,
        style: toastStyle,
      })
    }
  }

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!)
      )

      toast(
        `${
          movie?.title || movie?.original_title
        } has been removed from My List`,
        {
          duration: 5000,
          style: toastStyle,
        }
      )
    } else {
      await setDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!),
        {
          ...movie,
        }
      )

      toast(
        `${movie?.title || movie?.original_title} has been added to My List.`,
        {
          duration: 5000,
          style: toastStyle,
        }
      )
    }
  }

  useEffect(() => {
    // getting all the movie currently in the myLiked of the user
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myLiked'),
        (snapshot) => setLikedMovies(snapshot.docs)
      )
    }
  }, [db, movie?.id])

  useEffect(() => {
    // getting all the movie currently in the myList of the user
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myList'),
        (snapshot) => setMovies(snapshot.docs)
      )
    }
  }, [db, movie?.id])

  useEffect(() => {
    // console.log(movies.findIndex(result => result.data().id === movie?.id) !== -1)

    // Toggle list button and set false if not found.
    setAddedToList(
      movies.findIndex((result) => result.data().id === movie?.id) !== -1
    )
  }, [movies])

  useEffect(() => {
    // Toggle like button and set false if not found.
    setAddedToLiked(
      likedMovies.findIndex((result) => result.data().id === movie?.id) !== -1
    )
  }, [likedMovies])

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 
    mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <Toaster position="bottom-center" />
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <>
            <ReactPlayer
              playing
              muted={muted}
              url={`https://youtu.be/${trailer}`}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', right: '0' }}
            />
          </>

          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button
                className="flex items-center gap-x-2 rounded bg-white px-8 text-xl
              font-bold text-black transition hover:bg-[#e6e6e6]"
              >
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>

              <button className="modalButton">
                {addedToList ? (
                  <CheckIcon className="h-7 w-7" onClick={handleList} />
                ) : (
                  <PlusIcon className="h-7 w-7" onClick={handleList} />
                )}
              </button>
              <button className="modalButton">
                {addedToLiked ? (
                  <ThumbUpSolid className="h-7 w-7" onClick={handleLike} />
                ) : (
                  <ThumbUpIcon className="h-7 w-7" onClick={handleLike} />
                )}
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {!muted ? (
                <VolumeUpIcon className="h-6 w-6" />
              ) : (
                <VolumeOffIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>
                <div>
                  <span className="text-[gray]">Original lanaguage: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal
