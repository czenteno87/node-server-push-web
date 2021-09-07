const { Router } = require('express')
const {subscription, newMessage} = require("../controllers/webpush")
const router = new Router();


router.post('/subscription', subscription);

router.post("/new-message", newMessage);


module.exports = router;