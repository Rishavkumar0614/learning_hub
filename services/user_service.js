const MySQLController = require("../controllers/mysql_controller.js");
const { hash_password } = require('../commons.js');

class UserService {
    static isUserExists(username, callback) {
        MySQLController.connect((status, result) => {
            if (status) {
                let connectionObj = result;
                connectionObj.query("USE users;", (err, result) => {
                    if (!err) {
                        connectionObj.query(`
                                SELECT * FROM credentials WHERE username = '${username}';
                                `, (err, result) => {
                            if (!err) {
                                callback(!(result.length == 0));
                            }
                            connectionObj.end();
                        });
                    } else {
                        connectionObj.end();
                    }
                });
            }
        });
    }

    static login(username, password) {
        
    }

    static signup(name, username, password, gender, dob, userType) {
        MySQLController.connect((status, result) => {
            if (status) {
                const connectionObj = result;
                UserService.isUserExists(username, (status) => {
                    if (!status) {
                        connectionObj.query("USE users;", (err, result) => {
                            if (!err) {
                                connectionObj.query(`
                                    INSERT INTO credentials (username, password_hash) VALUES (
                                        '${username}',
                                        '${hash_password(password)}'
                                    );
                                    `, (err, result) => {
                                    if (!err) {
                                        connectionObj.query(`
                                            SELECT userid FROM credentials WHERE username = '${username}';
                                            `, (err, result) => {
                                            if (!err) {
                                                let userid = result[0]["userid"];
                                                connectionObj.query(`
                                                    INSERT INTO basic_info (name, username, userid, gender, user_type, dob) VALUES
                                                    (
                                                        '${name}',
                                                        '${username}',
                                                        '${userid}',
                                                        '${gender}',
                                                        '${userType}',
                                                        '${dob.getYear()}-${(dob.getMonth()) < 10 ? `0${dob.getMonth()}` : dob.getMonth()}-${(dob.getDay()) < 10 ? `0${dob.getDay()}` : dob.getDay()}'
                                                    );
                                                    `, (err, result) => {
                                                    if (!err) {
                                                        connectionObj.end();
                                                    }
                                                    else {
                                                        // DELETE THE DATA FROM CREDENTIALS TABLE.
                                                    }
                                                });
                                            }
                                            else {
                                                // DELETE THE DATA FROM CREDENTIALS TABLE.
                                            }
                                        });
                                    } else {
                                        connectionObj.end();
                                    }
                                });
                            } else {
                                connectionObj.end();
                            }
                        });
                    } else {
                        connectionObj.end();
                    }
                });
            }
        });
    }
};