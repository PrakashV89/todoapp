var express = require('express')
var router = express.Router();

var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

router.route('/')
	.get(function(req,res){
		res.send(200,'Yo!');
});

	router.route('/todos')
	.get(function(req,res){
		Todo.find(function(err,todoss){
			console.log('Todo');
		res.send(200,todoss);
		});
})
	.post(function(req,res){
		var todosall = req.body;
		var todolist = todosall.list;
		var todos = todosall.todo;

		console.log(todosall);
 	console.log("data : " + todos);
		console.log('list name : ' + todolist);

		Todo.findOne({list:todolist},function(err,todo){
			if(err){
				return res.send(err);
			}

			if(todo){
				return res.send(500, 'Todo List Name Already Exists.....');
			}
			
			for( i in todos){
				console.log(i);
				console.log(todos[i]);
				var currToDo = todos[i];
				var todo = new Todo();
				todo.list = currToDo.list;
				todo.todo =  currToDo.todo;
				console.log("Posting To Do Task Data............")
				todo.save(function(err,post){
					console.log('sent');
				})
			}

			res.send(200,"Ok");
		})
		
	});

module.exports = router