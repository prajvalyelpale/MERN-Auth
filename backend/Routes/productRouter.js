const express = require('express');
const { ensureAuthentication } = require('../Middlewares/authMiddleware');
const router = express.Router();

router.get('/',ensureAuthentication, (req, res)=>{
    res.send("This is secure page!!");
});

module.exports = router;