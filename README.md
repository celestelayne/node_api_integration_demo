# Simple API Integration Demo
We'll use the node "request" library to handle external API requests

* Documentation: https://github.com/request/request

**The quick and dirty way:**

- When a user navigates to '/reddit' in the browser (on the FRONTEND)
    - we'll make an api request to reddit...            (on the BACKEND)
        - When that api request gets back to us             (on the BACKEND)
            - we'll process the response data...                (on the BACKEND)
                - and then send a response back to the user         (on the FRONTEND)

But what if something goes wrong!

**The better way:**

Don't make the user/client wait! That round trip could take awhile: client-to-server-to-external-api-to-server-to-client!

- Impliment caching! Why make the same request over and over when you could save the data the first time?
- Schedule a "cron job" or "task" so the api data you need is always updated/fresh.