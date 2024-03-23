import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './mongo/connect';
import {logger} from './logger'
import {authenticate} from './middleware/authenticate';
import { notificationRoute, updateChannelRoute} from './routes/index';
import { Time } from './constants/system';

// Initial config
dotenv.config()
const app  = express();
const port = process.env.PORT || 10000


//Apply all middleware here***
//Block except allowedOrigins
 const allowedOrigins: string[] = [];
 const isOriginAllowed = (origin: string) => allowedOrigins.includes(origin); 
  

 const customOrigin: any = (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
  if (!origin || isOriginAllowed(origin)) { 
    callback(null, true); 
  } else { 
    callback(new Error('Not allowed by CORS'));
  } 
};

app.use(cors({ 
  origin: customOrigin
}));

app.use(express.json({ limit: '50mb' })); 
app.use(helmet());

//Configure rate limiting max 50 request per 15min
const limiter = rateLimit({
  windowMs: 15 * Time.min,
  max: 50,
});
app.use(limiter);

// Handle the number of proxies between server and client
// This is not necessary if your are running the server locally or
// if the server is being hosted without proxies
// app.set('trust proxy', 3);

// Apply authentication middleware to all routes except '/api/v1/register'
// app.use((req: Request, res: Response, next: NextFunction) => {
//     authenticate(req, res, next);
// });

//Add routes to app here
app.use('/api/v1/notify', notificationRoute);
app.use('/api/v1/update-channel', updateChannelRoute);


async function startServer (){ 
   try { 
    // if(!process.env.MONGODB_URL){
    //   throw new Error('Invalid MongoDB URL')
    // }
    //  connectDB(process.env.MONGODB_URL); 
     app.listen(port, () => console.log(`Server started on port ${port}`)); 
   } catch (error) { 
     logger.error(error); 
   } 
 }; 

 startServer();
 
 