module.exports = (app) => {
    const accounts = require('../controllers/controller');

    app.post('/account', accounts.create);

    // Retrieve all Notes
    app.get('/account/:accountId', accounts.getAccount);
}