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
    db.collection("assignments").orderBy('dueDate', 'asc').get().then(function (assignmentsQuery) {
        let assignmentList = [];
        assignmentsQuery.forEach(function (doc) {
            assignmentDetails = doc.data();
            newAssignment = new assignment(assignmentDetails['course'], assignmentDetails['name'], assignmentDetails['dueDate'],
                assignmentDetails['dueTime'], assignmentDetails['d2lLink'], assignmentDetails['instructions'],
                assignmentDetails['additionalInformation'], assignmentDetails['instructorID']);
            assignmentList.push(newAssignment);
        });
        window.localStorage.setItem("assignmentList", JSON.stringify(assignmentList));
        console.log(JSON.parse(window.localStorage.getItem('assignmentList')));
        sessionStorage.assignmentsLoaded = true;
    });
}

// function loadInstructorsToStorage() {
//     db.collection("instructors").get().then(function (instructorsQuery) {
//         let instructorsList = [];
//         instructorsQuery.forEach(function (doc) {
//             instructorsDetails = doc.data();
//             newInstructor = new instructor(instructorsDetails['name'], instructorsDetails['email']);
//             instructorsList.push(newInstructor);
//         });
//         window.localStorage.setItem("instructorsList", JSON.stringify(instructorsList));
//         console.log(JSON.parse(window.localStorage.getItem('instructorsList')));
//         sessionStorage.instructorsLoaded = true;
//     });
// }

function loadCoursesToStorage() {
    db.collection("courses").get().then(function (courseQuery) {
        let courseList = [];
        courseQuery.forEach(function (doc) {
            courseDetails = doc.data();
            newCourse = new course(courseDetails['courseCode'], courseDetails['courseName']);
            courseList.push(newCourse);
        });
        window.localStorage.setItem("courseList", JSON.stringify(courseList));
        console.log(JSON.parse(window.localStorage.getItem('courseList')));
        sessionStorage.coursesLoaded = true;
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

function sendUserToDB(currentUser) {
    db.collection('users').doc(currentUser.ID).set({
        'name': currentUser.name,
        'completedAssignments': currentUser.completedAssignments,
    }).then(()=>{
        console.log('successfully sent user');
    }).catch((err)=>{
        console.log('firestore sucks at sending users', err)
    });
}


function sendAssignment(assignmentInstance) {
    db.collection("assignments").doc(assignmentInstance.ID).set({
        'course': assignmentInstance.course,
        'name': assignmentInstance.name,
        'dueDate': assignmentInstance.dueDate,
        'dueTime': assignmentInstance.dueTime,
        'd2lLink': assignmentInstance.d2lLink,
        'instructions': assignmentInstance.instructions,
        'additionalInformation': assignmentInstance.additionalInformation,
        'instructorID': assignmentInstance.instructorID
    }).then(() => {
        if (confirm())
        console.log('Assignment sent succesfully');
    }).catch((err) => {
        window.alert(err)
        console.log('firebase let you down when sending assignment', err);
    });
}

// Sends the instructor calss to the data base.

// function sendInstructor(instructorInstance) {
   
//         db.collection("instructors").doc(instructorInstance.ID).set({
//             'name': instructorInstance.name,
//             'email': instructorInstance.email
//         }).then(()=>{
//         console.log('instructor sent succesfully');
//     }).catch((err)=>{
//         console.log('firebase let you down when sending instructor', err);
//     });
// }


function deletePassedAssignments() {
    let dateList = getAssignmentDueDate();
    let today = new Date();
    let todaysDay = today.getDate();
    for (let i = 0; i < dateList.length; i++) {

        let theDateList = dateList[i]['dueDate'].split('-');
        let correctVersionOfDate = DateObject(theDateList);
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


db.collection('assignments').onSnapshot(function () {
    window.localStorage.assignmentsLoaded = false;
});

// db.collection('instructors').onSnapshot(function () {
//     window.localStorage.assignmentsLoaded = false;
// });
