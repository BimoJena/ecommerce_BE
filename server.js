import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import connectDB from './src/config/db.js';

connectDB();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('app started');
})
app.listen(port, () => {
    console.log(`server is running at port: ${port}`);
})