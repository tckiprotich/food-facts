const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('GET / (home)');
    // send index.html from the views folder
    res.sendFile('index.html', { root: 'Views' });

});
module.exports = router;