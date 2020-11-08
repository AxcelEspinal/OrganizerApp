const path = require('path');
const fs = require('fs');
const arguments = process.argv.slice(2);
const groupBy = parseInt(arguments[2]);
var students, topics;

if (arguments.length > 2) {
    try {
        students = fs
            .readFileSync(path.resolve(arguments[0])).toString().split("\r\n");
        topics = fs
            .readFileSync(path.resolve(arguments[1])).toString().split("\r\n");

        if (groupBy > students.length) {
            return console.log("Group number can not be higher than the student number.");
        }
    } catch (error) {
        console.log('Error!');
    }
} else {
    console.log("Please write the path to the files.")
}

const shuffle = (array) => {
    var currIndex = array.length, tempVal, randomIndex;

    while (0 !== currIndex) {
        randomIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1;

        tempVal = array[currIndex];
        array[currIndex] = array[randomIndex];
        array[randomIndex] = tempVal;
    }
    return array;

};

const chunk = (a, n, balanced) => {
    if (n < 2) return [a];

    var len = a.length,
        out = [],
        i = 0, size;

    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, (i += size)))
        }
    }

    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, (i += size)));
        }
    }

    else {
        n--;
        size = Math.floor(len / n);
        if (len % size === 0) size--;
        while (i < size * n) {
            out.push(a.slice(i, (i += size)));
        }
        out.push(a.slice(size * n));
    }
    return out;
}

const organize = (students, topics, num) => {
    const shuffStudents = chunk(shuffle(students), num, true);
    const shuffTopics = chunk(shuffle(topics), num, true);

    let orgArray = [];

    for (let i = 0; i < shuffStudents.length; i++) {
        orgArray[i] = [`Group #${i + 1}: `, 'Students: ', shuffStudents[i], 'Topics: ', shuffTopics[i]];
    }

    return orgArray;
}

console.log(organize(students, topics, groupBy));