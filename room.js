var fs = require("fs");

var room = {
	dbFile : 'room.json',
	getListRooms : function(){
		var database = JSON.parse(fs.readFileSync(this.dbFile));
		return database;
	},
	addRooms : function(roomid,creator,signal){
		var database = this.getListRooms();
		database.rooms[database.rooms.length] = {
			id : roomid,
			creator : creator,
			signal : signal
		};
		fs.writeFile(this.dbFile,JSON.stringify(database),function(err){
			console.log(err);
		});
	}
};

module.exports = room;