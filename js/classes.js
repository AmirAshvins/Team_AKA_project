
/* 
 
CLASS DEFINITIONS

 */
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
        // this.instructorID = instructorID;
        for (let i = 0; i < this.d2lLink.length; i++) {
            if (!isNaN(this.d2lLink[i])) {
                this.ID += this.d2lLink[i];
            }
        }
    }
}

// the user class
class user {
    constructor(userID, userName) {
        this.ID = userID;
        this.name = userName;
        this.completedAssignments = [];
        db.collection('users').doc(this.ID).get().then((doc) => {
            if (doc.exists) {
                this.getCompletedAssignments()
            } else {
                sendUserToDB(this);
                sessionStorage.loadedUser = true;
            }
        });
    }

    getCompletedAssignments() {
        db.collection('users').doc(this.ID).get().then((doc) => {
            this.completedAssignments = Array.from( new Set(doc.data().completedAssignments));
            sessionStorage.user = JSON.stringify(this);
            sessionStorage.loadedUser = true;
        }).catch((err) => {
            console.log('error while loading completed assignments', err)
        });
    }
}

class course {
    constructor(courseCode, courseName) {
        this.courseCode = courseCode;
        this.courseName = courseName;
    }
}
