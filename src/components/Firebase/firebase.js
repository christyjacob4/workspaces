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

  addToCalendar = competition => {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }
    console.log(competition);
    return (
      this.db
        .collection(`${this.auth.currentUser.uid}`)
        .doc("calendar")
        .collection("competitions")
        // .doc(competition.id+'')
        .add({
          competition,
        })
    );
  };

  isInitialised = () => {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  };

  getCurrentUsername = () => {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  };

  getCurrentUserEmail = () => {
    return this.auth.currentUser && this.auth.currentUser.email;
  };

  getCurrentUserCalendar = async () => {
    const quote = await this.db
      .collection(`${this.auth.currentUser.uid}`)
      .doc("calendar")
      .collection("competitions")
      .get();
    return quote;
  };

  getUIConf = callback => {
    return {
      // Popup signin flow rather than redirect flow.
      signInFlow: "popup",
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        {
          provider: app.auth.GoogleAuthProvider.PROVIDER_ID,
          customParameters: {
            // Forces account selection even when one account
            // is available.
            prompt: "select_account",
          },
          // scopes: firebaseConfig.scopes,
        },
      ],
      callbacks: {
        // // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: callback,
      },
    };
  };
}

export default Firebase;
