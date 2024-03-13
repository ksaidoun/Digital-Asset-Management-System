var data = {
    labels: ["Images", "Videos", "Misc"],
    datasets: [{
        data: [0, 0, 0],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }]
};

var data2 = {
    labels: ["Images", "Videos", "Misc"],
    datasets: [{
        data: [0, 0, 0],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }]
};

function getCountArray(){
    var outputArray = [0, 0, 0];
    for(var i = 0; i < assets.length; ++i){
        if(assets[i].fileType.startsWith("image/")){
            outputArray[0]++;
        }else if(assets[i].fileType.startsWith("video/")){
            outputArray[1]++;
        }else{
            outputArray[2]++;
        }
    }
    return outputArray;
}
function getStorageUsedArray(){
    var outputArray = [0, 0, 0];
    for(var i = 0; i < assets.length; ++i){
        if(assets[i].fileType.startsWith("image/")){
            outputArray[0]+=assets[i].fileSize;
        }else if(assets[i].fileType.startsWith("video/")){
            outputArray[1]+=assets[i].fileSize;
        }else{
            outputArray[2]+=assets[i].fileSize;
        }
    }
    return outputArray;
}



// Configuration options
var options = {
    responsive: false,
    maintaintAspectRatio: true,
    width:300,
    height:300,
    title: {
        display: true,
        text: 'Total count by Asset type', // Specify the title text
        fontSize: 18, // Adjust the font size if needed
        fontColor: '#333' // Specify the font color
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = Math.round((currentValue / total) * 100);
                return percentage + "%";
            }
        }
    }
};

var options2 = {
    responsive: false,
    maintaintAspectRatio: true,
    width:300,
    height:300,
    title: {
        display: true,
        text: 'Total Storage Used by Asset type', // Specify the title text
        fontSize: 18, // Adjust the font size if needed
        fontColor: '#333' // Specify the font color
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = Math.round((currentValue / total) * 100);
                return percentage + "%";
            }
        }
    }
};

// Get the context of the canvas element we want to select
var ctx = document.getElementById("myPieChart").getContext("2d");
var ctx2 = document.getElementById("myPieChart2").getContext("2d");
// Create the pie chart
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});

var myPieChart2 = new Chart(ctx2, {
    type: 'pie',
    data: data2,
    options: options2
});

function onValueChange(){
    myPieChart.data.datasets[0].data = getCountArray();
    myPieChart.update();
    //console.log(getCountArray());
    myPieChart2.data.datasets[0].data = getStorageUsedArray();
    myPieChart2.update();
}

/*document.getElementById('pieChartButton').addEventListener('click', function(){
    onValueChange();
});*/