const grpc = require('grpc');
const {
  QueryService_v1Client,
  CommandService_v1Client
} = require('iroha-helpers/lib/proto/endpoint_grpc_pb');
const { commands, queries } = require('iroha-helpers');

const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

//iroha
const IROHA_ADDRESS = 'localhost:50051';
const adminPriv = '0f0ce16d2afbb8eca23c7d8c2724f0c257a800ee2bbd54688cec6b898e3f7e33';
const username = 'admin@iroha';

const commandService = new CommandService_v1Client(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
);

const queryService = new QueryService_v1Client(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res, next) => {
    // res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});

    //Testing with iroha
    const promise = new Promise((resolve, reject) => {
        queries.getAccountInfo({
            privateKey: adminPriv,
            creatorAccountId: username,
            queryService,
            timeoutLimit: 5000
        }, {
            accountId: username
        })
        .then((account) => {
            resolve(account);
        })
        .catch((err) => {
            reject(err);
        });
    });
    
    promise.then((account) => {
        res.json(account);
    }).catch((err) => {
        next(err);
    })
});

// listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});