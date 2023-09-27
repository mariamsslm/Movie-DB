const express = require('express');
const mongoose = require('mongoose');
const movie =require('./Movie')
const bodyParser=require('body-parser')
const app = express();
app.listen(3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const URL='mongodb+srv://mariamsoulayman146:rswQwGfbJdIcBuGW@cluster0.xrtccpt.mongodb.net/?retryWrites=true&w=majority';

(async ()=>{
  try{
    await mongoose.connect(URL,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
    });
    console.log("connected db")
  }
  catch(error){
    console.log("error")
  }
})();


const date = new Date();
const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
];



//PQ4Mn8BK0y42hRt2

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/test", (req, res) => {
  res.send(`{ status:200, message:"ok"}`);
});

app.get("/time", (req, res) => {
  res.send(`{status:200, message: ${date.getHours()}:${date.getMinutes()}}`);
});

app.get("/hello/:id?", (req, res) => {
  const id = req.params.id || "word";
  res.send(`{status:200, message:"Hello,"${id}}`);
});
app.get("/search", (req, res) => {
  const s = req.query.s;
  if (s) {
    res.send({ status: 200, message: s });
  } else {
    res.send(`{status:500,error:true, message:"you have to provide a search"}`);
  }
});
app.get("/movies/read", (req, res) => {
  res.send({ status: 200, data: movies });
});
app.get("/movies/read/by-date", (req, res) => {
  const years = movies.slice().sort((a, b) => {
    const dateA = a.year;
    const dateB = b.year;
    if (dateA > dateB) return 1;
    else if (dateA < dateB) return -1;
    return 0;
  });
  res.send({ status: 200, data: years });
});
app.get("/movies/read/by-raiting", (req, res) => {
  const ratings = movies.slice().sort((a, b) => {
    const ratingA = a.rating;
    const ratingB = b.rating;
    if (ratingA < ratingB) return 1;
    else if (ratingA > ratingB) return -1;
    return 0;
  });
  res.send({ status: 200, data: ratings });
});
app.get("/movies/read/by-title", (req, res) => {
  const titles = movies.slice().sort((a, b) => {
    const titleA = a.title;
    const titleB = b.title;
    if (titleA > titleB) return 1;
    else if (titleA < titleB) return -1;
    return 0;
  });
  res.send({ status: 200, data: titles });
});
app.get("/movies/read/id/:id", (req, res) => {
  const movie = req.params.id;
  if (movie > movies.length || movie < 1) {
    res.send(
      `{status:404, error:true, message:'the movie ${movie} does not exist'}`
    );
    
  } else {
    res.send({ status: 200, data: movie });
    
  }
});
app.post("/movies/add", (req, res) => {
  const { title, year, rating } = req.body;
  if (!title || !year || isNaN(year) || year.length !== 4) {
    res.send({
      status: 403,
      error: true,
      message: "you cannot create a movie without providing a title and a year",
    });
  } else if (!rating) {
    const newMovie = {
      title,
      year: parseInt(year),
      rating: rating ? parseFloat(rating) : 4,
    };
    movies.push(newMovie);
    res.send(movies);
  } else {
    const newMovie = {
      title,
      year: parseInt(year),
      rating: parseFloat(rating),
    };
    movies.push(newMovie);
    res.send(movies);
  }
});

app.delete("/movies/delete/:id", (req, res)=>{
  let movieId = parseInt(req.params.id);
  if(movieId > movies.length || movieId < 1){
    res.json({status:404,error:true,message:"error"})
  }
  else{
    movies.splice(movieId -1 ,1);
    res.json({status:200,data:movies})
  }
});

app.put("/movies/update/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const newTitle = req.query.title;
  const newRating = parseFloat(req.query.rating);
  if (movieId > movies.length || movieId < 1) {
    res.json(`{status:404,error:true,message:'the movie ${id} does not exist'}`)
  } else {
    if (newTitle !== undefined) {
      movies[movieId].title = newTitle;
    }
    if (!isNaN(newRating)) {
      movies[movieId].rating = newRating;
    }
    res.json(movies);
  } });

 

