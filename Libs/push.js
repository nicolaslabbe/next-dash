const webpush = require('web-push');
const Utils = require("../Utils");
const db = require("./db");

const triggerPushMsg = function(subscription, dataToSend) {
  return webpush.sendNotification(subscription, dataToSend)
    .catch(function(err) {
      if (err.statusCode === 410) {
        console.log('Delete sub');
        // return deleteSubscriptionFromDatabase(subscription._id);
      } else {
        console.log('Subscription is no longer valid: ', err);
      }
    });
};

const send = function(msg) {
  return new Promise(function(resolve, reject) {
    const vapidKeys = {
      publicKey: process.env.WEB_PUSH_PUBLIC_KEY,
      privateKey: process.env.WEB_PUSH_PRIVATE_KEY
    };

    webpush.setVapidDetails(
      'mailto:nicolas.labbe@adfab.fr',
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );

    db
      .all('web-push')
      .then(
        function(pushUsers) {

          let promiseChain = Promise.resolve();

          for (let i = 0; i < pushUsers.length; i++) {
            const subscription = pushUsers[i];
            promiseChain = promiseChain.then(function() {
              return triggerPushMsg(subscription, msg);
            });
          }

          promiseChain
            .then(function() {
              resolve(res, { success: true })
            })
            .catch(function(err) {
              reject(res, {
                  id: 'unable-to-send-messages',
                  message: `We were unable to send messages to all subscriptions : ` +
                    `'${err.message}'`
                })
            });
        },
        function(error) { reject(error) }
      );
  });
};

module.exports = {
  send
};
