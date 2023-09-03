// Create web server

// Import express
const express = require("express");

// Import body-parser
const bodyParser = require("body-parser");

// Import mongoose
const mongoose = require("mongoose");

// Import path
const path = require("path");

// Import dotenv
const dotenv = require("dotenv");

// Import cors
const cors = require("cors");

// Import routes
const routes = require("./routes");

// Import socket
const socket = require("./socket");

// Import http
const http = require("http");

// Import socket.io
const socketio = require("socket.io");

// Create app
const app = express();

// Create server
const server = http.createServer(app);

// Create io
const io = socketio(server);

// Connect to database
dotenv.config();
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to database")
);

// Use cors
app.use(cors());

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use routes
app.use("/api", routes);

// Use static folder
app.use(express.static(path.join(__dirname, "public")));

// Use socket
socket(io);

// Listen server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server started at port ${PORT}`));