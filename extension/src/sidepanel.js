'use strict';

import './sidepanel.css';

// Check if we're in a context where 'document' is defined
if (typeof document !== 'undefined') {
  function setupDragAndDrop() {
    const dropZone = document.getElementById('drop-zone');
    const fileList = document.getElementById('file-list');
    const fileNameInput = document.getElementById('file-name');

    if (!dropZone || !fileList || !fileNameInput) {
      console.error('Required DOM elements not found');
      return;
    }

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('dragover');

      console.log('File dropped!');
      const files = Array.from(e.dataTransfer.files);
      console.log('Number of files:', files.length);
      files.forEach(file => {
        const li = document.createElement('li');
        console.log('File:', file.name, 'Type:', file.type, 'Size:', file.size);
        li.textContent = file.name;
        fileList.appendChild(li);
      });

      // Set the file name input value to the first file's name
      if (files.length > 0) {
        fileNameInput.value = files[0].name;
      }

      // Show file details after a short delay
      setTimeout(showFileDetails, 500);
    });
  }

  function showFileDetails() {
    const fileDetails = document.getElementById('file-details');
    const fileNameInput = document.getElementById('file-name');
    fileDetails.classList.remove('hidden');
    setTimeout(() => {
      fileDetails.classList.add('show');
      fileNameInput.classList.add('show');
      showStorageSuggestions();
    }, 50);
  }

  function showStorageSuggestions() {
    const storageSuggestions = document.getElementById('storage-suggestions');
    storageSuggestions.classList.remove('hidden');
    setTimeout(() => {
      storageSuggestions.classList.add('show');
      animateSuggestions();
    }, 50);
  }

  function animateSuggestions() {
    const suggestions = document.querySelectorAll('.suggestion');
    suggestions.forEach((suggestion, index) => {
      setTimeout(() => {
        suggestion.classList.add('show');
      }, index * 200);
    });
  }

  // Use 'load' event instead of 'DOMContentLoaded' for more reliability in extension contexts
  window.addEventListener('load', () => {
    console.log('Window loaded, setting up drag and drop');
    setupDragAndDrop();
  });

  console.log('SidePanel script loaded and running in document context');
} else {
  console.log('SidePanel script loaded, but not in a document context');
}

// Communicate with background file by sending a message
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.sendMessage(
    {
      type: 'GREETINGS',
      payload: {
        message: 'Hello, my name is Syd. I am from SidePanel.',
      },
    },
  );
}

