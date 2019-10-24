export const config = {
  corsProxyURL: "https://cors-anywhere.herokuapp.com/",
  contestsFetchURL:
    "https://clist.by:443/api/v1/contest/?start__gte=2019-09-30T00%3A00%3A00%2B05%3A30&end__lte=2019-11-11T00%3A00%3A00%2B05%3A30&order_by=-start",
  clistApiKey: "b7216b299ee98b4e4d0c655953e12808f56c8bb4",
  clistUserName: "christyjacob4",
};

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,

//   clientId:
//     "123772629281-4dn3c4lia8ee5n2u97eqfpepug34k1o4.apps.googleusercontent.com",

//   scopes: [
//     "email",
//     "profile",
//     "https://www.googleapis.com/auth/calendar",
//     "https://mail.google.com/	",
//   ],
};

console.log("[INFO] FIREBASE CONFIG", firebaseConfig)