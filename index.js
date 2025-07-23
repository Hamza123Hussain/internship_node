import express from 'express'
import router from './routes/DummyRoute.js'
import cors from 'cors'
import { DB_CONNECTED } from './Db/Connection.js'
import { UserRouter } from './routes/UserRoute.js'
//1. Import the Express module
// This line brings the Express.js library into our file.
// 2. Create an Express application instance
// This 'app' object is the core of our Express application.
// It has methods for routing HTTP requests, configuring middleware, and more.
const app = express()
// 3. Define the port number
// This is the network port our server will listen on.
// Common ports for web servers are 80 (HTTP), 443 (HTTPS), 3000, 8080.
// We're using 3000 here, which is a common choice for development.
// ===========================
// MIDDLEWARE
// ===========================
// express.json() is a middleware that allows our app to read JSON data sent in HTTP requests.
// Without this, req.body would be undefined.
app.use(express.json())
// This is important when frontend and backend run on different ports/domains
app.use(cors())
const port = 3000
// 4. Define a Route Handler for the Root URL ("/")
// This is where we tell our server how to respond to an incoming GET request
// made to the root path (e.g., http://localhost:3000/).
// 'app.get()' is a method that handles HTTP GET requests.
// The first argument is the path ('/') our server should listen for.
// The second argument is a callback function that will be executed when a request
// matches this path and HTTP method.
// This callback function receives two arguments:
//   - 'req' (request object): Contains information about the incoming HTTP request
//     (e.g., headers, URL parameters, body data).
//   - 'res' (response object): Used to send an HTTP response back to the client
//     (e.g., sending text, JSON, HTML, or redirecting).
app.get('/', (req, res) => {
  // 'res.send()' is a convenient method to send a response to the client.
  // It can send strings, arrays, objects, or buffers.
  // Express automatically sets the Content-Type header based on the type of data sent.
  // In this case, it will be 'text/html'.
  res.send('Hello, Interns! Welcome to Node.js with Express!')
})
// 5. Define another Route Handler for a different URL ("/about")
// This demonstrates how to create multiple routes for different parts of your application.
app.get('/about', (req, res) => {
  // We can send different content for different routes.
  res.send('This is the About page of our simple Express app.')
})
// 6. Start the Server
// 'app.listen()' is a method that binds the application to a specified port
// and starts listening for incoming HTTP requests.
// The first argument is the port number (defined as 'port' above).
// The second argument is an optional callback function that executes once the server
// has successfully started listening. This is useful for logging a message to the console.

// Here we are mounting the userRoutes under the /users path.
// This means every route defined inside userRoutes will start with /users.
app.use('/users', router)
DB_CONNECTED().then(() => {
  app.listen(port, () => {
    // We use template literals (backticks ``) for easy string formatting.
    // This message will appear in your terminal when you run 'node your_file_name.js'.
    console.log(`Server is running at http://localhost:${port}`)
    console.log('You can now open your browser and visit the URL above.')
    console.log('HELLO INTERN.......hlloo.')
  })
})

app.use('/api/User', UserRouter)
