# Collaborative Code Editor with Chat and Voice Chat

This project is a collaborative code editor that allows users to edit code, compile and run it, chat via text messages, and communicate through voice chat.

## Features

- Real-time collaborative code editing
- Support for C and C++ compilation and execution
- Real-time text chat

## Prerequisites

- Node.js (version 14 or later)
- npm (Node package manager)

## Getting Started

### Backend Setup

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/your-repo/collaboration.git
    cd collaboration
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Run the Server**:

    ```bash
    node index.js
    ```

### Frontend Setup

1. **Navigate to the Frontend Directory**:

    ```bash
    cd client
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Run the React Application**:

    ```bash
    npm start
    ```

4. **Open the Application**:

    Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Open Multiple Browsers**:

    To test the collaborative features, open the application in two different browsers or two different browser profiles (e.g., one in Chrome and one in Firefox, or two incognito windows in Chrome).

2. **Collaborative Editing**:

    - Both users can type in the code editor, and changes will be reflected in real-time.
    - Users can select the programming language (C or C++) from the dropdown menu.

3. **Compile and Run Code**:

    - Enter the code in the editor.
    - Click the "Compile & Run" button to compile and execute the code.
    - The output will be displayed in the output area.

4. **Chat**:

    - Type a message in the chat input field and click "Send".
    - Messages will appear on the right side for the current user and on the left side for other users.


## File Structure

```bash
collaborative-code-editor/
├── api/
│   ├── index.js            # Backend server code
│   └── package.json                  
├── client/
│   ├── public/
│   ├── src/
│   │   ├── App.css         # CSS styles for the frontend
│   │   ├── App.js          # React main component
│   │   ├── index.js        # React entry point
│   └── package.json        # Frontend dependencies and scripts
├── package.json            # Backend dependencies and scripts
└── README.md               # Project documentation
