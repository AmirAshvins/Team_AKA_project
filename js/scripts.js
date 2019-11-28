/*FIREBASE*/
// The Firebase configuration
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

/*LOADING DATABASE*/
// Loads assignments to local storage
function loadAssignmentsToStorage() {
    // Gets all assignments from database
    db.collection("assignments").get().then(function (assignmentsQuery) {
        // Creates an empty array to story assignment objects
        let assignmentList = [];
        assignmentsQuery.forEach(function (doc) {
            assignmentDetails = doc.data();
            // Creates a new assignment object with data from database
            newAssignment = new assignment(assignmentDetails['course'], assignmentDetails['name'], assignmentDetails['dueDate'],
                assignmentDetails['dueTime'], assignmentDetails['d2lLink'], assignmentDetails['instructions'],
                assignmentDetails['additionalInformation'], assignmentDetails['instructorID']);
            // Appends new assignment object to the assignmentList array
            assignmentList.push(newAssignment);
        });
        // Sends the assignmentList array to the local storage
        window.localStorage.setItem("assignmentList", JSON.stringify(assignmentList));
        console.log(JSON.parse(window.localStorage.getItem('assignmentList')));
        // Changes the assignmentsLoaded boolean to true when finished loading
        sessionStorage.assignmentsLoaded = true;
    });
}

// Loads instructors to local storage
function loadInstructorsToStorage() {
    // Gets all instructors from database
    db.collection("instructors").get().then(function (instructorsQuery) {
        // Creates an empty array to store instructor objects
        let instructorsList = [];
        instructorsQuery.forEach(function (doc) {
            instructorsDetails = doc.data();
            // Creates new instructor object with data from database
            newInstructor = new instructor(instructorsDetails['name'], instructorsDetails['email']);
            // Appends new instructor object to the instructorList array
            instructorsList.push(newInstructor);
        });
        // Sends the instructorList array to the local storage
        window.localStorage.setItem("instructorsList", JSON.stringify(instructorsList));
        console.log(JSON.parse(window.localStorage.getItem('instructorsList')));
        // Changes the instructorsLoaded boolean to true when finished loading
        sessionStorage.instructorsLoaded = true;
    });
}

// Loads courses to local storage
function loadCoursesToStorage() {
    // Gets all courses from database
    db.collection("courses").get().then(function (courseQuery) {
        // Creates an empty array to store course objects
        let courseList = [];
        courseQuery.forEach(function (doc) {
            courseDetails = doc.data();
            // Creates new course object with data from database
            newCourse = new course(courseDetails['courseCode'], courseDetails['courseName']);
            // Appends new course object to the courseList
            courseList.push(newCourse);
        });
        // Sends the courseList array to the local storage
        window.localStorage.setItem("courseList", JSON.stringify(courseList));
        console.log(JSON.parse(window.localStorage.getItem('courseList')));
        // Changes the coursesLoaded boolean to true when finished loading
        sessionStorage.coursesLoaded = true;
    });
}

// Checks if collection is in the database
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

/*CLASS DEFINITIONS*/
// The assignment class
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

// The instructor class
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
}

// The user class
class user {
    constructor(userID, userName) {
        this.ID = userID;
        this.name = userName;
        this.completedAssignments = [];
        db.collection('users').doc(this.ID).get().then((doc) => {
            if (doc.exists) {
                this.getCompletedAssignments()
            } else {
                this.sendUserToDB();
                sessionStorage.loadedUser = true;
            }
        });
    }

    // Get users completed assignments
    getCompletedAssignments() {
        db.collection('users').doc(this.ID).get().then((doc) => {
            this.completedAssignments = doc.data().completedAssignments;
            localStorage.user = JSON.stringify(this);
            sessionStorage.loadedUser = true;
        }).catch((err) => {
            console.log('error while loading completed assignments', err)
        });
    }

    // Sends user data to database
    sendUserToDB() {
        db.collection('users').doc(this.ID).set({
            'name': this.name,
            'completedAssignments': this.completedAssignments,
        })
    }
}

// The course class
class course {
    constructor(courseCode, courseName) {
        this.courseCode = courseCode;
        this.courseName = courseName;
    }
}

/*UTILITIES*/
// Get the element by id by the collection from the local storage
function getElementByIdByCollectionFromLocStorage(elementID, collectionName) {
    let collectionList = JSON.parse(window.localStorage[collectionName]);
    for (let i = 0; i < collectionList.length; i++) {
        if (collectionList[i].ID === elementID) {
            return collectionList[i];
        }
    }
}

// Gets the due dates of all assignments 
function getAssignmentDueDate() {
    let assignments = JSON.parse(localStorage.assignmentList);
    let assignmentDueDateList = []
    assignments.forEach((assignment) => {
        assignmentDueDateList.push({
            'assID': assignment.ID,
            'dueDate': assignment.dueDate
        })

    })
    return assignmentDueDateList
}

// Given a date, constructs a proper date object readable from the computer
function makeDateObject(list) {
    object = new Date(list[0], list[1], list[2]);
    return object
}

// Deletes the assignments that are passed their due date
function deletePassedAssignments() {
    let dateList = getAssignmentDueDate();
    let today = new Date();
    let todaysDay = today.getDate();
    for (let i = 0; i < dateList.length; i++) {

        let theDateList = dateList[i]['dueDate'].split('-');
        let correctVersionOfDate = makeDateObject(theDateList);
        if (Math.abs(parseInt(correctVersionOfDate) - parseInt(todaysDay)) >= 3) {
            db.collection('assignments').doc(dateList[i]['assID']).delete().then(function () {
                console.log('delete is successful')
            }
            ).catch(function (error) {
                console.error('We have aproblem we didnt delete the item :( ', error);
            })
        }
    }
}

// Makes an array with specified fields from a specified collection
function getCollectionDetails(collectionName, detail) {
    detailList = [];
    collectionName = JSON.parse(window.localStorage.getItem(collectionName));
    collectionName.forEach(function (item) {
        detailList.push(item[detail]);
    })
    return (detailList)
}

/*LOADED BOOLEAN RESETS*/
// Sets the assignmentsLoaded boolean to false when page is loaded for the first time
db.collection('assignments').onSnapshot(function () {
    window.localStorage.assignmentsLoaded = false;
});

// Sets the instructorsLoaded boolean to false when page is loaded for the first time
db.collection('instructors').onSnapshot(function () {
    window.localStorage.instructorsLoaded = false;
});
