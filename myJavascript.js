
class entry{
    constructor( courseCode, courseDesc, semester, grade, id) {
        this.courseCode = courseCode;
        this.courseDesc = courseDesc;
        this.semester = semester;
        this.grade = grade;
        this.id = id;
    }

}

var entryNum = 0;
var numFields = [0, 0, 0, 0];
var id = 0;
var entries = [];

function semesterToInt(semester){
    var myInt = 0;
    if(semester[0] == 'W'){
        myInt = 0;
    }else if(semester[0] == 'S'){
        myInt = 1;
    }else{
        myInt = 2;
    }
    return myInt + (10*parseInt(semester.substring(1,2)));
}

function addEntry(courseCode, courseDesc, semester, grade, thisId, isNew){
    var newDiv = document.createElement("div");
    var currId;
    if(isNaN(parseInt(grade))){
        grade = 0;
        console.log("SUSSYBAKAPANTS");
    }
    if(isNew){
        currId = id;
        ++id;
    entries.push(new entry(courseCode, courseDesc, semester, parseInt(grade),currId));
    }else{
        currId = thisId;
    }

    
    
    newDiv.classList.add("item");
    newDiv.setAttribute("id", currId.toString());
    var newContent;
    
    const creatorText = ["Course Code: ","Course Description: ","Semester: ","Grade: ", "", ""]
    const valueList = [courseCode, courseDesc, semester, grade];
    const semesterList = ["F", "W", "S"];
    
    for(var i = 0; i < 6; ++i){
        newContent = document.createElement("span");
        
        newContent.classList.add("createText");
        newContent.innerHTML = creatorText[i];
        newDiv.appendChild(newContent);
        if(i != 2 && i < 4){
            newContent = document.createElement("input");
        }else if(i == 2){
            newContent = document.createElement("select");
            for(var j = 0; j < 15; ++j){
                var opt = document.createElement("option");
                opt.value = j;
                opt.innerHTML = semesterList[j % 3] + Math.floor((j + 59)/3).toString();
                newContent.appendChild(opt);
            }
            
        }else{
            newContent = document.createElement("button");
            if(i == 4){
                newContent.innerHTML = "Update";
                newContent.addEventListener('click', function() {var itIndex = entries.findIndex(that => that.id == currId);
                    entries[itIndex].courseCode = document.getElementById(currId.toString() + "-course code").value; 
                    entries[itIndex].courseDesc = document.getElementById(currId.toString() + "-course description").value;
                    entries[itIndex].semester = document.getElementById(currId.toString() + "-semester").value;//document.getElementById(currId.toString() + "-semester").options[document.getElementById(currId.toString() + "-semester").selectedIndex].text;
                    if(isNaN(document.getElementById(currId.toString() + "-grade").value)){
                        entries[itIndex].grade = 0;
                        console.log("IM HERE");
                    }else{
                        entries[itIndex].grade = parseInt(document.getElementById(currId.toString() + "-grade").value);
                    }
                    
                    updateData()});
            }else{
                newContent.innerHTML = "Delete";
                newContent.addEventListener('click', function() {newDiv.remove(); entries.splice(entries.findIndex(that => that.id == currId),1);console.log(entries);updateData() });
            }
        }
        if(i < 4){
        newContent.classList.add("contained");
        newContent.setAttribute("id", currId.toString() + "-" + creatorText[i].slice(0,-2).toLowerCase());
        if(i != 2){
        newContent.value = valueList[i];
        }else if(i == 2){
            //newContent.selectedIndex = intToIndex(semester);
            newContent.selectedIndex = valueList[i];//document.getElementById("semester").options[document.getElementById("semester").selectedIndex].value;
            //newContent.options[newContent.selectedIndex].value = valueList[i];
        }
        }
        newDiv.appendChild(newContent);
    }

    
    document.getElementById("gamer").appendChild(newDiv);
}
function dataEntry(){
    document.getElementById("dataEntry").style.display = "flex";
    document.getElementById("dataVis").style.display = "none";;
}

function dataVis(){
    document.getElementById("dataEntry").style.display = "none";
    document.getElementById("dataVis").style.display = "block";;
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


function closeNav2(el){
    var xPosition = 0;
    //var yPosition = 0;
   
    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
        //var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
   
        xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
        //yPosition += (el.offsetTop - yScrollPos + el.clientTop);
      } else {
        xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        //yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
      }
   
      el = el.offsetParent;
    }
    if(xPosition > 250){
      closeNav();
    }
  }
var sorter = document.getElementById("Sort");
sorter.onchange = function(){updateData()};
var filter = document.getElementById("Filter");
filter.onchange = function(){updateData()};
var checkBox = document.getElementById("withdraw");
checkBox.addEventListener('click', function() {updateData()})
var createButton = document.getElementById("createButton");
createButton.addEventListener('click', function() {addEntry(document.getElementById("courseCode").value, document.getElementById("courseDesc").value, document.getElementById("semester").value, document.getElementById("grade").value, -1, true); updateData()});
//createToolBar();
//document.getElementById("dataEntry").addEventListener("click", closeNav2);
document.addEventListener("click", function(evt) {
    let flyoutEl = document.getElementById('mySidenav'),
      targetEl = evt.target; // clicked element      
    if(flyoutEl.offsetWidth == 0){
        return;
    }
    do {
      if(targetEl == flyoutEl) {
        // This is a click inside, does nothing, just return.
        //document.getElementById("flyout-debug").textContent = "Clicked inside!";
        return;
      }
      // Go up the DOM
      targetEl = targetEl.parentNode;
    } while (targetEl);
    // This is a click outside.
    closeNav();
    //document.getElementById("flyout-debug").textContent = "Clicked outside!";
  });
function meetsFilter(myEntry){
    return (filter.value == "ALL Courses" || (filter.value == "MATH courses" && myEntry.courseCode.includes("MATH")) || (filter.value == "CS courses" && myEntry.courseCode.includes("CS")) || (filter.value == "Other Courses" && !myEntry.courseCode.includes("MATH") && !myEntry.courseCode.includes("CS")));
}

function updateData(){

    for(var i = 0; i < entries.length; ++i){
        //console.log(document.getElementById(entries[i].id.toString()))
        if(document.getElementById(entries[i].id.toString())){
            document.getElementById(entries[i].id.toString()).remove();
        }
    }

    switch(sorter.value){
        case "Course Code":
            entries.sort(function(a,b){if(a.courseCode > b.courseCode) return 1; else if(a.courseCode < b.courseCode) return -1; return 0;})
            break;
        case "Term":
            entries.sort(function(a,b){if(a.semester > b.semester) return 1; else if(a.semester < b.semester) return -1; return 0;})
            break;
        case "Grade (Ascending)":
            entries.sort(function(a,b) {return a.grade - b.grade});
            break;
        case "Grade (Descending)":
            entries.sort(function(a,b) {return b.grade - a.grade});
            break;

    }
    var oldChart = document.getElementById("myChart");
    if(oldChart){
        oldChart.remove();
    }
    var newChart = document.createElement("canvas");
    newChart.setAttribute("id", "myChart");
    newChart.classList.add("chart");
    document.getElementById("thisChart").appendChild(newChart);
    var xValues = [];
    var yValues = [];
    var barColors = ["red", "green","blue","orange","brown"];
    new Chart("myChart", {
        type: "bar",
        
            
            data: {
                
            datasets: [{backgroundColor: barColors,
                scaleStartValue:0,
                data: yValues
                
                
            }],
            
            labels: xValues
        
        },
        options:{
            legend: {
                display:false
            },
        scales: {
            yAxes: [{
                ticks: {
                  min: 0,
                  max: 100,
                },
              }],
        }
        ,
        }
    });
    for(var i = 0; i < entries.length; ++i){
        if((document.getElementById("withdraw").checked || entries[i].grade >= 0) && meetsFilter(entries[i])){
        addEntry(entries[i].courseCode, entries[i].courseDesc, entries[i].semester, entries[i].grade, entries[i].id, false);
        xValues.push(entries[i].courseCode);
        yValues.push(entries[i].grade);
        //barColors.push(barColors[i]%barColors.length);
        }
    }

    console.log(yValues);



    //addEntry(entries[i].courseCode, entries[i].courseDesc, entries[i].semester, entries[i].grade, entries[i].id, false);

    var numCourses = entries.filter(function(it){ return it.grade != -1 && meetsFilter(it)}).length;
    //console.log(entries.filter(function(it) {return it.grade != -1}));
    var numFailed = entries.filter(function(it) {return it.grade < 50 && it.grade >= 0 && meetsFilter(it)}).length;
    //console.log(numFailed);
    var numWithdrawn = numFields.filter(it => {it.grade == -1 && meetsFilter(it)}).length;
    var tempSum = 0;
    entries.filter(function(it){return it.grade >= 0 && meetsFilter(it)}).forEach(function(it){tempSum += it.grade});
    var average = tempSum / numCourses;
    var highestGrade = document.getElementById("maxGrade");
    var medianGrade = document.getElementById("medianGrade");
    var lowestGrade = document.getElementById("minGrade");
    if(entries.length){
       highestGrade.innerHTML = entries.sort(function(a,b) {return b.grade - a.grade})[0].grade.toString() + "%";
       lowestGrade.innerHTML = entries.sort(function(a,b) {return a.grade - b.grade})[0].grade.toString() + "%";
       if(entries.length % 2 == 0){
        medianGrade.innerHTML = ((entries[entries.length/2-1].grade + entries[entries.length/2].grade)/2).toString() + "%"
       }
    }else{
        highestGrade.innerHTML = 0;
        lowestGrade.innerHTML = 0;
        medianGrade.innerHTML = 0;
    }
    
    var averageField = document.getElementById("average");
    averageField.innerHTML = average.toString() + "%";
    var coursesTakenField = document.getElementById("courses taken");
    coursesTakenField.innerHTML = numCourses.toString();
    var coursesFailedField = document.getElementById("courses failed");
    coursesFailedField.innerHTML = numFailed.toString();
    var withdrawnField = document.getElementById("withdrawn");
    withdrawnField.innerHTML = numWithdrawn.toString();
    console.log(entries);
}

/*function createToolBar(){
    var myToolbar = document.createElement("div");
    var myBox = document.createElement("div");
    myBox.classList.add("box");
    //myToolbar.classList.add("creator");
    myToolbar.classList.add("toolbar");
    var toolbarContent;
    const textFields = ["Average: ", "Courses Taken: ", "Courses Failed: ", "Withdrawn: "];

    for(let i = 0; i < 4; ++i){
    toolbarContent = document.createTextNode(textFields[i]);
    myBox.appendChild(toolbarContent);
    toolbarContent = document.createElement("span");
    toolbarContent.innerHTML = "0";
    toolbarContent.setAttribute("id", textFields[i].slice(0,-2).toLowerCase());
    myBox.appendChild(toolbarContent);
    myToolbar.appendChild(myBox);
    myBox = document.createElement("div");
    myBox.classList.add("box");
    }
    document.getElementById("toolbarwrapper").appendChild(myToolbar);

}*/

/*var newContent = document.createTextNode("Course Code");

newDiv.appendChild(newContent);
newContent = document.createElement("input");
newDiv.append(newContent);
newContent = document.createTextNode("Course Description");
newDiv.appendChild(newContent);

newContent = document.createTextNode("Semester");
newDiv.appendChild(newContent);

newContent = document.createTextNode("Grade");
newDiv.appendChild(newContent);*/
//const currentDiv = 

//document.getElementById("gamer").appendChild(newDiv);