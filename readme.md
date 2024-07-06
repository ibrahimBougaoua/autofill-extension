# Autofill Extension

## Description

Autofill Extension is a Chrome extension designed to help users automatically fill out client information in forms. The extension allows users to add, edit, and delete client records, and then easily select a client to autofill their details into forms on web pages.

## Features

- Add new client records with required fields: Name, City, NIN, NSS, and Phone.
- Edit existing client records.
- Delete client records with a confirmation prompt.
- Automatically fill out form fields on web pages with selected client information.
- Visual indication of empty fields and requirement to fill all fields before saving.
- Centered image display when no records are available.
- Responsive and user-friendly interface.

## Installation and Usage

### Load the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`.

2. Enable **Developer mode** in the top right corner.

3. Click **Load unpacked** and select your extension project directory.

4. Your extension should now be loaded and visible in the list of extensions.

### Directory Structure

```php
autofill-extension/
├── images/
│ ├── select-icon.svg
│ ├── delete-icon.svg
│ ├── empty.svg
│ ├── icon16.png
│ ├── icon48.png
│ ├── icon128.png
├── popup.html
├── popup.js
├── background.js
├── content.js
├── manifest.json
```

### Usage Instructions

1. Click on the Autofill Extension icon in the Chrome toolbar to open the popup.

2. **Adding a New Client**:
    - Fill out all the fields: Name, City, NIN, NSS, and Phone.
    - Click the **Add Client** button. All fields are required, and if any are empty, they will be highlighted with a red border.

3. **Selecting a Client**:
    - Click the **Select** button next to a client record to autofill their information into form fields on the current web page.

4. **Deleting a Client**:
    - Click the **Delete** button next to a client record.
    - Confirm the deletion in the prompt that appears.


### First step
<img src="https://raw.githubusercontent.com/ibrahimBougaoua/autofill-extension/main/preview/one.png" width="100%"  /><br />

### Second step
<img src="https://raw.githubusercontent.com/ibrahimBougaoua/autofill-extension/main/preview/tow.png" width="100%"  /><br />

### Third step
<img src="https://raw.githubusercontent.com/ibrahimBougaoua/autofill-extension/main/preview/three.png" width="100%"  /><br />

### Fourth step
<img src="https://raw.githubusercontent.com/ibrahimBougaoua/autofill-extension/main/preview/four.png" width="100%"  /><br />


### Contributing

Feel free to submit issues or pull requests if you have any improvements or bug fixes.

### License

This project is licensed under the MIT License.
