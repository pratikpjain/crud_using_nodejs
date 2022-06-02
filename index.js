const mysql = require('mysql');

const express = require('express');

var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "EmployeeDB"
});

mysqlConnection.connect((err)=>{
    if(!err) {
        console.log("Success");
    }
    else {
        console.log("Error");
    }
});

app.listen(3000, ()=>console.log("Running"));

app.get('/employees', (req, res)=>{
    mysqlConnection.query("Select * from employee", (err, rows, fields)=>{
        if(!err) {
            res.send(rows);
        }
        else console.log("Error");
    })
});

app.get('/employees/:id', (req, res)=>{
    mysqlConnection.query("Select * from employee where emp_id = ?",[req.params.id], (err, rows, fields)=>{
        if(!err) {
            res.send(rows);
        }
        else console.log("Error");
    })
});

app.delete('/employees/:id', (req, res)=>{
    mysqlConnection.query("delete from employee where emp_id = ?",[req.params.id], (err, rows, fields)=>{
        if(!err) {
            res.send("Record has been deleted successfully!!");
        }
        else console.log("Error");
    })
});

app.post('/employees/', (req, res)=>{
    let emp = req.body;
    var sql = "Insert into employee values(?, ?, ?, ?)";
    mysqlConnection.query(sql,[emp.emp_id, emp.emp_name, emp.emp_desgn, emp.emp_sal], (err, rows, fields)=>{
        if(!err) {
            res.send("Record has been Inserted successfully!!");
        }
        else console.log("Error");
    })
});

app.put('/employees', (req, res)=>{
    let emp = req.body;
    var sql = "update employee set emp_name = ?, emp_desgn = ?, emp_sal = ? where emp_id = ?";
    mysqlConnection.query(sql,[emp.emp_name, emp.emp_desgn, emp.emp_sal, emp.emp_id], (err, rows, fields)=>{
        if(!err) {
            res.send("Record has been updated successfully");
        }
        else console.log("Error");
    })
});
