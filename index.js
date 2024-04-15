const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

let movies = [
    { id: 1, name: "Fight Club", year: 1999, rating: 8.1 },
    { id: 2, name: "Inception", year: 2010, rating: 8.7 },
    { id: 3, name: "The Dark Knight", year: 2008, rating: 9 },
    { id: 4, name: "12 Angry Men", year: 1957, rating: 8.9 }
];


app.get('/movies', (req, res) => {
    res.json(movies);
});


app.get("/movies/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const movie = movies.find(movie => movie.id == id)

    if(movie){
        res.json(movie)
    }else{
        Set.status(404).json({message:"This movie non found..."})
    }
})

app.post('/movies', (req, res) => {
 const movie = req.body;
 movies.push(movie)
 res.status(200).json(movie)
});


app.put('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedMovie = req.body;
    movies = movies.map(movie => {
        if (movie.id === id) {
            return { ...movie, ...updatedMovie };
        }
        return movie;
    });
    res.json(movies.find(movie => movie.id === id));
});

app.delete('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    movies = movies.filter(movie => movie.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
