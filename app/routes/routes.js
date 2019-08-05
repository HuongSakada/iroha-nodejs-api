module.exports = (app) => {
    const accounts = require('../controllers/controller');

    //Account
    app.post('/account', accounts.create);
    app.get('/account/:accountId', accounts.getAccount);

    //Asset
    app.post('/asset', accounts.createAsset);
    app.post('/asset/add-asset-quantity', accounts.addAssetQuantity);
    app.get('/asset/:accountId', accounts.getAccountAssets);
}