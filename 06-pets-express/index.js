const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pets = [
  { id: 1, name: 'jacky', animal: 'dog' }
];

/*
  HTTP method:
  - GET, POST, PUT DELETE

  CRUD:
  - Create, Read, Update, Delete

  /pets => routing
*/


app.get('/', (request, respond) => {
  respond.send('Hello WorlD');

});

app.get('/pets', (request, respond) => {
  // proses Read
  respond.send({
    status: 200,
    data: pets
  });
});

app.post('/pets', (request, respond) => {
  // proses Create
  const animalProfile = request.body
  pets.push({
    id: pets.length + 1,
    name: animalProfile.name,
    animal: animalProfile.animal
  });

  respond.send({
    status: 200,
    data: pets
  });
});

app.put('/pets/:id', (request, respond) => {
  // id, name, animal
  // proses lanjut disini
  const animalProfile = pets.find(c => c.id === parseInt(request.params.id));
  
  if (!animalProfile) return respond.status(404).send('The course with the given ID was not found.');

  animalProfile.name = request.body.name;
  animalProfile.animal = request.body.animal;

  respond.send({
    status: 200,
    data: pets
  });
});

app.delete('/pets/:id', (request, respond) => {
  // id, name, animal
// proses lanjut disini
  const animalProfile = pets.find(c => c.id === parseInt(request.params.id));

  const index = pets.indexOf(animalProfile);
  pets.splice(index, 1);

  respond.send({
    status: 200,
    data: pets
  });
});




app.listen(3000, () => {
  console.log('server running on port 3000')
});
