let test = false;
let socket;
if(test){
socket = io('localhost:3030');
}else{
    socket = io('https://futurelab-5th-christmas-card.herokuapp.com');
}
    // Initialize a Feathers app
    const app = feathers();
    
    // Register socket.io to talk to our server
    app.configure(feathers.socketio(socket));

    // Form submission handler that sends a new message
    async function sendMessage () {
        const nicknameInput = document.getElementById('nickname-text');
      const messageInput = document.getElementById('message-text');

      // Create a new message with the input field value
      await app.service('messages').create({
          nickname : nicknameInput.value,
        text: messageInput.value
      });
      nicknameInput.value = '';
      messageInput.value = '';
    }

    // Renders a single message on the page
    function addMessage (message) {
      document.getElementById('main').innerHTML += `<p>${message.nickname} : ${message.text}</p>`;
    }
    
    const main = async () => {
      // Find all existing messages
      const messages = await app.service('messages').find();

      // Add existing messages to the list
      messages.forEach(addMessage);

      // Add any newly created message to the list in real-time
      app.service('messages').on('created', addMessage);
    //   setInterval(myp5.draw,100);
    };
    main();
