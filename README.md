# Inactivity Timeout for Messaging Tasks After a Long Time Without Interaction

This Flex plugin adds a timeout to automatically finish messaging tasks that have been a long time without new interactions.

## Setup

First, clone this repository, enter its directory and install the project dependencies:

```bash
git clone https://github.com/LucasFrezarini/plugin-flex-messaging-timeout.git

cd plugin-flex-messaging-timeout

npm install
```

Then, create a `.env` file copying the `.env.example` one:

```bash
cp .env.example .env
```

You can run it locally using the `npm start` command.

## Changing the timeout time and the enabled channels to apply it

You can customize the `.env` file to change the maximum time without interaction that a chat can have before it is finished for good, changing the variable `REACT_APP_INACTIVITY_TIMEOUT_IN_MINUTES`. You can also change the channels where the timeout time is applied to modifying the `REACT_APP_INACTIVITY_TIMEOUT_ENABLED_CHANNELS`.

```bash
REACT_APP_INACTIVITY_TIMEOUT_IN_MINUTES=15
REACT_APP_INACTIVITY_TIMEOUT_ENABLED_CHANNELS=web,whatsapp
```

The available channels to activate the timeout time is:

* **web**: Enables the timeout time for WebChats.
* **whatsapp**: Enables the timeout time for WhatsApp chats.
* **sms**: Enables the timeout time for SMS chats.

If you want to enable for all these three channels, you should define the `REACT_APP_INACTIVITY_TIMEOUT_ENABLED_CHANNELS` variable as below:

```
REACT_APP_INACTIVITY_TIMEOUT_ENABLED_CHANNELS=web,whatsapp,sms
```

## Deploying the plugin

Before you deploy the plugin to your flex instance, create a `public/appConfig.js` file based on the `public/appConfig.example.js`. If the file was already created automatically when you ran the plugin locally for the first time, you could ignore this step.

```bash
cp public/appConfig.example.js public/appConfig.js
```

After you have done that, paste your **Account SID** in the begging of the `public/appConfig.js` file:

```bash
// your account sid
var accountSid = 'AC000000000000000000000000';
```

Finally, run the `npm run deploy` command to deploy the plugin to your Flex instance.
