import mysql from "mysql"

export const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Saurabh@1234",
    database:"mydb"
})
