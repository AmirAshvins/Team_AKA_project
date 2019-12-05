
        // builds the main container for the list row
        function buildListRow(assignmentInstance) {

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

        // creates the rows inside the list
        function buildRow(assignmentId) {
            // Build a col of auto span
            let listRow = document.createElement('div');
            listRow.id = assignmentId;
            listRow.className = "section-item row list-row";
            listRow.onclick = function () {
                onListItemClick(this);
            }
            return listRow;
        }

        // builds the column for course name inside the row
        function buildCourseNameCol(courseName) {
            let courseNameCol = document.createElement('div');
            courseNameCol.className = "col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right";
            courseNameCol.innerHTML = "<p class='list-course-name list-text'>" + courseName + "</p>";
            return courseNameCol;
        }

        // builds the column for the assignment name inside the row
        function buildAssignmentNameCol(assignmentName) {
            let assignmentNameCol = document.createElement('div');
            assignmentNameCol.className = "col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left";
            assignmentNameCol.innerHTML = "<p class='list-assignment-name list-text'>" + assignmentName + "</p>";
            return assignmentNameCol;
        }

        // builds the due date column inside the row
        function buildDueDateCol(dueDate) {
            let dueDateCol = document.createElement('div');
            dueDateCol.className = "col-lg-2 col-md-2 col-sm-2 col-xs-2 text-left";
            dueDateCol.innerHTML = "<p class='list-due-date list-text'>" + dueDate + "</p>";
            return dueDateCol
        }

        // builds the due time column inside the row
        function buildDueTimeCol(dueTime) {
            let dueTimeCol = document.createElement('div');
            dueTimeCol.className = "col-lg-2 col-md-2 col-sm-2 col-xs-2 text-left";
            dueTimeCol.innerHTML = "<p class='list-due-time list-text'>" + dueTime + "</p>";
            return dueTimeCol
        }

        // ends the row
        function resetListContainer() {
            document.getElementById('contentDiv').removeChild(document.getElementById('listContainer'));
            let newListContainer = document.createElement('div');
            newListContainer.id = 'listContainer';
            document.getElementById('contentDiv').appendChild(newListContainer);
        }

        function buildCompletedCol() {
            let completedCol = document.createElement('div');
            completedCol.className = "col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center";
            completedCol.innerHTML = "<input type='checkbox' onclick='onCompletedClick'>";
            return completedCol
        }