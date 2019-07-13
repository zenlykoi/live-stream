var fs = require("fs");

var database = {
	rooms : []
};

fs.writeFile('room.json',JSON.stringify(database),function(err){
	console.log(err);
});

