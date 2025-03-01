import { atom } from "jotai"
import { loadable } from "jotai/utils"
import { IS_AUTH_ROUTE } from "../utils/urls"
import { apiClient } from "../utils/axios"


const isAuthAtom = atom<Promise<boolean>>(async (_get) => {
    const res = await apiClient.get(IS_AUTH_ROUTE)
    return res.data.isAuth 
})

export const loadableIsAuthAtom = loadable(isAuthAtom)