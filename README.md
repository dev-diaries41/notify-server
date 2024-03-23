# notify server

## Table of Contents
1. [Introduction](#introduction)
2. [How To Install](#how-to-install)
3. [How To Use](#how-to-use)
4. [Additional Info](#additional-info)


## Introduction
<a name="introduction"></a>

This is a dedicated notification server built using Express.js to send notifications via, Discord, and Telegram channels based on the message received at the '/notify' endpoint.


## How To Install
<a name="how-to-install"></a>

To install the notify server , follow these installation steps:

**Clone repo:**
Enter the following command in your terminal.

```bash
git clone https://github.com/dev-diaries41/notify-server.git
```

Change into the cloned repository directory:

```bash
cd notify-server
```

Install the required dependencies using npm:
  
```bash
npm install
```

## How To Use
<a name="how-to-use"></a>

Make sure to include the following environment variables below which are needed for the Notify class to function properly.
The MongoDB Url is only needed if you want to use the api-key authentication middleware. Please read the `Additonal Info` section for
more on this. You can get your telegram bot token from the `Bot Father` telegram channel. You can get you discord webhook from within discord.

### Environment variables:

```
MONGODB_URL=your_mongodb_url
PORT=your_port_number

#TELEGRAM CONFIG
TELEGRAM_CHANNEL_ID=your_telegram_channel_id
TELEGRAM_BOT_TOKEN=your_telegram_bot_token


#DISCORD CONFIG
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

### Start Server

Start the server using the following command:

```bash
npm start 
```

### Available endpoints:
The endpoints below are available to use. The 'notify'route handles post request where the expected 'message' parameter should be passed in the request body. The 'update-channel' route handles post requests where the expected 'newChannel' and 'platform' parameters should be passed in the request body. See the examples below.

```
/api/v1/notify
/api/v1/update-channel
```

Example of sending notification:

```typescript
import axios from 'axios'; 

async function notify() {
  try{
      const apiUrl = 'http://localhost:3000/api/v1/notify';
      const const message = 'Hello this is a test';
    
      const reqBody = {message}; 
         
      const response= await axios.post(apiUrl, reqBody);
      return response;

  }catch(error: any){
      console.error('Error in notify: ', error.response.data.error)
  }
}

```

Example of updating channel:

```typescript
import axios from 'axios'; 

async function updateChannel() {
  try{
      const apiUrl = 'http://localhost:3000/api/v1/update-channel';
      const const updateParams = {newChannel:'@your_new_channel', platform:'TELEGRAM'};
    
      const reqBody = updateParams; 
         
      const response= await axios.post(apiUrl, reqBody);
      return response;

  }catch(error: any){
      console.error('Error in updateChannel: ', error.response.data.error)
  }
}

```

## Additional Info
<a name="additional-info"></a>

- **API Key Middleware:**
    The server uses authentication middleware, which checks for a valid api-key. The api-key route for generating an api-key is not included in this repo but can be found in my `expressway` repo. So for the sake of simplicity the middleware has been commented out in the `/src/index.ts` file.

- **MongoDB Connection:**
    The server connects to MongoDB to enable the use of the api-key middleware, this is handled in the `startServer` function in the `/src/index.ts` file. Due to the reasons described above this is commented out.