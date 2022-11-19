import { apiUrl, LocalStorageKeys } from 'config'
import { BehaviorSubject } from 'rxjs'
import { User_login, User } from './../types'
import axios from 'axios'

export const currentUserSubject = new BehaviorSubject<User|null>(null)
export const currentUser = currentUserSubject.asObservable()
export const getCurrentUserValue = () => currentUserSubject.getValue()

function getLocalStorageUser(): User|null {
        let username = localStorage?.getItem(LocalStorageKeys.user.username)
        let jwt = localStorage?.getItem(LocalStorageKeys.user.jwt)
        const user = {
                username: username,
                jwt: jwt
        }

        // @ts-ignore
        return username && jwt ? user : null
}

export function isAuthed() {
        return Boolean(localStorage?.getItem(LocalStorageKeys.user.username))
}

export function login(user: User_login): Promise<number> {
        return new Promise((resolve, reject) => {
                axios.post(apiUrl+"/users/login", user, {
                        headers: {
                                'Content-Type': 'application/json'
                        },
                }).then(res => {
                                if (res.status != 200) {
                                        reject(res.status)
                                        currentUserSubject.next(null)
                                }
                                if (res.data.username && res.data.jwt) {
                                        localStorage.setItem(LocalStorageKeys.user.username, res.data.username)
                                        localStorage.setItem(LocalStorageKeys.user.jwt, res.data.jwt)
                                        currentUserSubject.next({
                                                username: res.data.username,
                                                jwt: res.data.jwt
                                        })
                                        resolve(res.status)
                                } else {
                                        reject(-1)
                                        currentUserSubject.next(null)
                                }
                        })
                .catch(err => {
                                console.error(err)
                                currentUserSubject.next(null)
                                reject(-2)
                        })
        })
}

export function logout() {
        localStorage.removeItem(LocalStorageKeys.user.jwt)
        localStorage.removeItem(LocalStorageKeys.user.username)
        currentUserSubject.next(null)
}

export const OAuth = (() => {
        function Google() {
                throw "Not implemented"
        }

        return {
                Google,
        }
})()

export function register() {

}
