import * as tus from 'tus-js-client';

function uploadFile(file) {
    // Create a new tus upload
    const upload = new tus.Upload(file, {
        endpoint: 'http://localhost:8080/files/',
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
            filename: file.name,
            filetype: file.type,
        },
        onError: function(error) {
            console.log('Failed because: ' + error);
        },
        onProgress: function(bytesUploaded, bytesTotal) {
            const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(bytesUploaded, bytesTotal, percentage + '%');
        },
        onSuccess: function() {
            console.log('Download %s from %s', upload.file.name, upload.url);
        },
    });

    // Check if there are any previous uploads to continue.
    upload.findPreviousUploads().then(function(previousUploads) {
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
            upload.resumeFromPreviousUpload(previousUploads[0]);
        }

        // Start the upload
        upload.start();
    });
}

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

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });