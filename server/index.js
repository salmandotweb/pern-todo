const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const knex = require("knex");
const path = require("path");

// middlewares
app.use(cors());
app.use(express.json());

// Create database object
const db = knex({
	client: "pg",
	connection: {
		host: "localhost",
		user: "postgres",
		port: 5432,
		password: "salman@4200",
		database: "perntodo",
	},
});

// Create multer object
// const imageUpload = multer({
// 	storage: multer.diskStorage({
// 		destination: function (req, file, cb) {
// 			cb(null, "images/");
// 		},
// 		filename: function (req, file, cb) {
// 			cb(null, new Date().valueOf() + "_" + file.originalname);
// 		},
// 	}),
// });

const imageUpload = multer({
	dest: "images",
});

// create a todo

app.post("/todos", async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			"INSERT INTO todo (description) VALUES($1) RETURNING *",
			[description]
		);
		res.json(newTodo.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});

// get all todos

app.get("/allTodos", async (req, res) => {
	try {
		const allTodos = await pool.query(
			"SELECT * FROM todo ORDER BY todo_id DESC"
		);
		res.json(allTodos.rows);
	} catch (error) {
		console.error(error.message);
	}
});

// get newest todos
app.get("/allNewestTodos", async (req, res) => {
	try {
		const allTodos = await pool.query(
			"SELECT * FROM todo ORDER BY todo_id ASC"
		);
		res.json(allTodos.rows);
	} catch (error) {
		console.error(error.message);
	}
});
// get oldest todos
app.get("/allOldestTodos", async (req, res) => {
	try {
		const allTodos = await pool.query(
			"SELECT * FROM todo ORDER BY todo_id DESC"
		);
		res.json(allTodos.rows);
	} catch (error) {
		console.error(error.message);
	}
});
// get a todo

app.get("/todo/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
			id,
		]);
		res.json(todo.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});

// update a todo

app.put("/todo/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;

		const updatedTodo = await pool.query(
			"UPDATE todo SET description = $1 WHERE todo_id = $2",
			[description, id]
		);

		res.json("Todo is updated");
	} catch (error) {
		console.error(error.message);
	}
});

// delete a todo

app.delete("/todo/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
			id,
		]);
		res.json("Todo has been Deleted");
	} catch (error) {
		console.error(error.message);
	}
});

// Image Upload Routes
app.post("/image", imageUpload.single("image"), (req, res) => {
	const { filename, mimetype, size } = req.file;

	const filepath = req.file.path;
	const { todo_id } = req.body;

	db.insert({
		filename,
		filepath,
		mimetype,
		size,
		todo_id,
	})
		.into("image_files")
		.then(() => res.json({ success: true, filename, todo_id }))
		.catch((err) =>
			res.json({ success: false, message: "upload failed", stack: err.stack })
		);
});

// Image Get Routes
app.get("/image/:filename", (req, res) => {
	const { filename } = req.params;
	db.select("*")
		.from("image_files")
		.where({ filename })
		.then((images) => {
			if (images[0]) {
				const dirname = path.resolve();
				const fullfilepath = path.join(dirname, images[0].filepath);
				return res.type(images[0].mimetype).sendFile(fullfilepath);
			}
			return Promise.reject(new Error("Image does not exist"));
		})
		.catch((err) =>
			res
				.status(404)
				.json({ success: false, message: "not found", stack: err.stack })
		);
});

// get all images

app.get("/images", async (req, res) => {
	try {
		const allImages = await pool.query(
			"SELECT * FROM image_files ORDER BY todo_id ASC"
		);
		res.json(allImages.rows);
	} catch (error) {
		console.error(error.message);
	}
});

// get task by id

app.get("/taskImage/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const files = await pool.query(
			"Select * FROM todo INNER JOIN image_files ON image_files.todo_id = todo.todo_id WHERE todo.todo_id = $1",
			[id]
		);
		res.json(files.rows[0]);
	} catch (error) {
		console.log(error.message);
	}
});

// port
const port = 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
