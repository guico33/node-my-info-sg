var express = require('express');
var router = express.Router();

const MyInfoClient = require('node-my-info-sg');
const path = require('path');
const colors = require('colors');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


// ####################
// Setup Configuration
// ####################

var _attributes = [
  'uinfin', 
  'name', 
  'sex', 
  'race', 
  'nationality', 
  'dob', 
  'email', 
  'mobileno', 
  'regadd', 
  'housingtype', 
  'hdbtype', 
  'marital', 
  'edulevel', 
  'noa-basic', 
  'ownerprivate',
  'cpfcontributions',
  'cpfbalances',
];


const myInfoClient = new MyInfoClient({
  // MyInfo API base URL (sandbox/test/production)
  // https://www.ndi-api.gov.sg/assets/lib/trusted-data/myinfo/specs/myinfo-kyc-v3.0.1.yaml.html#section/Environments/Available-Environments
  baseUrl: process.env.MYINFO_API_BASE_URL,
  
  // Api auth level (L0 for sandbox; Otherwise L2)
  authLevel: process.env.AUTH_LEVEL,
  
  // Public key from MyInfo Consent Platform given to you during onboarding for RSA digital signature
  publicCertPath: process.env.MYINFO_SIGNATURE_CERT_PUBLIC_CERT,
  
  // Your private key for RSA digital signature
  privateKeyPath: process.env.DEMO_APP_SIGNATURE_CERT_PRIVATE_KEY,
  
  // Your client_id provided to you during onboarding
  clientId: process.env.MYINFO_APP_CLIENT_ID,
  
  // Your client_secret provided to you during onboarding
  clientSecret: process.env.MYINFO_APP_CLIENT_SECRET,
  
  // Redirect URL for your web application
  // https://www.ndi-api.gov.sg/library/trusted-data/myinfo/implementation-technical-requirements (Callback URLs)
  redirectUrl: process.env.MYINFO_APP_REDIRECT_URL,
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../views/html/index.html'));
});

// callback function - directs back to home page
router.get('/callback', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../views/html/index.html'));
});

// function for getting environment variables to the frontend
router.get('/getAuthoriseUrl', function(req, res, next) {
  var purpose = 'demonstrating MyInfo APIs'
  var attributes = _attributes;
  var { authoriseUrl } = myInfoClient.getAuthoriseUrl(purpose, attributes);
  
  res.jsonp({
    status: "OK",
    authoriseUrl,
  });
});

// function for frontend to call backend
router.post('/getPersonData', function(req, res, next) {
  // get variables from frontend
  var code = req.body.code;

  var data;
  var request;
  
  myInfoClient.getToken(code)
    .then(function({ accessToken }) {
      return myInfoClient.getPerson(accessToken, _attributes);
    })
    .then(function({ person }) {
      console.log("Person Data:".green);
      console.log(JSON.stringify(person))
      res.jsonp({ status: "OK", text: person });
    })
    .catch(function(error) {
      console.error(error);
      res.jsonp({ status: "ERROR", msg: error });
    });
});

module.exports = router;
