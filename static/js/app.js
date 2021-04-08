// // Use D3.json() fetch to read the JSON file
// // The data from the JSON file is arbitrarily named importedData as the argument
// d3.json("data/samples.json").then((importedData) => {
//     var bellydata = importedData;
//    // console.log(bellydata);
//      // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
// //   var dataset = dropdownMenu.property("value");
// subjectid = bellydata.names
// subjectid.forEach(id => {
//     dropdownMenu.append("option").text(id).property("value")
// })
// optionChanged(subjectid[0])

// });
// // Display an individual's demographic information
// // Display each key value pair from the metadata JSON object somewhere on the page.
// function demograph(nameid) {
//     d3.json("data/samples.json").then((bellydata) => {
//       var bellymeta = bellydata.metadata
//       filterid = bellymeta.filter(bm => bm.id == nameid)
//       // fetching the first element
//       firstmeta = filterid[0]
//       // referencing the sample metadata
//       var demobox = d3.select("#sample-metadata")
//       Object.entries(firstmeta).forEach(([key, value]) => {
//           demobox.append("option").text(`${key}, ${value}`)
//       })
// })
// }

// function optionChanged(namesid) {
//     demograph(namesid)
// }
/////
// Use D3 to select the bar chart
function init() {
  // Grab a reference to the dropdown select element 
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("data/samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });
    // Use the first sample from the list to build the initial plots    
    var firstSample = sampleNames[0]; buildCharts(firstSample); buildMetadata(firstSample);
  });
}

// Initialize the dashboardinit();
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected  
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel
function buildMetadata(sample) {
  d3.json("data/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number    
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of #sample-metadata    
    var PANEL = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata    
    PANEL.html("");
    // Use Object.entries to add each key and value pair to the panel    
    // Hint: Inside the loop, you will need to use d3 to append new    
    // tags for each key-value in the metadata.    
    Object.entries(result).forEach(([key, value]) => {
    PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}


// // 1. Create the buildChart function.
// function buildCharts(sample) {  
// // 2. Use d3.json to load the samples.json file   
//   d3.json("data/samples.json").then((data) => {    
// // 3. Create a variable that holds the samples array.     
//   var samples = data.samples;
// // 4. Create a variable that filters the samples for the object with the desired sample number.    
//   var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

// //  5. Create a variable that holds the first sample in the array.    
//   var result = resultArray[0];
// });}


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // Use D3 to select the bar chart
    //var chartid = d3.select("#bar");
    // Assign the value of the samples list to a variable
//     function plot(bellydata) {
//         var sampleValues = bellydata.samples.sample_values.map(0);
//         var otuIds = bellydata.samples.otu_ids.map(0);
//         var otuLabels = bellydata.samples.otu_labels;

//         console.log(sampleValues)
//         console.log(otuIds)
//         console.log(sotuLabels)

//     }

//  })

//  }


