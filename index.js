const express = require("express")
const app = express()
const date = new  Date()


app.get('/',(req,res)=>{
    res.send("OK")
})

app.get('/test',(req,res)=>{
    res.send(`{ status:200, message:"ok"}`)
})

app.get('/time',(req,res)=>{
    res.send(`{status:200, message: ${date.getHours()}:${date.getMinutes()}}`)
})

app.get('/hello/:id?',(req,res)=>{
    const id = req.params.id || 'word'
    res.send(`{status:200, message:"Hello,"${id}}`)
})
app.get('/search/:s?',(req,res)=>{
    const s = req.query.s 
    if(s) {
        res.send(`{status:200, message:"Hello,"${s}}`)

    }
    else{
        res.send(` {status:500,error:true, message:"you have to provide a search"}`)

    }
    
})

app.listen(3000);
