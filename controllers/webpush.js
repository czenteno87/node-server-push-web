const { response }  = require('express');
const webpush = require("web-push");

const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;
let pushSubscripton;

webpush.setVapidDetails(
    "mailto:noresponder@medicus.com.ar",
    PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY
  );

const subscription = async ( req, res = response) => {

    try {        
        pushSubscripton = req.body;
        console.log(pushSubscripton);
      
        // Server's Response
        res.status(201).json();
    } catch (error) {
        res.status(500).json(error)
    }    
};

const newMessage = async (req,res) => {
    const { message } = req.body;
    
    // Payload Notification
    const payload = JSON.stringify({
      title: "My Custom Notification",
      message 
    });

    res.status(200).json();
    
    try {
      await webpush.sendNotification(pushSubscripton, payload);
    } catch (error) {
      console.log(error);
    }

};

module.exports = {
    webpush,
    subscription,
    newMessage
}