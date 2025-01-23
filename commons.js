const bcrypt = require('bcrypt');

class _Date {
    #day;
    #year;
    #month;

    constructor(day = 0, month = 0, year = 0) {
        this.#day = 0;
        this.#year = 0;
        this.#month = 0;
        if (day >= 1 && day <= 31) {
            this.#day = day;
        }
        if (month >= 1 && month <= 12) {
            this.#month = month;
        }
        if (year >= 1800 && year <= (new Date().getFullYear())) {
            this.#year = year;
        }
    }

    getDay() {
        return this.#day;
    }

    getMonth() {
        return this.#month;
    }

    getYear() {
        return this.#year;
    }

    to_str() {
        return `${(this.#day) < 10 ? `0${this.#day}` : this.#day}/${(this.#month) < 10 ? `0${this.#month}` : this.#month}/
                ${(this.#year) < 10 ? `000${this.#year}` : this.#year}`;
    }

    setDay(day) {
        if (day >= 1 && day <= 31) {
            this.#day = day;
            return true;
        }
        return false;
    }

    setMonth(month) {
        if (month >= 1 && month <= 12) {
            this.#month = month;
            return true;
        }
        return false;
    }

    setYear(year) {
        if (year >= 1800 && year <= (new Date().getFullYear())) {
            this.#year = year;
            return true;
        }
        return false;
    }

    str_to_date(_date) {
        let d = new _Date();
        _date = _date.split('/');
        if (_date.length == 3) {
            if (_date[0] >= '1' && _date[0] <= '31') {
                d.setDay(Number(_date[0]));
            }
            if (_date[1] >= '1' && _date[1] <= '12') {
                d.setMonth(Number(_date[1]));
            }
            if (_date[2] >= 1800 && _date[2] <= new Date().getFullYear()) {
                d.setYear(Number(_date[2]));
            }
        }
        return d;
    }

};

const Gender =
{
    MALE: "MALE",
    FEMALE: "FEMALE",
    PREFER_NOT_TO_SAY: "PREFER_NOT_TO_SAY",
};

const UserType =
{
    STUDENT: "STUDENT",
    EDUCATOR: "EDUCATOR",
};

function hash_password(password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

module.exports = { _Date, Gender, UserType, hash_password };