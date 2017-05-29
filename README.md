## Angular2 + NodeJS + Salesforce

A quick POC that augments Salesforce functionality on an externally hosted NodeJS server using Angular2 as a frontend. Currently it exposes only a few custom Salesforce objects. To make this a nice quickstart application a generic salesforce route should be designed.

                 +----------------+                                  
                 |                |                                  
                 |    Angular2    |                                  
                 |                |                                  
                 +--------|-------+                                  
                          |                                          
                          |                                          
                          |                                          
                 +--------|-------+               +----------------+ 
                 |                |               |                | 
                 |     Express    |               |                | 
                 |                |               |                | 
                 |     NodeJs     -----------------   Salesforce   | 
                 |                |               |                | 
                 |     Heroku     |               |                | 
                 |                |               |                | 
                 +----------------+               +----------------+

## Demo

https://protected-dawn-23767.herokuapp.com/


## Environment Variables

To prevent exposure of our Salesforce Credentials, we'll make use of a `.env` file. Create one in the root directory and fill in the following:

```
SF_USERNAME=
SF_PASSWORD=
SF_CLIENTID=
SF_CLIENTSECRET=
```

# Notes

1) Made use of the [express generator](https://www.npmjs.com/package/express-generator)
