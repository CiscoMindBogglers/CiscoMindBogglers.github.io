// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  client_id: 'C5efed444a7959c12093ba2748e4811dc90c67f4ce70b6ca2894156d9e5f679ea',
  redirect_uri: 'http://localhost:4200/webex',
  scope: 'spark:all spark:kms',
  firebase: {
    apiKey: "AIzaSyC6D6sc9MGxr-QoPW_K17dguyX40MciZ8A",
    authDomain: "ciscomindbogglers.firebaseapp.com",
    projectId: "ciscomindbogglers",
    storageBucket: "ciscomindbogglers.appspot.com",
    messagingSenderId: "449691507435",
    appId: "1:449691507435:web:911906838d2201495ebcae",
    measurementId: "G-QJMWQH950G"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
