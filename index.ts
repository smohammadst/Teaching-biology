import {Server} from './src/server'

import dot from 'dotenv'
// dot.config()
const DB_URL = "mongodb://127.0.0.1:27017/shopess";
new Server(3000, DB_URL);