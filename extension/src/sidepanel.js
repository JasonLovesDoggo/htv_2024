'use strict';

import './sidepanel.css';
import { uploadFile } from './contentScript.js';

// Check if we're in a context where 'document' is defined
if (typeof document !== 'undefined') {
  function setupDragAndDrop() {
    const dropZone = document.getElementById('drop-zone');
    const fileList = document.getElementById('file-list');

    if (!dropZone || !fileList) {
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
        uploadFile(file);
      });
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

