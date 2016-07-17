var mongoose = require('mongoose')

var todo = mongoose.Schema({
	list: String,
	todo: String,
	created_at: {type:Date, default: Date.now}
});

mongoose.model('Todo',todo);