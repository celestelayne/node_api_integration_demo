var express = require('express'),
    app = express(),
    request = require('request');

// REDDIT FRONTPAGE AMA EXAMPLE
app.get('/top_ama', function(req, res){

  console.log("Requesting data from reddit...")
  request.get({
    uri: "http://www.reddit.com/.json"
  }, function(err, apiRes, apiBody){
      
      if (err) {
        console.log("Uh oh! Got an error from reddit.")
        res.send("There was an error")
      }

      console.log("Reddit api response is back!")
      var responseData = JSON.parse(apiBody);

      console.log("checking for AMA on the front page...")
      var frontPageHasAMA = responseData.data.children.some(function(item){
        return item.data.subreddit === "IAmA";
      });

      if (frontPageHasAMA) {
        console.log("Found one!")
        res.send("Yay! There's an AMA on the front page of <a href='http://www.reddit.com'>reddit</a> today! :)")
      } else {
        console.log("Nope, nothing!")
        res.send("Sorry! No AMA today... :(");
      }
      
  })

})

// GIPHY TOP GIF EXAMPLE
app.get('/top_gif', function(req, res){
  
  console.log("Requesting data from giphy...")
  request.get({
    uri: "http://api.giphy.com/v1/gifs/trending",
    qs: {
      limit: 1,
      api_key: "dc6zaTOxFJmzC"
    }
  }, function(err, apiRes, apiBody){
    
      if (err) {
        console.log("Uh oh! Got an error from reddit.")
        res.send("There was an error")
      }

      console.log("Giphy api response is back!")
      var body = JSON.parse(apiRes.body)

      console.log("Grabbing the top trending gif")
      res.send("<img src='" + body.data[0].images.original.url + "'>");

  })

})

// HOME PAGE
app.get('/',function(req,res){
  res.send(
    "<h1>Backend API integrations are fun!</h1>" +
    "<a href='/top_gif'>What's the top gif on Giphy?</a> | " +
    "<a href='/top_ama'>Is there an AMA on Reddit's front page?</a>"
  );
})

app.listen(3000);