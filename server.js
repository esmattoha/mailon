/*

*/
const  dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT || 3000 ;


app.listen(PORT,(err)=>{
    if(!err){
        console.log(`Server Running on port ${PORT}`);
    }
});


