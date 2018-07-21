import firebase from 'firebase/app'

const config = {
  apiKey: 'AIzaSyAB_ane_8lnIA1hyeKO1xRMWjGKN_MFeJk',
  authDomain: 'keebaht-bd463.firebaseapp.com',
  databaseURL: 'https://keebaht-bd463.firebaseio.com',
  projectId: 'keebaht-bd463',
  storageBucket: 'keebaht-bd463.appspot.com',
  messagingSenderId: '247196939066'
}

firebase.initializeApp(config)

export const db = firebase.firestore()
