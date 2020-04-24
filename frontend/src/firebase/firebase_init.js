import * as firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from '../../private/firebase';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.database();