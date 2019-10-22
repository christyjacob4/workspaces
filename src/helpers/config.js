export const config = {
  corsProxyURL: "https://cors-anywhere.herokuapp.com/",
  contestsFetchURL:
    "https://clist.by:443/api/v1/contest/?start__gte=2019-09-30T00%3A00%3A00%2B05%3A30&end__lte=2019-11-11T00%3A00%3A00%2B05%3A30&order_by=-start",
  clistApiKey: "b7216b299ee98b4e4d0c655953e12808f56c8bb4",
  clistUserName: "christyjacob4",
};

export const firebaseConfig = {
  apiKey: "AIzaSyAycsHzVVLE9SJxQX8JnrMIYMRpzyD0CG4",
  authDomain: "web-tech-project-c67f5.firebaseapp.com",
  databaseURL: "https://web-tech-project-c67f5.firebaseio.com",
  projectId: "web-tech-project-c67f5",
  storageBucket: "web-tech-project-c67f5.appspot.com",
  messagingSenderId: "172927547768",
  appId: "1:172927547768:web:f6a42e49b8e4442d32f08d",

  clientId:
    "123772629281-4dn3c4lia8ee5n2u97eqfpepug34k1o4.apps.googleusercontent.com",

  scopes: [
    "email",
    "profile",
    "https://www.googleapis.com/auth/calendar",
    "https://mail.google.com/	",
  ],
};
