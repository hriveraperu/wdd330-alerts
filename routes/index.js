const routes = require('express').Router();
const temple = require('./temple');

routes.use('/', require('./swagger'));
routes.use('/alerts', temple);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://wdd330-alerts.onrender.com/api-docs',
    };
    res.send(docData);
  })
);


module.exports = routes;
