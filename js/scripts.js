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

function loadAssignmentsToStorage() {
    db.collection("assignments").get().then(function (assignmentsQuery) {
        let assignmentList = [];
        assignmentsQuery.forEach(function (doc) {
            let assignmentDetails = doc.data();
            let newAssignment = new assignment(assignmentDetails['course'], assignmentDetails['name'], assignmentDetails['dueDate'],
                assignmentDetails['dueTime'], assignmentDetails['d2lLink'], assignmentDetails['instructions'],
                assignmentDetails['additionalInformation'], assignmentDetails['instructorID']);
            assignmentList.push(newAssignment);
        });
        window.localStorage.setItem("list", JSON.stringify(assignmentList));
        console.log(JSON.parse(window.localStorage.getItem('list')));
        window.localStorage.assignmentsLoaded = true;
    });
}

function loadInstructorsToStorage() {
    db.collection("instructors").get().then(function (instructorsQuery) {
        let instructorsList = [];
        instructorsQuery.forEach(function (doc) {
            let instructorsDetails = doc.data();
            let newInstructor = new instructor(instructorsDetails['name'], instructorsDetails['email']);
            instructorsList.push(newInstructor);
        });
        window.localStorage.setItem("instructorsList", JSON.stringify(instructorsList));
        console.log(JSON.parse(window.localStorage.getItem('instructorsList')));
        window.localStorage.instructorsLoaded = true;
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

// ==========================================
// CLASS DEFINITIONS
// ==========================================
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

    sendToDB() {
        db.collection("assignments").doc(this.ID).set({
            'course': this.course,
            'name': this.name,
            'dueDate': this.dueDate,
            'dueTime': this.dueTime,
            'd2lLink': this.d2lLink,
            'instructions': this.instructions,
            'additionalInformation': this.additionalInformation,
            'instructorID': this.instructorID
        });
    }

    kill() {
        db.collection("assignments").doc(this.ID).delete();
    }
}

class instructor {
    constructor(instructorName, instructorEmail) {
        this.ID = '';
        this.name = instructorName;
        this.email = instructorEmail;
        for (let i = 0; i < this.email.length; i++) {
            if (this.email[i] != '@') {
                this.ID += this.email[i];
            } else {
                break;
            }
        }
    }
    sendToDB() {
        db.collection("instructors").doc(this.ID).set({
            'name': this.name,
            'email': this.email
        });
    }

    kill() {
        db.collection("users").doc(this.ID).delete();
    }
}

class user {
    constructor(ID = null, name = null) {
        this.ID = ID;
        this.name = name; // may never be used
        this.courseList = [];
        this.completedAssignmentsList = [];
    }

    sendToDB() {
        db.collection("users").doc(this.ID).set({
            'name': this.name,
            'groupList': this.courseList,
            'completedAssignments': this.completedAssignmentsList
        });
    }

    addGroup(newGroup) {
        this.groupList.push(newGroup);
    }

    removeGroup(groupId) {
        delete this.groupList[this.courseList.indexOf(newGroup)];
    }

    addCompletedAssignment(completedAssignment) {
        this.completedAssignmentsList.push(completedAssignment);
    }

    kill() {
        db.collection("users").doc(this.ID).delete();
    }
}

class group {
    constructor(ID, name = null, school = null, term = null) {
        this.ID = ID;
        this.name = name; //may never be used
        this.courseList = [];
        this.school = school; // may never be used
        this.term = term; // may never be used
        this.instructorList = [];
        this.admins = [];
    }

    addAdmins(newAdmin) {
        try {
            this.admins.concat(newAdmin);
        } catch{
            this.admins.push(newAdmin);
        }
    }

    addCourses(newCourse) {
        try {
            this.courseList.concat(newCourse);
        } catch{
            this.courseList.push(newCourse);
        }
    }

    removeCourse(trashCourse) {
        delete this.courseList[this.courseList.indexOf(trashCourse)];
    }

    addInstructors(newInstructors) {
        try {
            this.instructorList.concat(newInstructors);
        } catch{
            this.instructorList.push(newInstructors);
        }
    }

    removeInstructor(instructorID) {
        delete this.instructorList[this.instructorList.indexOf(instructorID)];
    }

    sendToDB() {
        db.collection("groups").doc(this.ID).set({
            'name': this.name,
            'school': this.school,
            'term': this.term,
            'courseList': this.courseList,
            'instructorList': this.instructorList
        });
    }

    kill() {
        db.collection("groups").doc(this.ID).delete();
    }
}

// ##########################
// UTILITIES

function getUrlQueries() {
    let urlQuery = decodeURI(window.location.search());
    let queries = urlQuery.split('?');
    delete queries[0];
    console.log("success");
    return queries;
}

function getElementByIdByCollectionFromLocStorage(elementID, collectionName) {
    let collectionList = JSON.parse(window.localStorage[collectionName]);
    for (let i = 0; i < collectionList.length; i++) {
        if (collectionList[i].ID === elementID) {
            return collectionList[i];
        }
    }
}

// DEPRECATED

// function getAssignmentsByCourseList(courseList) {
//     localStorage.assignmentList = '';
//     courseList.forEach(element => {
//         db.collection('assignments').where('course', '==', element)
//             .get()
//             .then(function (assignmentsQuery) {
//                 let assignmentList = [];
//                 assignmentsQuery.forEach(function (doc) {
//                     let assignmentDetails = doc.data();
//                     let newAssignment = new assignment(assignmentDetails['course'], assignmentDetails['name'], assignmentDetails['dueDate'],
//                         assignmentDetails['dueTime'], assignmentDetails['d2lLink'], assignmentDetails['instructions'],
//                         assignmentDetails['additionalInformation'], assignmentDetails['instructorID']);
//                     assignmentList.push(newAssignment);
//                 });
//                 localStorage.assignmentList += JSON.stringify(assignmentList);
//             })
//             .catch(function (error) {
//                 console.log('we fucked up', error);
//             });
//     });
// }

function queryDB(valueList, locStorageContainer, collection, propertyToQuery, handlerFunction) {
    localStorage[locStorageContainer] = '';
    valueList.forEach(element => {
        db.collection(collection).where(propertyToQuery, '==', element)
            .get()
            .then(function (query) {
                handlerFunction(query);
            })
            .catch(function (error) {
                console.log('we fucked up', error);
            });
    });
}

function assignmentQueryManager(assignmentsQuery) {
    let assignmentList;
    if (localStorage.assignmentList != ''){
        assignmentList = JSON.parse(localStorage.assignmentList);
    }else{
        assignmentList = [];
    }
    assignmentsQuery.forEach(function (doc) {
        let assignmentDetails = doc.data();
        let newAssignment = new assignment(assignmentDetails['course'], assignmentDetails['name'], assignmentDetails['dueDate'],
            assignmentDetails['dueTime'], assignmentDetails['d2lLink'], assignmentDetails['instructions'],
            assignmentDetails['additionalInformation'], assignmentDetails['instructorID']);
        assignmentList.push(newAssignment);
    });
    localStorage.assignmentList = JSON.stringify(assignmentList);
}

function groupQueryManager(groupQuery) {
    let groupList;
    if (localStorage.groupList != ''){
        groupList = JSON.parse(localStorage.groupList);
    }else{
        groupList = [];
    }
    groupQuery.forEach(function (doc) {
        let groupDetails = doc.data();
        let newGroup = new group(groupDetails['ID'], groupDetails['name'], groupDetails['school'],
            groupDetails['term']);
        newGroup.addCourses(groupDetails['courseList']);
        newGroup.addInstructors(groupDetails['instructorList']);
        groupList.push(newAssignment);
    });
    localStorage.groupList = JSON.stringify(groupList);
}

function instructorQueryManager(instructorQuery){
    let instructorList;
    if (localStorage.InstructorList != ''){
        instructorList = JSON.parse(localStorage.InstructorList);
    }else{
        instructorList = [];
    }
    instructorQuery.forEach(function (doc){
        let instructorDetails = doc.data();
        let newInstructor = new instructor(instructorDetails.name, instructorDetails.email);
        instructorList.push(newInstructor);
    });
    localStorage.instructorList = JSON.stringify(instructorList);
}





// let today = new Date();
// let currentMonth = today.getMonth();
// let currentYear = today.getFullYear();

// let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// let monthAndYear = document.getElementById('monthAndYear')

// showCalendar(currentMonth, currentYear);


// function showCalendar(month, year) {
//     let firstDay = new Date(year, month).getDate();
//     let daysInMonth = 32 - new Date(year, month, 32).getDate();

//     let tbl = document.getElementById('calendar-body');

//     tbl.innerHTML = '';
//     monthAndYear.innerHTML = months[month] + " " + year;

//     let date = 1;

//     for(let i = 0; i < 6 ; i++) {
//         let row = document.createElement('tr');

//         for (let j = 0; j < 7; j++){

//             if (i === 0 && j < firstDay) {
//                 console.log(firstDay);
//                 let cell = document.createElement('td');
//                 let cellText = document.createTextNode("");
//                 cell.appendChild(cellText);
//                 row.appendChild(cell);
//             }else if (date > daysInMonth) {
//                 break;
//             }else {
//                 let cell = document.createElement('td');
//                 let cellText = document.createElement(date);
//                 cell.appendChild(cellText);
//                 row.appendChild(cell);
//             }

//             date ++;
//         }
//         tbl.appendChild(row);
//     }
// }

// function previous() {
//     currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
//     currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//     showCalendar(currentMonth, currentYear);

// }
// function next () {
//     currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
//     currentMonth = (currentMonth + 1) % 12;
//     showCalendar(currentMonth, currentYear);

// }