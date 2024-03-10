class Asset{
    constructor( fileName, img, fileSize, fileDesc, tags, createdOn, id, fileType) {
        this.fileName = fileName;
        this.img = img;
        this.fileSize = fileSize;
        this.fileDesc = fileDesc;
        this.tags = tags;
        this.createdOn = createdOn;
        this.id = id;
        this.fileType = fileType;
    }

}

var assets = [];
var id = 0;
var currentFile = null;

var sorter = document.getElementById("Sort");
sorter.onchange = function(){updateVisuals()};
var filter = document.getElementById("Filter");
filter.onchange = function(){updateVisuals()};
var tagOptions = document.getElementById("tagOptions");
tagOptions.onchange = function(){updateVisuals()};



function updateVisuals(){
var currId;
var gamer = document.getElementById('gamer');
    while (gamer.firstChild) {
        gamer.removeChild(gamer.firstChild);
    }
    switch(sorter.value){
        case "File Name":
            assets.sort(function(a,b){if(a.fileName.toLowerCase() > b.fileName.toLowerCase()) return 1; else if(a.fileName.toLowerCase() < b.fileName.toLowerCase()) return -1; return 0;})
            break;
        case "Number of Tags (Ascending)":
            assets.sort(function(a,b){return a.tags.length - b.tags.length})
            break;
        case "Number of Tags (Descending)":
            assets.sort(function(a,b) {return b.tags.length - a.tags.length});
            break;
        case "Date Created (Ascending)":
            assets.sort(function(a,b) {return a.createdOn - b.createdOn});
            break;
        case "Date Created (Descending)":
            assets.sort(function(a,b) {return b.createdOn - a.createdOn});
            break;

    }

    for(var i = 0; i < assets.length; ++i){
        var newDiv = document.createElement("div");
        currId = assets[i].id;
        if(filter.value == "ALL Documents" || (filter.value == "Images" && assets[i].fileType.startsWith('image/')) 
        || (filter.value == "Videos" && assets[i].fileType.startsWith('video/')) 
        || filter.value == "Misc. Documents" && !(assets[i].fileType.startsWith('video/') || assets[i].fileType.startsWith('image/')))
        {
            console.log(tagOptions.value);
            if(meetsTagRequirements(assets[i].tags, tagOptions.value)){
                    newDiv.classList.add("item");
                    newDiv.setAttribute("id", assets[i].id.toString());
                    var creatorText = ["File Name: ", "File Size: ", "File Description: ", "Tags: ", "Date: "];
                    var fileContent = [assets[i].fileName, assets[i].fileSize, assets[i].fileDesc, assets[i].tags, assets[i].createdOn];
                    var newContent = document.createElement("button");
                    newContent.innerHTML = "Edit";
                    newContent.setAttribute("id", assets[i].id.toString() + "- Edit");
                    newContent.addEventListener('click', function(event) {
                        var itIndex = assets.findIndex(asset => asset.id.toString() == event.target.id.split('-')[0]);
                        changeDisplayImage(assets[itIndex]);
                        modal.style.display = "block";
                        
                    });
                    //var source = 
                    newDiv.appendChild(newContent);
                    newContent = document.createElement('img');
                    
                    newContent.setAttribute('height', '20');
                    newContent.setAttribute('width', '20');
                    newContent.src = assets[i].img.src;
                    newDiv.appendChild(newContent);
                    // Create "File Name, File Size, File Description"
                    for(var j = 0; j < 2; ++j){
                        newContent = document.createElement("span");
                        newContent.classList.add("createText");
                        newContent.innerHTML = creatorText[j];
                        newDiv.appendChild(newContent);
                        newContent = document.createElement("span");
                        newContent.innerHTML = fileContent[j];
                        newDiv.appendChild(newContent);
                        
                    }


                    //Create the Delete Button
                    newContent = document.createElement("button");
                        newContent.setAttribute('id', currId.toString() + "-" + creatorText[j].slice(0,-2).toLowerCase());
                        newContent.innerHTML = "Delete";
                        newContent.addEventListener('click', function(event){
                            assets.splice(assets.findIndex(asset => asset.id.toString() == event.target.id.split('-')[0]), 1);
                            console.log(assets);
                            updateVisuals();
                            
                        })
                        newDiv.appendChild(newContent);
                    document.getElementById("gamer").appendChild(newDiv);
                    
                }
        }

    }
}

const tagSearchContainer = document.getElementById('tagSearchContainer');
const tagSearch = document.getElementById('tagSearch');
const tagContainer = document.getElementById('tagContainer');
const tagInput = document.getElementById('tagInput');


var tagsInCreateBar = [];
var tagsInSearchBar = [];


function meetsTagRequirements(tags, type){
    var output;
    if(type == "UNION"){
        output = false;
    }else{
        output = true;
    }
    if(tagsInSearchBar.length == 0){
        return true;
    }
    if(type == "UNION"){
    for(var i = 0; i < tagsInSearchBar.length; ++i){
            output = output || tags.includes(tagsInSearchBar[i]);
    }
}
else{
    for(var i = 0; i < tagsInSearchBar.length; ++i){
        output = output && tags.includes(tagsInSearchBar[i]);
        console.log(output);
    }
}
    return output;
}

// Filter by Tag at top
function addTagForSearch(){
    
    const value = tagSearch.value.trim();
    console.log(value);
        if (value) {
          const tag = document.createElement('div');
          tag.classList.add('tag');
          tag.textContent = value;
          tagsInSearchBar.push(value);
          
          const deleteButton = document.createElement('span');
          deleteButton.classList.add('delete');
          deleteButton.textContent = 'x';

          deleteButton.addEventListener('click', function(event) {
            for(var i = 0; i < tagsInSearchBar.length; ++i){
                console.log(tagsInSearchBar[i], tag.textContent)
                if(tagsInSearchBar[i]+ 'x' == tag.textContent){
                    
                    tagsInSearchBar.splice(i,1);
                    updateVisuals();
                }
            }
            event.stopPropagation(); // Prevent the click event from reaching the tag element
            tag.remove(); // Remove the tag when delete button is clicked
          });
  
          tag.appendChild(deleteButton); // Append delete button to the tag
          
          tagSearchContainer.insertBefore(tag, tagSearch);
          tagSearch.value = ''; // Clear input after adding tag
        }
        updateVisuals();
}
// Enter Tag Field for each asset
function addTagToCreateBar(){
    
    const value = tagInput.value.trim();
        if (value) {
            console.log("HI")
          const tag = document.createElement('div');
          tag.classList.add('tag');
          tag.textContent = value;
          tagsInCreateBar.push(value);

          const deleteButton = document.createElement('span');
          deleteButton.classList.add('delete');
          deleteButton.textContent = 'x';
          deleteButton.addEventListener('click', function(event) {
            for(var i = 0; i < tagsInCreateBar.length; ++i){
                if(tagsInCreateBar[i] + 'x' == tag.textContent){
                    tagsInCreateBar.splice(i,1);
                }
            }
            event.stopPropagation(); // Prevent the click event from reaching the tag element
            tag.remove(); // Remove the tag when delete button is clicked
          });
  
          tag.appendChild(deleteButton); // Append delete button to the tag
          
          tagContainer.insertBefore(tag, tagInput);
          tagInput.value = ''; // Clear input after adding tag
        }
        updateVisuals();
}
    
  
    tagSearch.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        addTagForSearch();
      }
    });
  
    tagInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        addTagToCreateBar();
      }
    });
const quickCreateField = document.getElementById('quickCreateText');
quickCreateField.addEventListener('keyup', function(event){
    if (event.key === 'Enter') {
        quickCreate(document.getElementById("quickCreateText").value);
        //quickCreateField.value = "";
      }
    });
    /*quickCreateField.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          addTagToCreateBar();
        }
      });
*/


function listToString(myList){
    if(!myList.length){
        return "";
    }
    var output = myList[0];
    for(var i = 1; i < myList.length; ++i){
        output += ", " + myList[i];
    }
    return output;
}

function quickCreate(prompt){
    prompt = prompt.toLowerCase();
    var img = new Image();
    var name = "";
    var size = -1;
    var desc = "";
    var tags = [];
    
    if(prompt.includes("doge")){
        img.src = "https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/video/thumbnail/2023/08/21/Clean_0.jpg?itok=PY9WAyjc";//"https://m.media-amazon.com/images/I/51ae1mQVXML._AC_UF1000,1000_QL80_.jpg";
        name = "doge.png";
        size = 6921;
        desc = "Doge is really cool";
        tags = ["Doge", "Dog", "Funny", "Meme"];
    }
      
    quickCreateField.value = "";

    assets.push(new Asset(name, img, size, desc, tags, new Date(), id, "image/png"));
    ++id;
    console.log(assets);
    updateVisuals();
}

function addAsset(file, img, date, thisId, isNew){
    var currId;
    var fileDesc = document.getElementById('fileDesc').value;
    console.log(fileDesc);
    if(isNew){
        currId = id;
        assets.push(new Asset(file.name, img, file.size, fileDesc, [...tagsInCreateBar], date, currId, file.type));
        ++id;
    }else{
        currId = thisId;
    }
    console.log(assets);
    updateVisuals();
    
}

const fileInput = document.getElementById('fileInput')

const uploadToDAM = document.getElementById("uploadButton");

const quickCreateButton = document.getElementById("quickCreateButton");

function changeDisplayImage(asset){
    const newCvs = document.getElementById('canvas');
    const ctx = newCvs.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(asset.img, 0, 0, canvas.width, canvas.height);
    console.log(listToString(asset.tags));
    document.getElementById('modalFileName').innerHTML = asset.fileName;
    document.getElementById('modalFileDesc').value = asset.fileDesc;
    document.getElementById('modalTags').value = listToString(asset.tags);
    const modalImg = document.getElementById("modalImg");
    modalImg.src = asset.img.src;
}

quickCreateButton.addEventListener('click', ()=>{
    quickCreate(quickCreateField.value);
})

uploadToDAM.addEventListener('click', ()=>{
    const files = fileInput.files;
    currentFile = files[0];
    var img = new Image();

    //const file = currentFile;
      if (currentFile) {
        const reader = new FileReader();

        // Once the file is loaded, draw it onto the canvas
        reader.onload = function(e) {
          img.src = e.target.result;
        };

        // Read the file as a data URL
        reader.readAsDataURL(currentFile);
     
            const fileType = currentFile.type;
            console.log('File type:', fileType);
            const currentTime = new Date();
            img.onload = function(){
                addAsset(currentFile, img, currentTime, id, true);
            }
          }
    });