// Use D3.json() fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("data/samples.json").then((importedData) => {
    var bellydata = importedData;
    console.log(bellydata);

     // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");
subjectid = bellydata.names
subjectid.forEach(id => {
    dropdownMenu.append("option").text(id).property("value")
})
optionChanged(subjectid[0])
   // function filterSample(samples[2]) {
    //    return samples.sample_values;
     //   return samples.otu_ids;
      //  return samples.otu_labels;
});
function demograph(nameid) {
    d3.json("data/samples.json").then((bellydata) => {
      bellymeta = bellydata.metadata
      filterid = bellymeta.filter(bm => bm.id == nameid)
      // fetching the first element
      firstsample = filterid[0]
      // referencing the sample metadata
      var demobox = d3.select("#sample-metadata")
      Object.entries(firstsample).forEach(([key, value]) => {
          demobox.append("option").text(`${key}, ${value}`)
      })
})
}
function optionChanged(namesid) {
    demograph(namesid)
}

//     // Sort the data array using the greekSearchResults value
//     data.sort(function(a, b) {
//       return parseFloat(b.greekSearchResults) - parseFloat(a.greekSearchResults);
//     });
//     // check to make sure data is properly sorted
//     // console.log(sorteddata);
//     // Slice the first 10 objects for plotting
//     data = data.slice(0, 10);
//     // check to make sure of correct slicing
//     // console.log(sliceddata);

//     // Reverse the array due to Plotly's defaults
//     data = data.reverse();
  


//     // Trace1 for the Greek Data
//     var trace1 = {
//       x: data.map(row => row.greekSearchResults),
//       y: data.map(row => row.greekName),
//       text: data.map(row => row.greekName),
//       name: "Greek",
//       type: "bar",
//       orientation: "h"
//     };
  
//     // data
//     var chartData = [trace1];
  
//     // Apply the group bar mode to the layout
//     var layout = {
//       title: "Greek gods search results",
//       margin: {
//         l: 100,
//         r: 100,
//         t: 100,
//         b: 100
//       }
//     };
  
//     // Render the plot to the div tag with id "plot"
//     Plotly.newPlot("plot", chartData, layout);
//   });
