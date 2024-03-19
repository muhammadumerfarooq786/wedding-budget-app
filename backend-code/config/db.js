import exp from "constants";
import  mongoose  from "mongoose";

const Connect_DB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log(`Successful Connection ${conn} `.cyan.underline);
    }catch(err){
        console.log(`Unsuccessful Connection ${err} `.red.underline.bold);
    }
}
export default Connect_DB;