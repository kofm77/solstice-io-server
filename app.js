const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
var utilD = require('./utilData.json');
const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});
const getApiAndEmit = socket => {
  try {
  	var filteredData = [];
    var filteredData2 = [];
    var filteredData3 = [];
    var filteredData4 = [];
  for (var key in utilD) {
      if (utilD.hasOwnProperty(key)) {
        
            filteredData.push(utilD[key].year+'-'+utilD[key].month);
            filteredData2.push(utilD[key].kwh);
            filteredData3.push(utilD[key].bill);
            filteredData4.push(utilD[key].savings);
        
      }
    }    
    socket.emit("FromAPI", filteredData);
    socket.emit("FromAPI2", filteredData2);
    socket.emit("FromAPI3", filteredData3);
    socket.emit("FromAPI4", filteredData4);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));