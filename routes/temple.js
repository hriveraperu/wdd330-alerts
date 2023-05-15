const routes = require('express').Router();
const temples = require('../controllers/temple.js');

routes.get('/', temples.findAll);
routes.get('/:_id', temples.findOne);

routes.post('/', temples.create);

routes.put('/:_id', temples.update);

routes.delete('/:_id', temples.delete);

module.exports = routes;
