const mysql = require('mysql');

class MySQLController {
    static connect(callback, user = 'learning_hub', password = 'Rishav@kumar14', hostname = 'localhost', port = 3306) {
        const connection = mysql.createConnection({
            port: port,
            user: user,
            host: hostname,
            password: password,
        });
        connection.connect((err) => {
            if (err) {
                callback(false, err);
            } else {
                callback(true, connection);
            }
        });
    }
};

module.exports = MySQLController;