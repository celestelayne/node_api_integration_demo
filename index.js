// Simple API Integration Demo
// We'll use the "request" library to handle external API requests
// https://github.com/request/request

var express = require('express'),
    app = express(),
    request = require('request');

// When a user navigates to '/reddit' in the browser (on the FRONTEND)
// we'll make an api request to reddit...            (on the BACKEND)
// When that api request gets back to us             (on the BACKEND)
// we'll send the api data over to the user          (on the FRONTEND)
// but you could also save it to a database, or parse it, or mash it up w/ other data!

// REDDIT EXAMPLE
app.get('/reddit', function(req, res){

  request.get({
    uri: "http://www.reddit.com/r/funny.json"
  }, function(err, data){
    // okay, the reddit api data is back!
    res.send(data); // Let's hand it over to the frontend!
  })

})

// GIPHY EXAMPLE
app.get('/giphy', function(req, res){
  
  request.get({
    uri: "http://api.giphy.com/v1/gifs/search",
    // this time we have a query string
    qs: {
      q: "funny+cat",
      api_key: "dc6zaTOxFJmzC"
    }
  }, function(err, data){
    // okay, the giphy api data is back!
    // YOUR CODE HERE!
    // Maybe save api data to the database? Or parse it?
    res.send(data); // or send it on back!
  })

})

// HOME PAGE
app.get('/',function(req,res){
  res.send(
    "<h1>Backend API integrations are fun!</h1>" +
    "<a href='/giphy'>giphy</a> | " +
    "<a href='/reddit'>reddit</a>"
  );
})

app.listen(3000);