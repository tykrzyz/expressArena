const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if(!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if(!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response 
  res.send(greeting);
});

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if(!a || !b){
    return res.status(400).send('Please provide an a and a b value');
  }

  const sum = parseInt(a) + parseInt(b);

  res.send(`The sum of ${a} and ${b} is ${sum}`);
});

app.get('/cipher', (req, res) => {
  const text = req.query.text.toUpperCase();
  const shift = req.query.shift;

  let encrypted = '';

  for(let i = 0; i < text.length; i++){
    let newCharCode = text.charCodeAt(i) + parseInt(shift);
    if(newCharCode > 90){
      newCharCode -= 26;
    }
    encrypted += String.fromCharCode(newCharCode);
  }

  res.send(encrypted.toLowerCase());
});

app.get('/lotto', (req, res) => {
  const chosenNums = req.query.chosenNums;
  const winningNums = [...Array(6)].map(() => Math.floor(Math.random() * 20) + 1);
  console.log(winningNums);
  let count = 0;
  for(let i = 0; i < winningNums.length; i++){
    chosenNums[i] === winningNums ? count++ : null;
  }

  if(count === 4){
    res.send('Congratulations, you win a free ticket');
  }
  else if(count === 5){
    res.send('Congratulations! You win $100!');
  }
  else if(count === 6){
    res.send('Wow! Unbelievable! You could have won the mega millions!');
  }
  else{
    res.send('Sorry, you lose');
  }
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});