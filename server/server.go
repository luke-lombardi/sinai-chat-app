package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var broadcast = make(chan Message) // broadcast channel

// define message interface
type Message struct {
	Email   string `json:"email"`
	Message string `json:"message"`
}

// configure upgrader
// note: was running into error with checkOrigin
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	// configure the websocket endpoint
	http.HandleFunc("/ws", handleClientConnection)

	// start the server on localhost:8080
	log.Println("started server on port 8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleClientConnection(w http.ResponseWriter, r *http.Request) {
	// upgrade get request to ws
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}

	defer ws.Close() // close the connection when this returns

	// send the welcome message
	var welcomeMsg Message
	welcomeMsg.Email = "Bot@sinai.com"
	welcomeMsg.Message = "Welcome to Mt. Sinai! How can I help you?"
	ws.WriteJSON(welcomeMsg)

	// listen for incoming messages
	go handleIncomingMessages(ws)

	// keep reading until the connection is closed
	for {
		var msg Message

		// read in a new message
		err := ws.ReadJSON(&msg)

		// we must have disconnected, bail
		if err != nil {
			break
		}

		// send msg to broadcast channel
		broadcast <- msg
	}
}

func handleIncomingMessages(client *websocket.Conn) {
	for {
		// grab next message
		msg := <-broadcast

		// send message back to client (basically an ACK)
		err := client.WriteJSON(msg)

		if err != nil {
			log.Printf("error: %v", err)
			break
		}
	}
}
