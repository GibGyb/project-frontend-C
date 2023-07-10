import * as React from 'react'
import { host } from '../constant'
import { ChildProps, IAuthContext } from '../types/auth.context'

/* Typescript section, JS guys can ignore for now */
export type AuthProviderProps = ChildProps
type UserInfo = Pick<IAuthContext, 'id' | 'token'>

type LoginFunc = IAuthContext['login']
type LogoutFunc = IAuthContext['logout']
type GetAuthHeaderFunc = IAuthContext['getAuthHeader']
type IsOwnPostFunc = IAuthContext['isOwnPost']

/* End Typescript section */

const AuthContext = React.createContext<IAuthContext | null>(null)

const retrieveUserData = (token: string) =>
  fetch(`${host}/auth/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json())

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const token = localStorage.getItem('token')
const id = localStorage.getItem('id')

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(!!localStorage.getItem('token'))
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    id: id,
    token: token,
  })

  const login: LoginFunc = async (username, password) => {
    const loginInfo = { username, password }

    try {
      const res = await fetch(`${host}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      })
      const data = await res.json()

      if (data.statusCode === 401) {
        throw new Error(data.message)
      }

      const newToken = data.accessToken

      const { id } = await retrieveUserData(newToken)

      localStorage.setItem('token', newToken)
      localStorage.setItem('id', id)
      setIsLoggedIn(true)
      setUserInfo({
        id: id,
        token: newToken,
      })

      // TODO: write login logic here, once you got token, the rest is to retrieve user info from /auth/me API

      // TODO: update login and ALL RELATED STATES after login succeed
    } catch (error: any) {
      throw new Error(error)

      // TODO: define how error is handling here
    }
  }

  const logout: LogoutFunc = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    setIsLoggedIn(false)
    setUserInfo({ id: null, token: null })
    // TODO: logout procedures
  }

  const getAuthHeader: GetAuthHeaderFunc = () => ({
    // TODO: (Optional) if you're interested in complete this function,
    // it'll help generate Authorization header which can be use in fetch() function
    Authorization: `Bearer ${token} `,
  })

  const isOwnPost: IsOwnPostFunc = (post) => {
    console.log(post.postedBy)
    // TODO: (Optional) if you're interested in complete this function,
    // it'll enable you to use isOwnPost from useAuth() in order to decided if each post can be edited
    return post.postedBy.id === userInfo.id
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        getAuthHeader,
        isOwnPost,
        ...userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
