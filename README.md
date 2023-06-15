### The project has been discontinued 15 June 2023

The blockchain was working for 2+ years as a centralized, with enabled replication present, bots and API.
Main result could be considered in https://github.com/OpenPlaceReviews/opendb. 
The project has been published under open license (if not specified somewhere treat it as Public Domain).

# Open Place Reviews
This is a main Landing Page for OpenPlaceReviews site

# Setup

* Clone repo
* cd to repo folder
* set config environment values
  
It possible by copy .env.example to .env 
or set variables on host system environment

Environment variables:
```.dotenv
NODE_ENV
BLOCK_LOAD_LIMIT
BLOCK_SIDEBAR_LIMIT
```

Then

* run ```npm install```
* run ```npm run start```

### Possible npm commands

1. start - build development boundle and open in browser
2. build - build production boundle with minification
