/*****Declaration*****/

var express = require("express");
var room = require("./room");
var Base64 = require("./my_modules/base64.js");
var app = express();							
app.use(express.static("public"));
app.set("view engine", "ejs");					
app.set("views", "./views");					
var server = require("http").Server(app);		
var io = require("socket.io")(server);		
const port = process.env.PORT || 3000;
server.listen(port,function(){
	console.log(`Server starting in port ${port} ...`);
});

/*****Socket*****/

io.on('connection', function(socket){

	setInterval(function(){
		socket.emit('client-counts',{
	  		count : io.engine.clientsCount
	  	});	
	},1000);
																						
  	console.log('Mess : co nguoi vua ket noi id = ' + socket.id);

  	socket.on('live-stream',function(data){
  		if(data.type == 'create-room'){
  			room.addRooms(data.roomId,data.id,Base64.encode(JSON.stringify(data.signal)));
  		}
  		io.emit('live-stream',data);
  	});

});

/*****Routing*****/

app.get('/',function(request,response){
	response.render('index',{ listRooms : room.getListRooms().rooms });
});