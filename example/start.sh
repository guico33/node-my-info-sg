export DEMO_APP_SIGNATURE_CERT_PRIVATE_KEY=./ssl/stg-demoapp-client-privatekey-2018.pem
export MYINFO_SIGNATURE_CERT_PUBLIC_CERT=./ssl/stg-auth-signing-public.pem

export MYINFO_APP_CLIENT_ID=STG2-MYINFO-SELF-TEST
export MYINFO_APP_CLIENT_SECRET=44d953c796cccebcec9bdc826852857ab412fbe2
export MYINFO_APP_REDIRECT_URL=http://localhost:3001/callback

# SANDBOX ENVIRONMENT (no PKI digital signature)
export AUTH_LEVEL=L0
export MYINFO_API_BASE_URL='https://sandbox.api.myinfo.gov.sg'

# TEST ENVIRONMENT (with PKI digital signature)
# export AUTH_LEVEL=L2
# export MYINFO_API_BASE_URL='https://test.api.myinfo.gov.sg'


npm start
                                                                                                                                                                                                                                                                 
