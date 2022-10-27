## To run the project, you may need some variables in a `.env` file at the root path of the project.

### DATABASE (MongoDB)

- `DB_NAME` - The name you want for your database
- `DB_USERNAME` - The username of the user of your MongoDB database
- `DB_PWD` - The password of the user of your MongoDB database
- `DB_CLUSTER` - The connection name of the cluster you want to use

<sub>You can get the connection cluster name from the string MongoDB gives you in **Connect** section</sub>

### CLOUDINARY

**_Cloudinary is used to store the images you upload to the dashboard_**

- `CLOUDINARY_CLOUD_NAME` - The name of the cloud you want to use for Cloudinary
- `CLOUDINARY_API_KEY` - Your API key to use the Cloudinary API
- `CLOUDINARY_API_SECRET` - Your API secret to use the Cloudinary API

### API

- `API_KEY` - Any API_KEY you want to use for the endpoints

### JWT

- `JWT_USER_SECRET` - The secret token you want to use for the JWT cookie
