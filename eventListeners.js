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
const quickCreateField = document.getElementById('quickCreateField', function(event){
  if (event.key === 'Enter') {
      quickCreate(document.getElementById("quickCreateText").value);
    }
  });
  quickCreateField.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        addTagToCreateBar();
      }
    });

    