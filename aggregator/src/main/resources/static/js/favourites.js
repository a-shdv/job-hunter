const spinner = document.querySelector('#spinner')
const pdfEmailButton = document.querySelector('#pdfEmailButton')
const error = document.querySelector('#error')
const success = document.querySelector('#success')
const clearFavouritesForm = document.querySelector('#clearFavouritesForm')

let stompClient = null;
let username = null;

function connect(event) {
    event.preventDefault();

    spinner.style.display = ''

    username = document.querySelector('#username').value;
    if (username) {
        const socket = new SockJS('/ws');

        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.spin",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )
}

function onError(error) {
    // connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    // connectingElement.style.color = 'red';
    console.log('Error connecting to websocket server: ' + error)
}

function onMessageReceived(payload) {
    let message = JSON.parse(payload.body);

    switch (message.type) {
        case 'JOIN':
            sendMessage()
            break
        case 'LEAVE':
            console.log('left')
            break
        case 'RECEIVE':
            spinner.style.display = 'none'
            switch (message.content) {
                case '-1':
                    console.log('error')
                    error.style.display = ''
                    break;
                case '0':
                    console.log('success')
                    success.style.display = ''
                    break
            }
            disconnect()
            break
    }
}

function sendMessage() {
    if (stompClient) {
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(''));
    }
}

function confirmClearFavouritesForm() {
    if (confirm('Вы уверены, что хотите очистить список вакансий?')) {
        clearFavouritesForm.submit();
    } else {
        return false;
    }
}

window.addEventListener('unload', disconnect);
pdfEmailButton.addEventListener('click', connect)