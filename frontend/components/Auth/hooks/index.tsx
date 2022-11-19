import { useState, useEffect } from 'react';
import { login } from './../helpers'
import { currentUser, getCurrentUserValue } from './../helpers'

export function useAuth() {
        let [ user, setUser ] = useState(getCurrentUserValue())

        useEffect(() => {
                const sub = currentUser.subscribe((user) => { setUser(user) })

                return () => {
                        sub.unsubscribe()
                }
        }, [])

        return [user, login]
}
