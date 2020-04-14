const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repositorio = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0
  };

  repositories.push(repositorio);

  return response.json(repositorio);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {url, title, techs} = request.body;

  const repositorio = repositories.find(repositorio => repositorio.id === id);

  if(!repositorio){
    return response.status(400).json({error: 'Repositório não encontrado'});
  }

  repositorio.url = url;
  repositorio.title = title;
  repositorio.techs = techs;
    
  

  return response.json(repositorio);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositorioIndex = repositories.findIndex(repositorio => repositorio.id === id);
  if(repositorioIndex<0){
    return response.status(400).json({error: 'Repositório não encontrado'});
  }

  repositories.splice(repositorioIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositorio = repositories.find(repositorio => repositorio.id === id);
  if(!repositorio){
    return response.status(400).json({error: 'Repositório não encontrado'});
  }

  repositorio.likes += 1;
  
  return response.json(repositorio) 

});

module.exports = app;
