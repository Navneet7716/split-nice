import axios from "axios"
import { atom } from "jotai"
import { loadable } from "jotai/utils"


const isAuthAtom = atom<Promise<boolean>>(async (_get) => {
    const res = await axios.get("/api/is-logged-in")
    return res.data.isAuth 
})

export const loadableIsAuthAtom = loadable(isAuthAtom)