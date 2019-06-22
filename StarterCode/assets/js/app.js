// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};


var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(statesData) {

    statesData.forEach(function (data) {
        data.income = +data.income;
        data.obesity = +data.obesity; 
      });

      var xLinearScale = d3.scaleLinear()
      .domain([37000, d3.max(statesData, d => d.income)])
      .range([0, width]);
  
    var yLinearScale = d3.scaleLinear()
      .domain([20, d3.max(statesData, d => d.obesity)])
      .range([height, 0]);
  
  
    var bottomAxis = d3.axisBottom(xLinearScale) 
      .ticks(7);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
    chartGroup.append("g")
    .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(statesData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.income))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "13")
    .attr("fill", "#788dc2")
    .attr("opacity", ".75")

    var circlesGroup = chartGroup.selectAll()
    .data(statesData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.income))
    .attr("y", d => yLinearScale(d.obesity))
    .style("font-size", "13px")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .text(d => (d.abbr));

    chartGroup.append("text")
   .attr("transform", `translate(${width / 2}, ${height + margin.top + 25})`)
   .attr("text-anchor", "middle")
   .attr("font-size", "16px")
   .attr("fill", "black")
   .text("Income")

   chartGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0 - margin.left + 20)
   .attr("x", 0 - (height / 2))
   .attr("text-anchor", "middle")
   .attr("font-size", "16px")
   .attr("fill", "black")
   .text("Obesity")
})

