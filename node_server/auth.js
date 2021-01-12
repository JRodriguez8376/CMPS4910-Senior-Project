const {issuer, client_id} = require('./config');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer:  issuer,
    clientID: client_id
});

module.exports = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if(!authorization) {
            throw new Error('You must send an authorization header')
        }
        const [authType, token] = authorization.trim().split(' ');
        if(authType !== 'Bearer') throw new Error('Expectred a bearer token');

        const {claims} = await oktaJwtVerifier.verifyAccessToken(token);
        if(!claims.scp.includes(process.env.scope)) {
            throw new Error('Could not verify the proper scope');
        }
        next();
    } catch (error) {
        next(error.message)
    }
}