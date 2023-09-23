const express = require("express")
const app = express()
const date = new  Date()
const movies = [
     {title: 'Jaws',year: 1975,rating: 8}, 
     {title: 'Avatar',year: 2009,rating: 7.8}, 
     {title: 'Brazil',year: 1985,rating: 8 },
     {title: 'الإرهاب والكباب',year: 1992,rating: 6.2}]
    

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
app.get('/search',(req,res)=>{

    const s = req.query.s 
    if(s) {
        res.send({status:200, message:s})

    }
    else{
        res.send(`{status:500,error:true, message:"you have to provide a search"}`)

    }    
})
app.get('/movies/add',(req,res)=>{
    
})
app.get('/movies/get',(req,res)=>{
    res.send({status:200, data:movies })
    
})
app.get('/movies/get/by-date',(req,res)=>{
    const years = movies.slice().sort((a,b)=>{
        const dateA = a.year;
        const dateB = b.year;
        if(dateA > dateB) return 1;
        else if(dateA<dateB)return -1;
        return 0;
    })
    res.send({status:200, data:years})
})
app.get('/movies/get/by-raiting',(req,res)=>{
    const ratings = movies.slice().sort((a,b)=>{
        const ratingA = a.rating;
        const ratingB = b.rating;
        if(ratingA < ratingB)return 1;
        else if (ratingA > ratingB)return -1;
        return 0;
    })
    res.send({status:200, data:ratings})
})
app.get('/movies/read/by-title',(req,res)=>{
    const titles = movies.slice().sort((a,b)=>{
        const titleA = a.title;
        const titleB = b.title;
        if(titleA > titleB)return 1;
        else if(titleA < titleB)return -1;
        return 0;
    })
    res.send({status:200, data:titles})
})



app.get('/movies/edit',(req,res)=>{
    
})
app.get('/movies/delete',(req,res)=>{
    
})

app.listen(3000);
