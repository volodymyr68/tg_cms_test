const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
// Your API credentials from https://my.telegram.org
const apiId = 1234; // Replace with your API ID
const apiHash = 'abcs'; // Replace with your API Hash
const stringSession = new StringSession(""); // You can save the session string here after the first login

const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
});

(async () => {
    console.log("Loading...");
    await client.start({
        phoneNumber: async () => await input.text("Please enter your phone number: "),
        password: async () => await input.text("Please enter your password: "),
        phoneCode: async () => await input.text("Please enter the code you received: "),
        onError: (err) => console.log(err),
    });

    console.log("You are now logged in.");

    // Replace 'public_channel_username' with the actual public channel username (without @)
    const channel = 'vanek_nikolaev';

    try {
        const result = await client.getMessages(channel, { limit: 10 });

        // Display messages from the channel
        result.forEach((message) => {
            console.log("Message: ", message.message);
        });
    } catch (error) {
        console.error("Error fetching messages: ", error);
    }

    console.log("Session string: ", client.session.save()); // Save this session string for future logins
})();
