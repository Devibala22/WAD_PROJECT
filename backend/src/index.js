import dotenv from "dotenv"
import db from './database/db.js';
import {app} from './app.js'
dotenv.config({
    path: './.env'
})

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URL', 'ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
    console.error('Please set them in your deployment platform');
    process.exit(1);
}

console.log(`DB_NAME: ${process.env.DB_NAME}`);
console.log(`PORT: ${process.env.PORT || 5000}`);


db()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT || 5000}`);
    })
})
.catch((err) => {
    console.log("❌ MongoDB connection failed !!! ", err);
    process.exit(1);
})