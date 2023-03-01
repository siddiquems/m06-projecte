/**
   * @file server script. This is the server script, manages all the petitions from the client.
   * @version 1.2
   * @author Siddique Muhammad
*/

// Imports
// Express Framework
var express = require('express');
var app = express();

// Cors para firewall
var cors=require('cors');
app.use(cors());

// Mysql
var mysql = require('mysql');

// Union Server + Angular
const path = require('path'); 
app.use('/', express.static(path.join(__dirname, 'public')))
 
// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Json Web Token
const jwt = require('jsonwebtoken');

// Secret acces token
const accessTokenSecret = 'accesstokensecret';


// --  Routes
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// -- Connection
// connection configurations
var dbConn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'username',
    password: 'password',
    database: 'nodee'
});
 
// connect to database
dbConn.connect(); 


//creem una constant que farà de middleware a qui el faci servir
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // Compara
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }
            // Si no da error, coge el usuario
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


// -- Login
//comprovacio del login
app.post('/login', function (req, res) {
   
    //recullo l'usuari
    let username=req.body.username;
    
    //recullo la contrasenya
    let password=req.body.password;

    // SQL Query
    var sql = 'SELECT * FROM userss WHERE username=? and password=?';
    dbConn.query(sql,[username, password],function(error, result){
      if (error){
        res.send('Username or password incorrect');
      } else {
        if(result.length > 0){
            console.log("login successful")
            console.log(result);

            const accessToken = jwt.sign({ username: result.username,  role: result.role }, accessTokenSecret, {expiresIn: '1h'});

            res.json({ resultats: result[0], accessToken: accessToken})
            console.log(JSON.stringify(result[0]));
            user = result[0];
            
          } else {
            console.log("login incorrect")
            res.send("Incorrect credentials");
          }
      }
    });
})

// Proves al login
// {"username":"username",
// "password":"password"
// }

// -- Register
// Manages registration
app.post('/register', function(req, res) {

    // Required fields
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    let name = req.body.name;
    let age = req.body.age;

    // If there is no username or password
    if (!username && !password) {
        return res.status(400).send({ error:true, message: 'Please provide username and password' });
    }
    
    // SQl statement
    dbConn.query("INSERT INTO userss(username,password,role,name,age) VALUES(?,?,?,?,?)", [username,password,role,name,age], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been registred successfully.' });
    });
})


// -- Get all users
// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM userss', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

// -- Get all books
// Retrieve all books 
app.get('/books',authenticateJWT, function (req, res) {
    dbConn.query('SELECT * FROM books', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'books list.' });
    });
});


// -- Get a book by id
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

// -- Add a new book
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

// Per fer proves amb Postman
// {"name":"book name",
// "description":"jrcj",
// "price":"20"
// }


// -- update book -OK
//  Update user with id /// No funcionaaa
app.put('/update-book/:id', function (req, res) {
    
    // Obtenir la id
    let book_id = req.params.id;
    // console.log(book_id)
    
    let book = req.body;

    // Obtenir les dades
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;


    // Per fer proves!
    // console.log(name);
    // console.log(description);
    // console.log(price);

    // If there is a book or books id, go with the update statement!
    if (!book_id || !book) {
        return res.status(400).send({ error: book, message: 'Please provide book and book_id' });
    }
    // SQL Statement
    var sql = 'UPDATE books SET name=?, description=?,price=? WHERE id=?'
    dbConn.query(sql, [name, description, price, book_id], function(error,results){
        if(error){
          console.log('an error occurred')
          console.log(error)
        }else{
            res.send({ error: false, data: results, message: 'book has been updated successfully.' })
        }
    })

    // -- Una altra manera de fer-ho.
    // dbConn.query("UPDATE books SET name = ?, description = ?, price = ? WHERE id = ?", [book.name, book.description, book.price, book_id], function (error, results, fields) {
    //     if (error) throw error;
    //     return res.send({ error: false, data: results, message: 'book has been updated successfully.' });
    // });
});


// -- Delete book -ok
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

// Set port, 3000
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});


module.exports = app;