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


app.listen(3000);
