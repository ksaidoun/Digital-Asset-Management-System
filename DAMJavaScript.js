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

function storageFormat(bytes){
    if(bytes >= 1099511627776){
        return (Math.round((bytes *100/ 1099511627776)) / 100).toString() + "TB";
    }else if(bytes >= 1073741824){
        return (Math.round((bytes *100/ 1073741824)) / 100).toString() + "GB";
    }else if(bytes >= 1048576){
        return (Math.round((bytes *100/ 1048576)) / 100).toString() + "MB";
    }else if(bytes >= 1024){
        return (Math.round((bytes *100/ 1024)) / 100).toString() + "KB";
    }
    return bytes + " Bytes";
}

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
var count = 0;
var tags = 0;
var storageUsed = 0;


    for(var i = 0; i < assets.length; ++i){
        var newDiv = document.createElement("div");
        currId = assets[i].id;
        if(filter.value == "ALL Documents" || (filter.value == "Images" && assets[i].fileType.startsWith('image/')) 
        || (filter.value == "Videos" && assets[i].fileType.startsWith('video/')) 
        || filter.value == "Misc. Documents" && !(assets[i].fileType.startsWith('video/') || assets[i].fileType.startsWith('image/')))
        {
            console.log(tagOptions.value);
            if(meetsTagRequirements(assets[i].tags, tagOptions.value)){
                count += 1;
                tags += assets[i].tags.length;
                storageUsed += assets[i].fileSize;    
                newDiv.classList.add("item");
                    newDiv.setAttribute("id", assets[i].id.toString());
                    var creatorText = ["File Name: ", "File Size: ", "Date: ", "File Description: ", "Tags: "];
                    var fileContent = [assets[i].fileName, storageFormat(assets[i].fileSize), assets[i].createdOn.toLocaleString(), assets[i].fileDesc, assets[i].tags];
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
                    for(var j = 0; j < 3; ++j){
                        var newerDiv = document.createElement('div');
                        newerDiv.setAttribute("class", "itemTextArea");
                        newContent = document.createElement("span");
                        newContent.classList.add("createText");
                        newContent.setAttribute('margin-right', "2px");
                        newContent.innerHTML = creatorText[j];
                        newerDiv.appendChild(newContent);
                        newContent = document.createElement("span");
                        newContent.setAttribute('margin-right', "5px");
                        newContent.innerHTML = fileContent[j];
                        newerDiv.appendChild(newContent);
                        newDiv.appendChild(newerDiv);
                        
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
    document.getElementById("average").innerHTML = count==0? 0 : tags / count;
    document.getElementById("numberOfDocuments").innerHTML = count;
    document.getElementById("storageUsed").innerHTML = storageFormat(storageUsed);
    //document.getElementById("storageCapacity").innerHTML = "64TB";
    
}

const tagSearchContainer = document.getElementById('tagSearchContainer');
const tagSearch = document.getElementById('tagSearch');
const tagContainer = document.getElementById('tagContainer');
const tagInput = document.getElementById('tagInput');


function stringToList(string){
    return string.split(', ');
}

var tagsInCreateBar = [];
var tagsInSearchBar = [];
var saveButton = document.getElementById("saveChanges");
saveButton.addEventListener('click', function(){
    var index = assets.findIndex(asset => asset.id == document.getElementById("modalID").innerHTML);
    console.log(index);
    assets[index].fileDesc = document.getElementById('modalFileDesc').value;
    assets[index].tags = stringToList(document.getElementById('modalTags').value);
    updateVisuals();
    document.getElementById("myModal").style.display="none";
});
function autoTag(asset){
    if(asset.fileName == "Projector_1.png"){
        asset.tags.push("Projector");
        asset.tags.push("Camera");
        asset.tags.push("Christie");
        asset.tags.push("Black");
    }
    if(asset.fileName == "Projector_2.jpg"){
        asset.tags.push("Projector");
        asset.tags.push("Christie");
        asset.tags.push("White");
        asset.tags.push("LW555");
        asset.tags.push("3LCD");
    }
}

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
      }
    });



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

function stringToList(myString){
    return myString.split(", ");
}

function quickCreate(prompt){
    prompt = prompt.toLowerCase();
    var img = new Image();
    var name = "";
    var size = -1;
    var desc = "";
    var tags = [];
    
    if(prompt.includes("doge")){
        img.src = "https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/video/thumbnail/2023/08/21/Clean_0.jpg?itok=PY9WAyjc";
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

function addAsset(file, img, date){
    var currId;
    var fileDesc = document.getElementById('fileDesc').value;
    console.log(fileDesc);
    
    //if(isNew){
    currId = id;
    var asset = new Asset(file.name, img, file.size, fileDesc, [...tagsInCreateBar], date, currId, file.type);
    if(document.getElementById("autoTag").checked == true){
        autoTag(asset);
    }
    assets.push(asset);
    
    console.log("GOT HERE");
    ++id;
    //}else{
    //    currId = thisId;
    //}
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
    document.getElementById('modalID').innerHTML = asset.id;
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
    const currentTime = new Date();
    const fileType = currentFile.type;
    //const file = currentFile;
      if (currentFile && fileType.startsWith("image/") ) {
        const reader = new FileReader();

        // Once the file is loaded, draw it onto the canvas
        reader.onload = function(e) {
          img.src = e.target.result;
        };

        // Read the file as a data URL
        reader.readAsDataURL(currentFile);
     
            
            console.log('File type:', fileType);
            
            img.onload = function(){
                addAsset(currentFile, img, currentTime);
            }
          }
        else if(currentFile && fileType.startsWith("video/")){
            img.src="https://i.ytimg.com/vi/k-JUM2vqQkw/maxresdefault.jpg";
            addAsset(currentFile, img, currentTime);
        }else if(currentFile && currentFile.name.includes('CS490')){
            img.src = CS490;
            addAsset(currentFile, img, currentTime);
        }
    });