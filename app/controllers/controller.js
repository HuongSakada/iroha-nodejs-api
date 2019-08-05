const grpc = require('grpc');
const {
  QueryService_v1Client,
  CommandService_v1Client
} = require('iroha-helpers/lib/proto/endpoint_grpc_pb');
const { commands, queries } = require('iroha-helpers');

//iroha
const IROHA_ADDRESS = 'localhost:50051';
const adminPriv = '0f0ce16d2afbb8eca23c7d8c2724f0c257a800ee2bbd54688cec6b898e3f7e33';
const username = 'admin@iroha';

//Keypares for create new account
const testPriv = '74544e29b7ff75616e7f1b83f2a29ed0b05d391806bea0f3bf783beb8fa9134a';
const testPub = '62a37893c34347e4c8ac3d8ba538d8a91800059c346f7687718b9924018fa4d7';

const commandService = new CommandService_v1Client(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
);

const queryService = new QueryService_v1Client(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
);

/**Create account by json req of domainId and accountName key */
exports.create = (req, res) => {
    const promise = new Promise((resolve, reject) => {
        commands.createAccount({
            privateKeys: [adminPriv],
            creatorAccountId: username,
            quorum: 1,
            commandService,
            timeoutLimit: 5000
        }, {
            accountName: req.body.accountName,
            domainId: req.body.domainId,
            publicKey: testPub
        })
        .then((account) => {
            resolve(account);
        })
        .catch((err) => {
            reject(err);
        });
    });
    
    promise.then((account) => {
        return res.status(200).send(account);
    }).catch((err) => {
        console.error(err);
        return res.status(500).send(err);
    });
};

// Get account
exports.getAccount = (req, res) => {
    const promise = new Promise((resolve, reject) => {
        queries.getAccount({
            privateKey: adminPriv,
            creatorAccountId: username,
            queryService,
            timeoutLimit: 5000
        }, {
            accountId: req.params.accountId
        })
        .then((account) => {
            resolve(account);
        })
        .catch((err) => {
            reject(err);
        });
    });
    
    promise.then((account) => {
        return res.status(200).send(account);
    }).catch((err) => {
        console.error(err);
        return res.status(500).send(err);
    });
};


//Create asset
exports.createAsset = (req, res) => {
    const promise = new Promise((resolve, reject) => {
        commands.createAsset({
            privateKeys: [adminPriv],
            creatorAccountId: username,
            quorum: 1,
            commandService,
            timeoutLimit: 5000
        }, {
            assetName: req.body.assetName,
            domainId: req.body.domainId,
            precision: req.body.precision
        })
        .then((account) => {
            resolve(account);
        })
        .catch((err) => {
            reject(err);
        });
    });
    
    promise.then((account) => {
        return res.status(200).send(account);
    }).catch((err) => {
        console.error(err);
        return res.status(500).send(err);
    });
};

exports.addAssetQuantity = (req, res) => {
    const promise = new Promise((resolve, reject) => {
        commands.addAssetQuantity({
            privateKeys: [adminPriv],
            creatorAccountId: username,
            quorum: 1,
            commandService,
            timeoutLimit: 5000
        }, {
            assetId: req.body.assetId,
            amount: req.body.amount
        })
        .then((account) => {
            resolve(account);
        })
        .catch((err) => {
            reject(err);
        });
    });
    
    promise.then((account) => {
        return res.status(200).send(account);
    }).catch((err) => {
        console.error(err);
        return res.status(500).send(err);
    });
};

exports.getAccountAssets = (req, res) => {
    const promise = new Promise((resolve, reject) => {
        queries.getAccountAssets({
            privateKey: adminPriv,
            creatorAccountId: username,
            queryService,
            timeoutLimit: 5000
        }, {
            accountId: req.params.accountId
        })
        .then((account) => {
            resolve(account);
        })
        .catch((err) => {
            reject(err);
        });
    });
    
    promise.then((account) => {
        return res.status(200).send(account);
    }).catch((err) => {
        console.error(err);
        return res.status(500).send(err);
    });
};