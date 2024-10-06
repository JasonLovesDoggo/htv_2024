'use strict';


// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
// const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
// console.log(
//   `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
// );

// // function uploadFile(file) {
// //   // Create a new tus upload
// //   const upload = new tus.Upload(file, {
// //       endpoint: 'http://localhost:8080/files/',
// //       retryDelays: [0, 3000, 5000, 10000, 20000],
// //       metadata: {
// //           filename: file.name,
// //           filetype: file.type,
// //       },
// //       onError: function(error) {
// //           console.log('Failed because: ' + error);
// //       },
// //       onProgress: function(bytesUploaded, bytesTotal) {
// //           const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
// //           console.log(bytesUploaded, bytesTotal, percentage + '%');
// //       },
// //       onSuccess: function() {
// //           console.log('Download %s from %s', upload.file.name, upload.url);
// //       },
// //   });

//   // Check if there are any previous uploads to continue.
//   upload.findPreviousUploads().then(function(previousUploads) {
//       // Found previous uploads so we select the first one.
//       if (previousUploads.length) {
//           upload.resumeFromPreviousUpload(previousUploads[0]);
//       }

//       // Start the upload
//       upload.start();
//   });
// }

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "receiveBlob" && request.data) {
      console.log("Kante blob");

      const base64Data = request.data.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const blob = new Blob([byteNumbers], { type: request.type });
      
      const file = new File([blob], request.name, { type: request.type });

      uploadFile(file)

      sendResponse({ balls: true });
  }
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log("Message received from background:", request);

//   uploadFile(request.file);
  
//   sendResponse({ farewell: "Goodbye from content script!" });
// });