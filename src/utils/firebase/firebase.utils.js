import {initializeApp} from 'firebase/app';
import {
   getAuth, 
   GoogleAuthProvider, 
   signInWithPopup,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
} from 'firebase/auth';
import {
   getFirestore, 
   doc, 
   getDoc, 
   setDoc,
   collection,
   writeBatch,
   query,
   getDocs,
} from 'firebase/firestore'

const firebaseConfig = {
   apiKey: "AIzaSyDXHhJVeFzc3lea-9lrOj5VJmwq8botfUE",
   authDomain: "mainstream-apparel-db.firebaseapp.com",
   projectId: "mainstream-apparel-db",
   storageBucket: "mainstream-apparel-db.appspot.com",
   messagingSenderId: "205848885184",
   appId: "1:205848885184:web:1401713ef458c8add8fa25",
 };
 
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
   prompt: 'select_account'
});

export const auth = getAuth();

export const signInWithGooglePopup = () => {
   return signInWithPopup (auth, provider);
}

export const signInUserAuthWithEmailAndPassword = async(email, password) => {
   if (!email || ! password) return;
   return await signInWithEmailAndPassword(auth, email, password);
}

export const db = getFirestore(); 

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field='title') => {
   const collectionRef = collection(db, collectionKey);
   const batch = writeBatch(db);

   objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object[field].toLowerCase());
      batch.set(docRef, object);
   })

   await batch.commit();
   console.log('done');
}

export const getCategoriesAndDocuments = async () => {
   const collectionRef = collection(db, 'categories');
   const q = query(collectionRef);

   const querySnapShot = await getDocs(q);
   //querySnapSHot is an array of 5 (the 5 categories)
   const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
      const { title, items } = docSnapShot.data();
      acc[title.toLowerCase()] = items;
      return acc;
   }, {})
   console.log('categoryMap: ', categoryMap);
   return categoryMap;
}

export const createUserDocFromAuth = async(userAuth, additionalInfo) => {

   if(!userAuth) return;
   
   const userDocRef = doc(db, 'users', userAuth.uid);

   const userSnapShot = await getDoc(userDocRef);

   if(!userSnapShot.exists()){
      
      const {displayName, email} = userAuth;
      const createdDate = new Date();

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdDate,
            ...additionalInfo
         });
       } catch (error) {
         console.log('Error creating the user: ', error)
       }
   } 

   return userDocRef;

}

export const createUserAuthWithEmailAndPassword = async(email, password) => {
   if (!email || ! password) return;
   return await createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
   onAuthStateChanged(auth, callback);
