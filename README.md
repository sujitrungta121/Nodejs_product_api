<!-- # Nodejs_product_api -->

GITHUB_REPO=https://github.com/sujitrungta121/Nodejs_product_api.git
POSTMAN_LINK="https://github.com/sujitrungta121/Nodejs_product_api.git"


SETUP_DETAILS:

1.CLONE THE PROJECT WITH THE GIVEN URL ABOVE (GITHUB_REPO)
2.RUN npm i for installing all the dependencies used in the project.
3.Generate a Secret key for JWT  authentication.
4.Create a Mongo db as a Database.
5.The project is ready to run your can run the project with npm start.

EXPLANATION FOR my approach

My entry point for the project is index.js where are the configuration regarding the server creation, all the routes are added here.
I have total 4 folders in my project namely routes,controllers, models,auth.
The route folder have two files one for the user routes like  registration, login, and products where all the routes for the product have been listed
The controller folder have two files one for the user and prodocts where all the callback function required in the route is written in this folder for particular routes
the models folder contain the user model and the product model
and the final auth folder contains the verifyToken and generating Token.
This design of my folder is readable, structurable which keep other user easy to understand and implement.
