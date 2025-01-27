const config = {
  apiKey: "AIzaSyBlR-A6GiRkwt698lBJmp-57wAavIfoRrk",
  authDomain: "invitacionwl.firebaseapp.com",
  projectId: "invitacionwl",
  storageBucket: "invitacionwl.firebasestorage.app",
  messagingSenderId: "165156622834",
  appId: "1:165156622834:web:ec44526d07307831101b6b",
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.ts"
    );
  } else {
    return config;
  }
}
