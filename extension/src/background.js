import * as tus from 'tus-js-client';

// function uploadFile(file) {
//     // Create a new tus upload
//     const upload = new tus.Upload(file, {
//         endpoint: 'http://localhost:8080/files/',
//         retryDelays: [0, 3000, 5000, 10000, 20000],
//         metadata: {
//             filename: file.name,
//             filetype: file.type,
//         },
//         onError: function(error) {
//             console.log('Failed because: ' + error);
//         },
//         onProgress: function(bytesUploaded, bytesTotal) {
//             const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
//             console.log(bytesUploaded, bytesTotal, percentage + '%');
//         },
//         onSuccess: function() {
//             console.log('Download %s from %s', upload.file.name, upload.url);
//         },
//     });

//     // Check if there are any previous uploads to continue.
//     upload.findPreviousUploads().then(function(previousUploads) {
//         // Found previous uploads so we select the first one.
//         if (previousUploads.length) {
//             upload.resumeFromPreviousUpload(previousUploads[0]);
//         }

//         // Start the upload
//         upload.start();
//     });
// }

function createContextMenu() {
    chrome.contextMenus.create({
        id: "downloadItem",
        title: "Download this item",
        contexts: ["image", "link"]
    }, () => {
        if (chrome.runtime.lastError) {
            console.error("Error creating context menu:", chrome.runtime.lastError);
        } else {
            console.log("Context menu created successfully");
        }
    });
}

chrome.runtime.onInstalled.addListener(() => {
    createContextMenu();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "downloadItem") {
        let url = info.srcUrl || info.linkUrl;
        console.log("Downloading:", url);
        if (url) {
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    // Create a filename based on the URL or use a default
                    const filename = info.srcUrl.split('/').pop() || 'image.jpg';
                    const file = new File([blob], filename, { type: blob.type });

                    const reader = new FileReader();

                    reader.onloadend = function () {
                      const message = {
                          action: "receiveBlob",
                          data: reader.result,
                          name: filename,
                          type: file.type
                      };

                      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                        const activeTab = tabs[0];
                        console.log(file)
                        if (activeTab) {
                            chrome.tabs.sendMessage(activeTab.id, message, (response) => {
                                console.log("Response from content script:", response);
                            });
                        }
                    });
                  };

                    reader.readAsDataURL(blob);

                    // uploadFile(file);
                })
                .catch(error => console.error('Error fetching image:', error));
        }
    }
});

// Add this new object to store file UIDs
const uploadedFiles = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "uploadFile") {
    // const file = request.file;
    // const customFileName = request.customFileName || file.name;

    // const upload = new tus.Upload(file, {
    //   endpoint: TUS_ENDPOINT,
    //   retryDelays: [0, 3000, 5000, 10000, 20000],
    //   metadata: {
    //     filename: customFileName,
    //     filetype: file.type
    //   },
    //   onError: function(error) {
    //     console.error("Error uploading file:", error);
    //     sendResponse({ success: false, error: error.message });
    //   },
    //   onProgress: function(bytesUploaded, bytesTotal) {
    //     const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
    //     console.log(bytesUploaded, bytesTotal, percentage + "%");
    //     // You can send a progress update message here if needed
    //   },
    //   onSuccess: function() {
    //     console.log("File uploaded successfully");
    //     const fileUrl = upload.url;
    //     const fileUid = fileUrl.split('/').pop(); // Extract UID from the URL
    //     uploadedFiles[customFileName] = fileUid;
    //     sendResponse({ success: true, fileInfo: { name: customFileName, uid: fileUid, url: fileUrl } });
    //   }
    // });

    // upload.start();
    return true;
  } else if (request.action === "deleteFile") {
    const fileUid = uploadedFiles[request.fileName];
    if (!fileUid) {
      sendResponse({ success: false, error: "File UID not found" });
      return true;
    }

    const deleteUrl = `${API_BASE_URL}/delete/${fileUid}`;

    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    })
      .then(response => {
        if (response.status === 204) {
          console.log("File deleted successfully");
          delete uploadedFiles[request.fileName];
          sendResponse({ success: true });
        } else {
          return response.json().then(data => {
            throw new Error(data.message || "Failed to delete file");
          });
        }
      })
      .catch(error => {
        console.error("Error deleting file:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true;
  } else if (request.action === "getUploadedFiles") {
    sendResponse({ files: Object.keys(uploadedFiles) });
    return true;
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: "toggleSidebar" });
});