import { create } from 'zustand'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

type AuthStore = {
  userInfo: any,
  firebaseUser: any,
  anonymousAuthenticate: () => {}
}

export const useAuthStore = create<AuthStore>((set) => ({
  userInfo: null,
  firebaseUser: null,
  anonymousAuthenticate: async () => {
    console.log('anonymousAuthenticate')
    const fUser = await auth().signInAnonymously()
    auth().onAuthStateChanged((user: any) => {
      set({ firebaseUser: user })
    })
    set({ firebaseUser: fUser })
  },
}))


