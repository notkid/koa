const mysql = require('mysql')
const config = require('../config/mysql.js')
const {
	HOST: host,
	USERNAME: user,
	PASSWORD: password,
	DATABASE: database,
	PORT: port,
	CONNECTIONLIMIT: connectionLimit
} = config

const pool  = mysql.createPool({
	connectionLimit,
	host,
	user,
	password,
	database,
	port
})

const query = (sql, values) => {
	return new Promise((reject, resolve) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err)
			} else {
				connection.query(sql, (error, results, fileds) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
					connection.release()
				})
			}
		})
	})
}

let users =
	`create table if not exists users(
		id INT NOT NULL AUTO_INCREMENT,
		name VARCHAR(100) NOT NULL,
		pass VARCHAR(100) NOT NULL,
		avator VARCHAR(100) NOT NULL,
		moment VARCHAR(100) NOT NULL,
		PRIMARY KEY ( id )
	);`

let posts =
	`create table if not exists posts(
		id INT NOT NULL AUTO_INCREMENT,
		name VARCHAR(100) NOT NULL,
		title TEXT(0) NOT NULL,
		content TEXT(0) NOT NULL,
		md TEXT(0) NOT NULL,
		uid VARCHAR(40) NOT NULL,
		moment VARCHAR(100) NOT NULL,
		comments VARCHAR(200) NOT NULL DEFAULT '0',
		pv VARCHAR(40) NOT NULL DEFAULT '0',
		avator VARCHAR(100) NOT NULL,
		PRIMARY KEY ( id )
	);`

let comment =
	`create table if not exists comment(
		id INT NOT NULL AUTO_INCREMENT,
		name VARCHAR(100) NOT NULL,
		content TEXT(0) NOT NULL,
		moment VARCHAR(40) NOT NULL,
		postid VARCHAR(40) NOT NULL,
		avator VARCHAR(100) NOT NULL,
		PRIMARY KEY ( id )
	);`

const createTable = (sql) => query(sql, [])

createTable(users)
createTable(posts)
createTable(comment)