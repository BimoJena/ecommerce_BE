import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import connectDB from './src/config/db.js';

// Connect to MongoDB (works for both local and Vercel)
connectDB();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('app started');
})

// OLD CODE - For Render deployment (Traditional server)
// app.listen(port, () => {
//     console.log(`server is running at port: ${port}`);
// });

// NEW CODE - For Vercel deployment (Serverless)
// This condition ensures the server only starts when running locally
// Vercel handles the server automatically, so we skip app.listen() in production
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`server is running at port: ${port}`);
    });
}

// Export app for Vercel serverless functions
export default app;