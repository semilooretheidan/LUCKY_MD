const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUdiK1JEUkhENGdIVlQvYWVJTTFyZm5ET2tlYTRia1ZTNXNGbnVOQUxHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0RlLytneFNkUGlqbVdaQWFTdWN4d0g5dzdnUkZGZUVCREhob2dRbU16ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJRVpyaHFFdTluemIyNWhwUG5ZWGxLMmtFQnMyTlpDZFN6WVFQcFNDd1VRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKMkxUVS8rNWkzWWM0QXpOYlJUUVRwb1huc09ZZkpibXJJTytWSThSdFJFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFESnRWYmVYOG53ZkxRNUFTRmlvZTZpTzgvMGlIaHJQNTNxQU5oUDVtRkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRtcWJvaGI4eG0zTHc4REpxMExleXkwMVNLQ3FpN0JmUVMyOGpacnlzVE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUNOdCtWMUM0RUdBdXBCNkRMcEhaeHNkMkJoMThhS0ZiUFQyZy8wOTZsbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXRnTmJ6RjVkSW5wQjRhUmFzTjZpVlhyanJTM0duSzdzMy9pZmlIdTN5RT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndPWGViSVZDSFkrV1BRc0tjUmFlVFM5OWxqNzJud3gwY21Kem9EV1NrdnFoVFFHL2orLzhPRXVxeDlpYWs5VVdyWm5ZOVdkYlE0bW1vUnVPTTJwMkJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY5LCJhZHZTZWNyZXRLZXkiOiJ2STd6WUdsaDduYUxqWGFiYmdGaFJVakRtMjVrSjBqUTVOZVhsRkxId05vPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJfdXRwd1ZaUFNLNkNEcHhjV3VReTlRIiwicGhvbmVJZCI6ImVlNzVkYmQzLTdkNTctNDk3My05NTM2LWZiMjQwZDg4ODFiMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6RlNmYnhZOTVwWGUzUFNUbzdsZ2NjU0tUcFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT2QvckFqRWJzVXdSNlV5Y1NtdVdNVkduWjVRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjNBNDRYNUUxIiwibWUiOnsiaWQiOiIyMzQ4MDgzNzYzMDU2OjUwQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOZnQ2ZUFHRUtXUzlic0dHQkVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIySm5VclREcFRYRytlT3A1THByM1l2ckx3NWFuQzk0SzJJNVBCcnAxSVhjPSIsImFjY291bnRTaWduYXR1cmUiOiJnVSt2UWx5WXZqOUtzT3Y2YVRoZFFzYlloUnpGN0ZJNkVMSDEyQjhzN282OVlCRTErK3ovT25KK2ZoTzNFTEVYbjY0RllSdm9wVWEwTndRdHRqVEdDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiLzVtTWVtZERaQm5MZytsaS9jYmRzU2tnU29yZzJVNHNVcmV2T3gxQktId1U0UzljU0VxZ05aNTRwd0hjeW1vNkduNDF2a3p2dVE3aGgvdGtCWkdpRFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDgzNzYzMDU2OjUwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRpWjFLMHc2VTF4dm5qcWVTNmE5Mkw2eThPV3B3dmVDdGlPVHdhNmRTRjMifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzYyNjM5ODUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRHJTIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "semiloore_d_idan",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 2348083763056",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'no', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


                  
