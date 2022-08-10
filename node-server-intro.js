const fs = require("fs")
const http = require("http");
let count = 0
const server = http.createServer((req,res)=>{
    let path = "./views"
    console.log("request incoming",req.url)
    if(req.url==="/"||req.url==="/index.html"){
        
        path+="/index.html"
    }
    else{
        path+=req.url
    }
    if(path.endsWith("css")){
        res.setHeader("content-Type","text/css")
        console.log(path)
        fs.readFile(path,"utf-8",(err,data)=>{
            res.write(data)     
            res.end()

        })
    }
    else if(path.endsWith("html")){
        res.setHeader("content-Type","text/html")
        count++
        fs.readFile(path,{encoding:"utf-8"},(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                let updatedData = data.replace("{{count}}",count)
                res.write(updatedData)
            }
            res.end()
        })
    }

    
})
server.on("close",()=>{
    console.log("server closed")
})
server.listen(8000, ()=>{
    console.log("localhost is running")
})
