{
"use strict";

//init socket(client)
const socket = io();
//add eventListener on events
socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('logout', (author) => addMessage('chat bot', author + ' has left the conversation... :('));

// HTML references
const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

// Global vars
let userName = '';

// Functions
const login = (e) => {
    e.preventDefault();

    if (!userNameInput.value) {
        alert('Please enter a username');
    } else {
        userName = userNameInput.value;
        // add emmitter to emit action to server
        socket.emit('join', userName);
        socket.emit('message', { author: 'chat bot', content: userName + ' has joined the conversation!' })
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
};

const addMessage = (author, content) => {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (author === userName) message.classList.add('message--self');
    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
    `;
    messagesList.appendChild(message);
};

const sendMessage = e => {
    e.preventDefault();

    let messageContent = messageContentInput.value;

    if (!messageContent.length) {
        alert('You have to type something!');
    } else {
        addMessage(userName, messageContent);
        // add emmitter to emit action to server
        socket.emit('message', { author: userName, content: messageContent })
        messageContentInput.value = '';
    }
;}

// Event listeners
loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);

}