// Use D3.json() fetch to read the JSON file
// The data from the JSON file is arbitrarily named bellydata as the argument
d3.json("data/samples.json").then((bellydata) => {
  // console.log(bellydata);
  // Use D3 to select the dropdown menu 
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  idnames = bellydata.names
  // select each id in the data
  idnames.forEach(id => {
    dropdownMenu.append("option").text(id).property("value", id);
  });
  //build initial plots with first sample on the list
  optionChanged(idnames[0])
});
//////////////
// Display an individual's demographic information
// Display each key value pair from the metadata JSON object on the page.
function demograph(person) {
  d3.json("data/samples.json").then((bellydata) => {
    //Create a variable that holds the metadata.
    bellymeta = bellydata.metadata;
    // filter the data with the object with the desired sample number using id
    filterid = bellymeta.filter(bm => bm.id == person);
    // fetching the first element
    firstmeta = filterid[0];

    // create a variable that selects the washing frequency for bonus activity
    var wfreqs = firstmeta.wfreq;

    // referencing the sample metadata with d3 to select the demograph box id
    var demobox = d3.select("#sample-metadata");
    // clear any existing metadata to make the dashboard display only current data
    demobox.html("");
    // use object.entries to add each key and value pair to the box
    // use d3 to append new tags for each key value in metadata
    Object.entries(firstmeta).forEach(([key, value]) => {
      demobox.append("option").text(`${key}: ${value}`);
    });
    // call the gaugeChart function
    gaugeChart(wfreqs);
  });
}

/////////// call the functions

function optionChanged(person) {
  demograph(person)
  barPlot(person)
  buildChart(person)
}
// build the barchart function
function barPlot(sample) {
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
      title: "Top Ten OTUs in Individual",
      //"x-axis": "Total OTU samples",
     // "y-axis": "OTU NAME ID",
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
/////////
// build the bubblechart function and pass id_number as parameter
function buildChart(id_number) {

  d3.json("data/samples.json").then((bellydata) => {
    var samples2 = bellydata['samples'];
    // filter functions takes an array and returns an array
    var filtered_samples2 = samples2.filter(sampleObj2 => sampleObj2.id == id_number);
    //var filtered_samples2 = samples.filter(item => item.id==id_number)
    var sample_dict = filtered_samples2[0];
    var otu_ids2 = sample_dict['otu_ids'];
  //  var bubbleData = otu_ids2.map(otus => `OTUs ${otus}`);

    // var trace2 = {
    //   type: 'bubble',
    //   y: 'filtered_samples2',
    //   x: 'otu_ids2'
    // };
    // var layout2 = {
    //   'title': 'OTUs Measured',
    //   'x-axis': 'OTU IDs',
    //   'y-axis': 'Sample Values',
    // };

    console.log(sample_dict);
    //var data2 = [trace2];
    data2 = {
      x: otu_ids2,
      y: sample_dict["sample_values"],
      text: sample_dict["otu_labels"],
      mode: "markers", 
      marker: {
        size: sample_dict["sample_values"],
        color: otu_ids2,
        colorscale: "blue"
      }
    };
    var data = [data2];
    var layout2 = {
      title: "Sample Bubble Chart",
      hovermode: "closet",
     xaxis: { title: ('otu_ids') },
     yaxis: { title: ('sample values') }

   }
    // Render the plot to the div tag with id "bubble"
    Plotly.newPlot('bubble', data, layout2 )
  });
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Bonus//
// creating gauge function to determine washing frequency of individuals
function gaugeChart(wfreqs) {
  var trace3 = [{
    domain: {x:[0-1], y:[0-1]}, 
    values: wfreqs,
    type: "indicator", 
    mode: "gauge+number", 
    gauge: {axis: {range:[0, 9]},
    steps: [{range: [0, 4.5], color: "blue"}, {range: [4.5, 9], color: "red"}]},
    title: {text: "Washing Frequency per Individual"},
  }]
  var layout3 = { 
    width: 500, 
    height: 500, 
    margin: { t: 0, b: 0 },
   };

  Plotly.newPlot('gauge', trace3, layout3)
}



