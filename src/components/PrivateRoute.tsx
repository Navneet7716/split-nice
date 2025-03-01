import { useAtom } from 'jotai'
import { loadableIsAuthAtom } from '../atoms/auth'
import { Text } from '@mantine/core'
import { Navigate, useLocation } from 'react-router'

function PrivateRoute({ children }: any) {

    const [val] = useAtom(loadableIsAuthAtom)

    const location = useLocation()

    if (val.state === 'hasError') return <Text>{val.error as any}</Text>
    if (val.state === 'loading') {
        return <Text>Loading...</Text>
    }

    if (!val.data) {
        return <Navigate to={"/login"} state={{ from: location }} replace />
    }


    return children
}

export default PrivateRoute