# Voyages Contribution API and front-end library

This project supports an important part of the slavevoyages.org web site, the
user contribution system.

The codebase is used to both generate a front-end TS library for consumption in
the Voyages front-end as well as a backend application, that can be run on
Node.js, to support storing and retrieving the contributions.

## Unit tests

`npm run test` should run all unit tests in the project. Some may require a
live database connection and might fail if you do not have that setup in the
local environment.

## Running the server

npm run build-server && node ./output/server/server.js