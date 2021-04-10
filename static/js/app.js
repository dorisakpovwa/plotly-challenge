// Use D3.json() fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("data/samples.json").then((bellydata) => {
 // var bellydata = importedData;
  // console.log(bellydata);
  // Use D3 to select the dropdown menu 
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  idnames = bellydata.names
  idnames.forEach(id => {
    dropdownMenu.append("option").text(id).property("value", id);
  });
  //build initial plots with first sample on the list
  optionChanged(idnames[0])

});
// Display an individual's demographic information
// Display each key value pair from the metadata JSON object somewhere on the page.
function demograph(person) {
  d3.json("data/samples.json").then((bellydata) => {
    bellymeta = bellydata.metadata;
    // filter the data with the object with the desired sample number
    filterid = bellymeta.filter(bm => bm.id == person);
    // fetching the first element
    firstmeta = filterid[0];
    // referencing the sample metadata with d3 to select the demograph box id
    var demobox = d3.select("#sample-metadata");
    // clear any existing metadata
    demobox.html("");
    // use object.entries to add each key and value pair to the box
    // use d3 to append new tags for each key value in metadata
    Object.entries(firstmeta).forEach(([key, value]) => {
      demobox.append("option").text(`${key}: ${value}`);
    });
  });

}
//function optionChanged(person) {
// demograph(person)
//}
/////////////


// // 1. Create the buildChart function.
// function buildCharts(sample) {
//   // 2. Use d3.json to load the samples.json file   
//   d3.json("data/samples.json").then((bellydata) => {
//     // 3. Create a variable that holds the samples array.     
//     var samples = bellydata.samples;
//     // 4. Create a variable that filters the samples for the object with the desired sample number.    
//     var resultArray = samples.filter(sampleObj => sampleObj.otu_ids == sample);
//     //  5. Create a variable that holds the first sample in the array.    
//     var result = resultArray[0];
//   });
//   buildCharts(sample)
// }

//cccccccccccccccccccccccccccccccccccccccccccccccc

function optionChanged(person) {
  demograph(person)
  Plot(person)
}

function Plot(sample) {
  d3.json("data/samples.json").then((bellydata) => {
    console.log('plot call')
    console.log(bellydata);
    var samples = bellydata.samples;
    var resultsamp = samples.filter(sampleObj => sampleObj.id == sample);
    console.log(resultsamp)
    // fetching the first element
    var firstsam = resultsamp[0]
    console.log(firstsam);

    var otuIds = firstsam.otu_ids;
    //var otuLabels = firstsam.otu_labels;
    // var sampleValues = firstsam.sample_values;
    // Sort the data by otu_ids
    //var sortedByotuIds = otuIds.sort((a, b) => b.otuIds - a.otuIds);
    // Slice the first 10 objects for plotting
    var slicedData = otuIds.slice(0, 10).map(otus => `OTU ${otus}`);
    console.log(slicedData)
    var samp = firstsam["sample_values"].slice(0, 10);
    //Reverse the array to accommodate Plotly's defaults
    var reversedData = slicedData.reverse();
    console.log(reversedData);
    var reversedsample = samp.reverse();
    //ploting trace data
    var trace = {
      // name: otuLabels,
      y: reversedData,
      x: reversedsample,
    
    // x: firstsam["sample_values"].slice(0, 10),
      // x: reversedDat.map(obj => obj.sampleValues),
      // y: reversedData.map(obj => obj.otuIds),
      //text: reversedData.map(obj => obj.otu_labels),
      type: "bar",
      orientation: "h"
    };
    //  line: {
    //    color: "#17BECF",
    //   };

    // data
    var data = [trace];

    // Apply the group bar mode to the layout
    var layout = {
      title: "Top ten OTUs",
      "x-axis": "Total OTU samples",
      "y-axis": "OTU NAME ID",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", data, layout);
  });
}

//init()
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// // Trace1 for the Greek Data
// var trace1 = {
//   x: reversedData.map(object => object.greekSearchResults),
//   y: reversedData.map(object => object.greekName),
//   text: reversedData.map(object => object.greekName),
//   name: "Greek",
//   type: "bar",
//   orientation: "h"
// };

// // data
// var data = [trace1];

// // Apply the group bar mode to the layout
// var layout = {
//   title: "Greek gods search results",
//   margin: {
//     l: 100,
//     r: 100,
//     t: 100,
//     b: 100
//   }
// };

// // Render the plot to the div tag with id "plot"
// Plotly.newPlot("plot", data, layout);

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


