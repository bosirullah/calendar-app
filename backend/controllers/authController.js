const { google } = require("googleapis");

const GOOGLE_CLIENT_ID =
    "98683621565-ktsjs4g7n2grbkh35888dbs5443h9t2b.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const REFRESH_TOKEN =
    "1//0gSEXlfeY-j3eCgYIARAAGBASNwF-L9IrvasFFJvju0KExTVxqLi9KimWUcNjOn3_CpVNngodKqETFiAsLdDYacpF6TUFYu5lw1k";

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    "http://localhost:3000"
);

const apiStatus = async (req, res, next) => {
    res.send({ message: "ok api is working" });
};

const createTokens = async (req, res, next) => {
    try {
        const { code } = req.body;
        const { tokens } = await oauth2Client.getToken(code);
        res.send(tokens);
    } catch (error) {
        next(error);
    }
};

module.exports = { apiStatus, createTokens };
