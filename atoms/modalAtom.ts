// An atom represents a piece of state. Atoms can be read from and written to from any component.

import { atom } from "recoil";
import { Movie } from "../typing";
import { DocumentData } from "firebase/firestore";

export const modalState = atom({
    key: 'modalState',
    default: false
})

export const movieState = atom<Movie | DocumentData | null>({
    key: 'movieState',
    default: null
})