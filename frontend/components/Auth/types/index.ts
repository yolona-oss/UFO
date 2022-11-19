export interface User_login {
        login: string
        password: string
}

export interface User_register extends User_login {
        email: string
}

export interface User {
        username: string
        jwt: string
}
