class assignment {
    constructor(assignmentName, course, dueDate, D2LLink, instructions, additionalInstructions, assignmentName, instructorID, assignmentID) {
        this.courseName = course;
        this.assignmentName = assignmentName;
        this.dueDate = dueDate;
        this.ID = assignmentID;
        this.D2LLink = D2LLink;
        this.instructions = instructions;
        this.addtionalInstructions = additionalInstructions;
        this.instructorID = instructorID;
    }
}

class instructor(instructorID, instructorEmail){
    this.ID = instructorID;
    this.email = instructorEmail;
}