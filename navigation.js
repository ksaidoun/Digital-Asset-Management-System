function DAM(){
    document.getElementById("DAM").style.display = "flex";
    document.getElementById("contentWorkflow").style.display = "none";
}

function contentWorkFlow(){
    document.getElementById("DAM").style.display = "none";
    document.getElementById("contentWorkflow").style.display = "block";
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


//const openModalBtn = document.getElementById("openModalBtn");
//const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("myModal");
const closeIcon = document.getElementsByClassName("close")[0]; // Get the close icon element

/*openModalBtn.addEventListener("click", function() {
  modal.style.display = "block";
});*/

/*closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none";
});*/

closeIcon.addEventListener("click", function() {
  modal.style.display = "none";
});

//Use this one!
/*window.addEventListener("mousedown", function(event) {
  console.log("GOT HERE");
  if (event.target == modal) {
    modal.style.display = "none";
  }
});*/


/*window.addEventListener("mousedown", function(event) {
  var isClickInsideModal = document.getElementById("modal-content-content").contains(event.target);
  if (!isClickInsideModal && modal.style.display == "block") {
    modal.style.display = "none";
  }
}, true);*/

// Drawing on canvas
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.fillStyle = "lightblue";
context.fillRect(0, 0, canvas.width, canvas.height);
context.font = "20px Arial";
context.fillStyle = "black";
context.fillText("Canvas Image", 10, 30);