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
    /**
     * Get the assignments from DB
     * 
     * :precondition: must be able to connect to firestore
     * :precondition: assignments collection must exist in firestore
     * :post-condition: will fetch all assignments from DB in firestore
     * :post-condition: will create an Assignment class instance for every assignment in DB
     * :post-condition: will store assignment instances in a list in localStorage.assignmentList
     * :post-condition: will log to console upon success or failure
     */
    db.collection("assignments").orderBy('dueDate', 'asc').get().then(function (assignmentsQuery) {
        let assignmentList = [];
        assignmentsQuery.forEach(function (doc) {
            assignmentDetails = doc.data();
            newAssignment = new assignment(assignmentDetails['course'], assignmentDetails['name'], assignmentDetails['dueDate'],
                assignmentDetails['dueTime'], assignmentDetails['d2lLink'], assignmentDetails['instructions']);
            assignmentList.push(newAssignment);
            console.log('Successfully fetched assignmetns from firestore.')
        });
        window.localStorage.setItem("assignmentList", JSON.stringify(assignmentList));
        console.log(JSON.parse(window.localStorage.getItem('assignmentList')));
        sessionStorage.assignmentsLoaded = true;
    }).catch((err)=>{
        console.log('failed to fetch assignments from firestore.', err)
    });
}

function sendUserToDB(currentUser) {
    /**
     * Send CurrentUser to DB
     * 
     * :precondition: currentUser must be an instance of User
     * :precondition: must have access to firestore
     * :precondition: no property of currentUser must be undefined
     * :post-condition: will send the currentUser to DB
     * :post-condition: will log if success or failiure
     */
    db.collection('users').doc(currentUser.ID).set({
        'name': currentUser.name,
        'completedAssignments': currentUser.completedAssignments,
    }).then(() => {
        console.log('successfully sent user');
    }).catch((err) => {
        console.log('failed to send user', err)
    });
}


function sendAssignment(assignmentInstance) {
    /**
     * Send assignmentInstace to DB
     * 
     * :precondition: assignmentInstance must be an instance of User
     * :precondition: must have access to firestore
     * :precondition: no property of assignmentInstance must be undefined
     * :post-condition: will send the assignmentInstance to DB
     * :post-condition: will log if success or failure
     * :post-condition: will alert the user upon success or failure
     */
    db.collection("assignments").doc(assignmentInstance.ID).set({
        'course': assignmentInstance.course,
        'name': assignmentInstance.name,
        'dueDate': assignmentInstance.dueDate,
        'dueTime': assignmentInstance.dueTime,
        'd2lLink': assignmentInstance.d2lLink,
        'instructions': assignmentInstance.instructions,
    }).then(() => {
        console.log('Assignment sent succesfully');
        // the if blocks until user confirms
        if (!alert('Assignment submitted.')) { }
        window.location = "./main.html";
    }).catch((err) => {
        // if blocks for user feedback
        if(!alert('Failed to submit assignment.\nerror code:', err)){}
        console.log('firebase let you down when sending assignment', err);
    });
}


function deletePassedAssignments() {
    /**
     * 
     */
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

// Will flag when new assignments are loaded to DB by other users
db.collection('assignments').onSnapshot(function () {
    window.localStorage.assignmentsLoaded = false;
});

// 
document.getElementById('logout').onclick = () => {
    /**
     * logout button onclick event handler
     * 
     * :precondition: must have access to firestore
     * :post-condition: will sign the user out
     * :post-condition: will alert the user of success or failure
     * :post-condition: will log to console upon success or failure
     */
    firebase.auth().signOut().then(function () {
        alert('You are logged out')
        window.location = "./index.html";
        console.log('user signed out')
    }).catch(function (error) {
        alert('failed to logout\nerror code:', error)
        console.log('Logout failed.');
    });
}

