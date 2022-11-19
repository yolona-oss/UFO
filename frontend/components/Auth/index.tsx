import React, { useState } from 'react'
import { currentUser, getCurrentUserValue } from './helpers'
import { User } from './types'

export default function({children}: {children: (user: User|null) => React.ReactNode}) {
        let [ user, setUser ] = useState(getCurrentUserValue())

        currentUser.subscribe({
                next: (user) => { setUser(user) }
        })
        
        return children(user) && React.Children.only(children)
}
