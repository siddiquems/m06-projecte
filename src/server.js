var express = require('express');
var app = express();
var cors=require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// Union
const path = require('path'); 

app.use('/', express.static(path.join(__dirname, 'public')))
 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Cors para firewall
app.use(cors());

// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// connection configurations
var dbConn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'username',
    password: 'password',
    database: 'node'
});
 
// connect to database
dbConn.connect(); 

//comprovacio del login
app.post('/login', function (req, res) {
   
    //recullo l'usuari
    let username=req.body.username;
    
    //recullo la contrasenya
    let password=req.body.password;
    
    //connexio
    // dbConn.connect(function(err) {
    //   if (err) {
    //       console.error('Error connecting: ' + err.stack);
    //       return;
    //   }
    //   console.log('Connected as id ' + connection.threadId);
    // });
    
    // console.log(username);
    // console.log(password);

    // SQL Query
    var sql = 'SELECT * FROM userss WHERE username=? and password=?';
    dbConn.query(sql,[username, password],function(error, result){
      if (error){
        res.send('Username or password incorrect');
      } else {
        console.log("Login successful")
        console.log(result[0]);
        res.json(result[0]);
      }
    });
})

// Proves al login
// {"username":"john",
// "password":"pass2"
// }

// Register
app.post('/register', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (!username && !password) {
        return res.status(400).send({ error:true, message: 'Please provide username and password' });
    }
 
    dbConn.query("INSERT INTO userss(username,password) VALUES(?,?)", [username,password], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been registred successfully.' });
    });

})

// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM userss', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

// Retrieve all books 
app.get('/books', function (req, res) {
    dbConn.query('SELECT * FROM books', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'books list.' });
    });
});

// Retrieve book with id - OK
app.get('/read-book/:id', function (req, res) {
 
    let book_id = req.params.id;
 
    if (!book_id) {
        return res.status(400).send({ error: true, message: 'Please provide book id' });
    }
 
    dbConn.query('SELECT * FROM books where id=?', book_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'book with data.' });
    });
 
});

// Add a new book  - OK
app.post('/add-book', function (req, res) {
 
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;

    // Proves amb console log
    console.log(name);
    console.log(description);
    console.log(price);

    if (!name && !description && !price) {
        return res.status(400).send({ error:true, message: 'Please provide book' });
    }
 
    dbConn.query("INSERT INTO books(name,description, price) VALUES(?,?, ?)", [name,description, price], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New book has been created successfully.' });
    });
});

// Per fer proves
// {"name":"book name",
// "description":"jrcj",
// "price":"20"
// }

//  Update user with id /// No funcionaaa
app.put('/update-book/:id', function (req, res) {
 
    let book_id = req.params.id;
    console.log(book_id)
    
    let book = req.body;
    console.log(book);
 
    if (!book_id || !book) {
        return res.status(400).send({ error: book, message: 'Please provide book and book_id' });
    }
 
    dbConn.query("UPDATE books SET name = ?, description = ?, price = ? WHERE id = ?", [book, book_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'book has been updated successfully.' });
    });
});


//  Delete user -- Funciona
app.delete('/delete-book/:id', function (req, res) {
 
    // let book_id = req.body.book_id;

    let book_id = req.params.id;

    console.log(book_id)
    if (!book_id) {
        return res.status(400).send({ error: true, message: 'Please provide book id' });
    }
    dbConn.query('DELETE FROM books WHERE id = ?', [book_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Book has been deleted successfully.' });
    });
}); 

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;