class assignment {
    constructor(assignmentName, course, dueDate, D2LLink, instructions, additionalInstructions, assignmentName, instructorID) {
        this.courseName = course;
        this.assignmentName = assignmentName;
        this.dueDate = dueDate;
        this.ID = null;
        this.D2LLink = D2LLink;
        this.instructions = instructions;
        this.addtionalInstructions = additionalInstructions;
        this.instructorID = instructorID;
    }

    setID(){
        let assignmentID = '';
        for (let i=0; i<this.D2LLink.length; i++){
            if (!isNaN(this.D2LLink[i])){
                assignmentID += this.D2LLink[i]
            }
        }
        if (assignmentID != ''){
            this.ID = assignmentID
        }
        else{
            console.log('Cannot create ID. Empty D2L link')
        }
    }
}

class instructor(instructorID, instructorEmail){
    this.ID = instructorID;
    this.email = instructorEmail;
}