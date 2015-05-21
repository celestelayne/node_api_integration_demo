# Simple API Integration Demo
This demo integrates with Reddit ('/top_ama') and Giphy ('/top_gif').

We'll be using the node "Request" library to handle external API requests

* Documentation: https://github.com/request/request

**The quick and dirty way:**

- When a user navigates to '/top_gif' in the browser (on the FRONTEND)
    - we'll make an api request to giphy...            (on the BACKEND)
        - When that api request gets back to us             (on the BACKEND)
            - we'll process the response data...                (on the BACKEND)
                - and then send a response back to the user         (on the FRONTEND)
                    - and then the user will load that gif...

Ugh! That round trip could take awhile!

Here are three patterns to consider:
* client-to-server-to-external-api-to-server-to-client
    - slow and redundant!
* client-to-server-to-cache-to-client
    - only the first request goes all the way to the external api!
* client-to-server-to-database-to-client
    - routine tasks keep the data fresh

## Making API Requests

It's just an HTTP request!

Remember AJAX and callbacks in jQuery?

``` js
$.get("http://api.example.com/v1/trending", function(response){
    // code in here!
})
```

Using the "Request" library works the same way:

``` js
// request = require('request');
request.get({uri: "http://www.reddit.com/.json"}, function(err, apiRes, apiBody){
    // code in here!
})
```

## Why not make API calls from the client-side/browser?

- Servers are better for processing / parsing large amounts of data!
    - Caching
        + Why make the same request over and over when you could save the data the first time?
    - Cron Jobs / Tasks
        + Keep your data fresh by scheduling periodic API calls
- Most APIs have rate limits
    + Requests per second / hour / day.
        + Hard to enforce when you have multiple clients!
- Most APIs are sensitive
    + Expose User Data
    + Require an API Key
        + No place to hide it on the frontend! Easy to steal.
- Servers are made for it!