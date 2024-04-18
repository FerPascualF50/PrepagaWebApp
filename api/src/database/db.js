import mongoose from "mongoose"
import 'dotenv/config';

mongoose
   .connect(process.env.MONGO_DB_URI)
   .then(() => console.log('DB connected'))
   .catch((e) => console.log(e.message))

export default mongoose;