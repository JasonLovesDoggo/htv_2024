function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("name", file.name)

    fetch('https://a588-2606-fa00-8a0-705-4cdc-df1b-2991-e1b5.ngrok-free.app/api/file', {
        method: 'POST',
        body: formData
    })
    .then(response => console.log(response))
    .then(data => {
        console.log('File uploaded successfully:', data);
    })
    .catch(error => {
        console.error('Error uploading file:', error);
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
                    const filename = 'image.jpg'; // todo get better name  tewfphiklhe rfwoielkhgfawriok.hfnrwai;ljhgfkrwajbg
                    const file = new File([blob], filename, { type: blob.type });

                    const reader = new FileReader();

                    reader.onloadend = function () {

                      uploadFile(file)
                  };

                    reader.readAsDataURL(blob);

                    // uploadFile(file);
                })
                .catch(error => console.error('Error fetching image:', error));
        }
    }
});

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });