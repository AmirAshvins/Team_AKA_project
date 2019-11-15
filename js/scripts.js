// #####################
// FIREBASE CONFIG

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA_-CQ7oIjLIeTU8B05p8lD-UbOJ9MXm_Y",
    authDomain: "team-aka.firebaseapp.com",
    databaseURL: "https://team-aka.firebaseio.com",
    projectId: "team-aka",
    storageBucket: "team-aka.appspot.com",
    messagingSenderId: "192089508874",
    appId: "1:192089508874:web:15181dc2fc7a40725ce3f3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function loadDBToStorage() {
    db.collection("assignments").get().then(function (querySnapshot) {
        let assignmentList = [];
        querySnapshot.forEach(function (doc) {
            assignmentDetails = doc.data();
            newAssignment = new assignment(assignmentDetails['course'], assignmentDetails['name'], assignmentDetails['dueDate'],
                assignmentDetails['dueTime'], assignmentDetails['d2lLink'], assignmentDetails['instructions'],
                assignmentDetails['additionalInformation'], assignmentDetails['instructorID']);
            assignmentList.push(newAssignment);
            buildListRow(newAssignment);
        });
        window.localStorage.setItem("assignmentList", JSON.stringify(assignmentList));
        console.log(JSON.parse(window.localStorage.getItem('assignmentList')));
    });
    db.collection("instructors").get().then(function (querySnapshot) {
        let instructorsList = [];
        querySnapshot.forEach(function (doc) {
            instructorsDetails = doc.data();
            newInstructor = new instructor(assignmentDetails['name'], assignmentDetails['email']);
            instructorsList.push(newInstructor);
            buildListRow(newInstructor);
        });
        window.localStorage.setItem("instructorsList", JSON.stringify(instructorsList));
        console.log(JSON.parse(window.localStorage.getItem('instructorsList')));
    });
}


function IDinDB(collectionName, ID) {
    db.collection(collectionName).doc(ID).get()
        .then(function (docSnapshot) {
            if (docSnapshot.exists) {
                db.collection(collectionName).doc(ID).onSnapshot(function (doc) {
                    console.log("Exists.");
                    return true;
                });
            } else {
                console.log("Doesn't exist.");
                return false;
            }
        });
}

class assignment {
    constructor(course, assignmentName, dueDate, dueTime, d2lLink, instructions, additionalInformation, instructorID) {
        this.course = course;
        this.name = assignmentName;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.d2lLink = d2lLink;
        this.ID = 'ass';
        this.instructions = instructions;
        this.additionalInformation = additionalInformation;
        this.instructorID = instructorID;
        for (let i = 0; i < this.d2lLink.length; i++) {
            if (!isNaN(this.d2lLink[i])) {
                this.ID += this.d2lLink[i];
            }
        }
    }
}

class instructor {
    constructor(instructorName, instructorEmail) {
        this.ID = null;
        this.name = instructorName;
        this.email = instructorEmail;
        for (let i = 0; i < this.email.length(); i++) {
            if (email[i] != '@') {
                instructorID += this.email[i];
            } else {
                break;
            }
        }
    }
}

// ##########################
// UTILITIES

function getUrlQueries() {
    let urlQuery = decodeURI(window.location.search);
    let queries = urlQuery.split('?');
    delete queries[0];
    console.log("success");
    return queries;
}

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let monthAndYear = document.getElementById('monthAndYear')

showCalendar(currentMonth, currentYear);


function showCalendar(month, year) {
    let firstDay = new Date(year, month).getDate();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById('calendar-body');

    tbl.innerHTML = '';
    monthAndYear.innerHTML = months[month] + " " + year;

    let date = 1;

    for(let i = 0; i < 6 ; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++){
            
            if (i === 0 && j < firstDay) {
                console.log(firstDay);
                let cell = document.createElement('td');
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }else if (date > daysInMonth) {
                break;
            }else {
                let cell = document.createElement('td');
                let cellText = document.createElement(date);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            date ++;
        }
        tbl.appendChild(row);
    }
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);

}
function next () {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);

}

