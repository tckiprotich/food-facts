const express = require('express');
const morgan = require('morgan');

const app = express();

// add the Morgan middleware to the app
app.use(morgan('dev'));

// ROUTES
const homeRoutes = require('./routes/home'); // import the home routes
const scanroutes = require('./routes/scan'); // import the scan routes
app.use('/', homeRoutes);

// Views
app.set('views', 'Views'); // set the views folder



// start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
