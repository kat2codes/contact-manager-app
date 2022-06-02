import path from 'path';
const express = require('express')
var request = require('request')
const app = express()
const port = process.env.HTTP_PORT || 4000

app.use(express.static(path.join(__dirname, 'fe-app', 'build')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// get single user data
app.get('/contact/:userId', (req, res) => {
  var id = req.params.userId;
  var url = 'https://jsonplaceholder.typicode.com/users/' + id;
  request(url , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
          console.error('error:', error); // Print the error if one occurred
        }
    });
})

// get list of users - web api (fake json)
app.get('/contactlist', (req, res) => {
  request('https://jsonplaceholder.typicode.com/users', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
          console.error('error:', error); // Print the error if one occurred
        }
    });
});

// app.post('/user', (req, res) => {
//   res.send('Got a POST request')
// })

// app.put('/user', (req, res) => {
//   res.send('Got a PUT request at /user')
// })

// app.delete('/user', (req, res) => {
//   res.send('Got a DELETE request at /user')
// })

// get favorites
app.get('/getFavorites', (req, res) => {
  res.send('Get favorites')
})

// get weather api 
app.get('/getWeather', (req, res) => {
    request('http://api.weatherstack.com/current?access_key=d9d2d269f4177500a98013d04f4206f4&query=Manila', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsedBody = JSON.parse(body);
            var temp_c = parsedBody['current']['temperature'];
            res.send({temp_c});
        } else {
          console.error('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML for the Google homepage.
        }
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})