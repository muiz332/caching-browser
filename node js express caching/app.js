import express from "express"
import router from "./route/routes.js";
import cors from "cors"

const app = express();
app.use(cors())


app.use(express.json())
app.use("/api",router)

app.use(function(req,res){
    return res.send('url tidak tersedia')
})


app.listen(8080,function(){
    console.log("server running on http://127.0.0.1:8080")
})