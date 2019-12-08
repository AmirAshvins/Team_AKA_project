/**
 * This module deals with creating a DOM container for the assignment list rows 
 */

function buildListRow(assignmentInstance) {
    /**
     * Create a an assignment list row DOM with
     * 
     * :precondition: assignmentInstance must be an instance of Assignment class
     * :precondition: the DOM must contain a div with id listContainer
     * :post-condition will create an assignment list row
     * :post-condition: will append to DOM as child of listContainer
     */

    // Build the main container
    let listRow = buildRow(assignmentInstance.ID);

    //build course name
    let courseNameCol = buildCourseNameCol(assignmentInstance.course);

    // build assignmentName
    let assignmentNameCol = buildAssignmentNameCol(assignmentInstance.name);

    // Build due date
    let dueDateCol = buildDueDateCol(assignmentInstance.dueDate);

    // Build due time
    let dueTimeCol = buildDueTimeCol(assignmentInstance.dueTime);

    // put it all together
    listRow.appendChild(dueDateCol);
    listRow.appendChild(dueTimeCol);
    listRow.appendChild(assignmentNameCol);
    listRow.appendChild(courseNameCol);
    document.getElementById('listContainer').appendChild(listRow);
}

function buildRow(assignmentId) {
    /**
     * create the parent div for the assignment list row
     * 
     * assignmentID must be a string
     * :post-condition: will create a new div with the following properties
     * -id: assignmentID
     * -className: section-item row list-row
     * -onclick: onListItemClick
     * :post-condition: will return the div
     */
    let listRow = document.createElement('div');
    listRow.id = assignmentId;
    listRow.className = "section-item row list-row";
    listRow.onclick = function () {
        onListItemClick(this);
    }
    return listRow;
}

function buildCourseNameCol(courseName) {
    /**
     * Create a column div for the course name
     * 
     * :precondition: courseName must be a string
     * :post-condition: will create a div with the following attributes:
     * innerHTML: a paragraph class list-course-name list-text, with text: courseName
     * className: col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right
     * :post-condition: will return the div
     */
    let courseNameCol = document.createElement('div');
    courseNameCol.className = "col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right";
    courseNameCol.innerHTML = "<p class='list-course-name list-text'>" + courseName + "</p>";
    return courseNameCol;
}

// builds the column for the assignment name inside the row
function buildAssignmentNameCol(assignmentName) {
    /**
     * Create a column div for the assignment name
     * 
     * :precondition: assignmentName must be a string
     * :post-condition: will create a div with the following attributes:
     * innerHTML: a paragraph class list-assignment-name list-text, with text: assignmentName
     * className: col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left
     * :post-condition: will return the div
     */
    let assignmentNameCol = document.createElement('div');
    assignmentNameCol.className = "col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left";
    assignmentNameCol.innerHTML = "<p class='list-assignment-name list-text'>" + assignmentName + "</p>";
    return assignmentNameCol;
}

// builds the due date column inside the row
function buildDueDateCol(dueDate) {
    /**
     * Create a column div for the due date
     * 
     * :precondition: dueDate must be a string
     * :post-condition: will create a div with the following attributes:
     * innerHTML: a paragraph class list-due-date list-text, with text: dueDate
     * className: col-lg-2 col-md-2 col-sm-2 col-xs-2 text-left
     * :post-condition: will return the div
     */
    let dueDateCol = document.createElement('div');
    dueDateCol.className = "col-lg-2 col-md-2 col-sm-2 col-xs-2 text-left";
    dueDateCol.innerHTML = "<p class='list-due-date list-text'>" + dueDate + "</p>";
    return dueDateCol
}

// builds the due time column inside the row
function buildDueTimeCol(dueTime) {
    /**
     * Create a column div for the due time
     * 
     * :precondition: due time must be a string
     * :post-condition: will create a div with the following attributes:
     * innerHTML: a paragraph class list-due-time list-text, with text: dueTime
     * className: col-lg-2 col-md-2 col-sm-2 col-xs-2 text-left
     * :post-condition: will return the div
     */
    let dueTimeCol = document.createElement('div');
    dueTimeCol.className = "col-lg-2 col-md-2 col-sm-2 col-xs-2 text-left";
    dueTimeCol.innerHTML = "<p class='list-due-time list-text'>" + dueTime + "</p>";
    return dueTimeCol
}


function resetListContainer() {
    /**
     * destroy the div listContainer and create a new div with the same id
     * 
     * the objective of this function is to clear the listContainer's contents
     * 
     * :precondition: the DOM must contain a div with id listContainer
     * :precondition: the DOM must contain a div with id contentDiv
     * :post-condition: will remove the old listContainer from the DOM
     * :post-condition: will create a new div with id listContainer and attach it to contenDiv 
     */
    document.getElementById('contentDiv').removeChild(document.getElementById('listContainer'));
    let newListContainer = document.createElement('div');
    newListContainer.id = 'listContainer';
    document.getElementById('contentDiv').appendChild(newListContainer);
}