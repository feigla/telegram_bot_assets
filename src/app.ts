import Messages from "./bot/messages";
import Commands from "./bot/commands";

class App {
    messages: Messages
    commands: Commands

    constructor() {
        this.messages = new Messages()
        this.commands = new Commands()

        this.setMessages()
        this.setCommands()
    }

    setMessages() {
        this.messages.setMessages()
        this.messages.setCallbackQuery()
        this.messages.notifyClients()

        this.messages.setOnText('add')
        this.messages.setOnText('remove')
    }

    setCommands() {
        this.commands.setCommands()
    }
}

export default App