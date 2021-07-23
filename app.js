import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql';
// App
const app = express();

// Body Parser
app.use(express.json());

// MYSQL connection
const myDB = mysql.createPool({
    host: process.env.HOST,
    port:process.env.PORTDB,
    user: process.env.UID,
    password:process.env.PSW,
    database:process.env.DB
});

// GET TODOS ROUTE
app.get('/api/gettodos', (req, res)=>{
    // Query
    let myQuery = `SELECT * FROM todos`;
    // Run the query
    myDB.query(myQuery, (error, results)=>{
        if(error){
         return  res.status(500).json(error);
        }
        res.status(200).json(results);
    });
});
// GET SINGLE TODO
app.get('/api/gettodo/:id', (req, res)=>{
    // ID
    const {id} = req.params;
    // Query
    let myQuery = `SELECT * FROM todos WHERE id = ${id}`;
    // Run the query
    myDB.query(myQuery, (error, result)=>{
        if(error){
            res.status(500).json(error);
        }else{
            res.status(200).json(result);
        }
    });
});
// POST CREATE TODO
app.post('/api/createtodo', (req, res)=>{
    // console.log(req.body);
    // ID
    const {title, todo} = req.body;
    // Query
    let myQuery = `INSERT INTO todos (done,title,todo) VALUES (0, '${title}','${todo}')`;
    // Run the query
    myDB.query(myQuery, (error, result)=>{
        if(error){
            res.status(500).json(error);
        }else{
            res.status(201).json(result);
        }
    });
});
//  Update todo
app.put('/api/updatetodo/:id', (req, res)=>{
    console.log(req.body);
    const {id} = req.params;
    // ID
    const {title, todo} = req.body;
    // Query
    let myQuery = `UPDATE todos SET title='${title}', todo='${todo}' WHERE id=${id}`;
    // Run the query
    myDB.query(myQuery, (error, result)=>{
        if(error){
            res.status(500).json(error);
        }else{
            res.status(201).json(result);
        }
    });
});
//  Delete todo
app.delete('/api/deletetodo/:id', (req, res)=>{
    const {id} = req.params;
    // Query
    let myQuery = `DELETE FROM todos WHERE id=${id}`;
    // Run the query
    myDB.query(myQuery, (error, result)=>{
        if(error){
            res.status(500).json(error);
        }else{
            res.status(200).json(result);
        }
    });
});

// Server listener
let PORT = process.env.PORT || 3000;
app.listen(3001, ()=>console.log(`Server beating on port ${PORT}`));