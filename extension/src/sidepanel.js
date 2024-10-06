'use strict';

import './sidepanel.css';
import { uploadFile } from './background.js';

let dropCount = 0;
const suggestionSets = [
    ['work', 'TODO', 'other'],
    ['cat', 'pet', 'leisure'],
    ['pet', 'leisure', 'nature']
];

export const apiRoot = async () => {
    const root = await chrome.storage.sync.get("apiRoot")
    if (root === "") {
        error("Please set an api route in the sidebar")
    }
    return root
}

// Check if we're in a context where 'document' is defined
if (typeof document !== 'undefined') {
    function setupDragAndDrop() {
        const dropZone = document.getElementById('drop-zone');
        const fileList = document.getElementById('file-list');
        const fileNameInput = document.getElementById('file-name');
        const fileDetails = document.getElementById('file-details');
        const storageSuggestions = document.getElementById('storage-suggestions');

        const apiRoot = document.getElementById('set-global-button')
        console.log(apiRoot)
        apiRoot.addEventListener('click', (e) => {
            const globalValue = document.getElementById('global-input').value;
            if (globalValue) {
                // Store the value in local storage
                chrome.storage.sync.set({ 'apiRoot': globalValue }, function () {
                    console.log('Global value saved to local storage:', globalValue);
                    alert("Set!")
                })
            }
        })

        if (!dropZone || !fileList || !fileNameInput || !fileDetails || !storageSuggestions) {
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
            fileList.innerHTML = ''; // Clear previous files
            files.forEach(file => {
                const li = document.createElement('li');
                console.log('File:', file.name, 'Type:', file.type, 'Size:', file.size);
                li.textContent = file.name;
                fileList.appendChild(li);
                uploadFile(file)
            });

            // Set the file name input value to the first file's name
            if (files.length > 0) {
                fileNameInput.value = files[0].name;
            }

            // Show file details immediately
            showFileDetails();
        });

        // Add click event listeners to storage suggestions
        storageSuggestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion')) {
                const location = e.target.textContent;
                const fileName = fileNameInput.value;
                console.log(`Uploading file: ${fileName} to ${location}`);
                // Here you would call your upload function with the file and location
                // uploadFile(file, fileName, location);

                // Hide file details and storage suggestions
                fileDetails.classList.add('hidden');
                fileDetails.classList.remove('show');
                storageSuggestions.classList.remove('show');
            }
        });
    }

    function updateStorageSuggestions() {
        const suggestions = document.querySelectorAll('.suggestion');
        const currentSet = suggestionSets[dropCount % suggestionSets.length];
        suggestions.forEach((suggestion, index) => {
            suggestion.textContent = currentSet[index];
        });
        dropCount++;
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
        animateSuggestions();
    }

    function animateSuggestions() {
        const suggestions = document.querySelectorAll('.suggestion');
        suggestions.forEach((suggestion, index) => {
            suggestion.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
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