import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import { firebaseConfig } from "../../helpers/config";

class Firebase {
  constructor() {
    console.log("[INFO] INITIALISING FIREBASE");
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  signIn = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  signOut = () => {
    return this.auth.signOut();
  };

  signUp = async (name, email, password) => {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  };

  resetPassword = email => this.auth.sendPasswordResetEmail(email);
  
  updatePassword = password => this.auth.currentUser.updatePassword(password);

  addQuote = quote => {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db
      .doc(`users_codedamn_video/${this.auth.currentUser.uid}`)
      .set({
        quote,
      });
  };

  isInitialised = () => {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  };

  getCurrentUsername = () => {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  };

  getCurrentUserQuote = async () => {
    const quote = await this.db
      .doc(`users_codedamn_video/${this.auth.currentUser.uid}`)
      .get();
    return quote.get("quote");
  };
}

export default Firebase;
