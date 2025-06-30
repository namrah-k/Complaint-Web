// @ts-nocheck

const FacultySelectorBtn = document.querySelector('#Faculty-selector');
const StudentSelectorBtn = document.querySelector('#Student-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');
const imageUploadInput = document.querySelector('#image-upload');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'Faculty' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">
      ${message.text ? message.text : ''}
      ${message.image ? `<img src="${message.image}" alt="Image" style="max-width: 100%; border-radius: 0.5em; margin-top: 0.5em;">` : ''}
    </div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

let messageSender = 'Faculty';

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...`;
  chatInput.placeholder = `Type here, ${messageSender}...`;

  if (name === 'Faculty') {
    FacultySelectorBtn.classList.add('active-person');
    StudentSelectorBtn.classList.remove('active-person');
  }
  if (name === 'Student') {
    StudentSelectorBtn.classList.add('active-person');
    FacultySelectorBtn.classList.remove('active-person');
  }

  /* auto-focus the input field */
  chatInput.focus();
};

FacultySelectorBtn.onclick = () => updateMessageSender('Faculty');
StudentSelectorBtn.onclick = () => updateMessageSender('Student');

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  /* Save message to local storage */
  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message);

  /* Clear input field */
  chatInputForm.reset();

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
  localStorage.clear();
  chatMessages.innerHTML = '';
});

// Event listener for image uploads
imageUploadInput.addEventListener('change', () => {
  const file = imageUploadInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      const message = {
        sender: messageSender,
        text: '', // No text, just an image
        image: reader.result,
        timestamp,
      };

      // Save message to local storage
      messages.push(message);
      localStorage.setItem('messages', JSON.stringify(messages));

      // Add image message to DOM
      chatMessages.innerHTML += createChatMessageElement(message);

      // Scroll to bottom of chat messages
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    reader.readAsDataURL(file);
  }
});
