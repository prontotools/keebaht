import firebase from 'firebase/app'

const config = {
  apiKey: 'apiKey',
  authDomain: 'authDomain',
  databaseURL: 'databaseURL',
  projectId: 'projectId',
  storageBucket: 'storageBucket',
  messagingSenderId: 'messagingSenderId'
}

firebase.initializeApp(config)

export const db = firebase.firestore()
