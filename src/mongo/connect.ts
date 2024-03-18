import mongoose from 'mongoose'; 
  
 async function connectDB (url: string) { 
   mongoose.set('strictQuery', true); 
   mongoose.connect(url) 
     .then(() => console.log('connected to mongo')) 
     .catch((err: any) => { 
       console.error('failed to connect with mongo'); 
       console.error(err); 
     }); 
 }; 
  
 export default connectDB;