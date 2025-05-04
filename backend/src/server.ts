require('dotenv').config({ path: '.env' })
import App from "./app";

const app = new App();

app.start();