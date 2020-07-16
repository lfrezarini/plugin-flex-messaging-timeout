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

## Deploying the plugin

Before you deploy the plugin to your flex instance, create a `public/appConfig.js` file based on the `public/appConfig.example.js`. If the file was already created automatically when you ran the plugin locally for the first time, you can ignore this step.

```bash
cp public/appConfig.example.js public/appConfig.js
```

After you have done that, paste your **Account SID** in the begging of the `public/appConfig.js` file:

```bash
// your account sid
var accountSid = 'AC000000000000000000000000';
```

Finally, run the `npm run deploy` command to deploy the plugin to your Flex instance.
