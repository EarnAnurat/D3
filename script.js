var map = new google.maps.Map(d3.select("#map").node(), {
      mapId: "d3761c835362e48b",
      center: { lat: 54.21450941993592, lng: -4.52637870928905150 }, //Isle of Man
      zoom: 5.7,
      gestureHandling: 'none',
});

// var bigText = d3.select("body").append('text')
// .classed('big-text', true);

var layer;

d3.json("http://34.78.46.186/Circles/Towns/10", function(error, data) {
  if (error) throw error;

  var overlay = new google.maps.OverlayView();

  // Add the container when the overlay is added to the map.
  overlay.onAdd = function() {
     layer = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "towns"); // add class name towns change

    // Draw each marker as a separate SVG element.
    // We could use a single SVG, but what size would it have?
    overlay.draw = function() {
      var projection = this.getProjection(),
          padding = 10;

      var marker = layer.selectAll("svg")
          .data(data) //change1
          .each(transform) // update existing markers
          .enter().append("svg")
          .each(transform)
          .attr("class", "marker");

      // Add a circle.
      marker.append("circle")
          .transition()
          .ease(d3.easeLinear)
          .duration(1000)
          .delay(function(d,i){return i*50})
          .attr("r", 4.5)
          .attr("cx", padding)
          .attr("cy", padding)
          // .on("mouseover", mouseover)
          // .on("mouseout", mouseout);
      

      // Add a label.
      marker.append("text")
          .attr("x", padding + 7)
          .attr("y", padding)
          .attr("dy", ".31em")
          .text(function(d) { return d.Town; }); //change2
      
      function nameFn(d){
  return d.Town + " Population : "+ d.Population;
}

function mouseover(d){
  d3.select(this).style('fill', '#f90');
  bigText.text(nameFn(d));
}

function mouseout(d){
  d3.select(this).style("fill", "rgba(255,255,255,0.4)")}

      function transform(d) { // change lat lng to pixel
        d = new google.maps.LatLng(d.lat, d.lng); //change3
        d = projection.fromLatLngToDivPixel(d);
        return d3.select(this)
            .style("left", (d.x - padding) + "px")
            .style("top", (d.y - padding) + "px");
      }
    };
  };

  // Bind our overlay to the map…
  overlay.setMap(map);
});

d3.select("#sliderrange").on("input", function() {
  updatetown(+this.value);
});

updatetown(50);

function updatetown(sliderrange) {
  d3.select("#value").text(sliderrange);
  d3.select("#sliderrange").property("value", sliderrange);


  d3.json("http://34.78.46.186/Circles/Towns/"+ sliderrange, function(error, data) {
  if (error) throw error;



  var overlay = new google.maps.OverlayView();

// Add the container when the overlay is added to the map.
overlay.onAdd = function() {
  layer.remove();
  layer = d3.select(this.getPanes().overlayLayer).append("div")
      .attr("class", "towns"); // add class name towns change

  // Draw each marker as a separate SVG element.
  // We could use a single SVG, but what size would it have?
  overlay.draw = function() {
    var projection = this.getProjection(),
        padding = 10;

    var marker = layer.selectAll("svg")
        .data(data) //change1
        .each(transform) // update existing markers
        .enter().append("svg")
        .each(transform)
        .attr("class", "marker");

    // Add a circle.
    marker.append("circle")
        .transition()
        .ease(d3.easeLinear)
        .duration(1000)
        .delay(function(d,i){return i*50})
        .attr("r", 4.5)
        .attr("cx", padding)
        .attr("cy", padding);

    // Add a label.
    marker.append("text")
        .attr("x", padding + 7)
        .attr("y", padding)
        .attr("dy", ".31em")
        .text(function(d) { return d.Town; }); //change2

    function transform(d) { // change lat lng to pixel
      d = new google.maps.LatLng(d.lat, d.lng); //change3
      d = projection.fromLatLngToDivPixel(d);
      return d3.select(this)
          .style("left", (d.x - padding) + "px")
          .style("top", (d.y - padding) + "px");
    }
  };
};

// Bind our overlay to the map…
overlay.setMap(map);
});
};

function clickupdate() {


d3.json("http://34.78.46.186/Circles/Towns/50", function(error, data) {
if (error) throw error;



var overlay = new google.maps.OverlayView();

// Add the container when the overlay is added to the map.
overlay.onAdd = function() {
   layer.remove();
   layer = d3.select(this.getPanes().overlayLayer).append("div")
      .attr("class", "towns"); // add class name towns change

  // Draw each marker as a separate SVG element.
  // We could use a single SVG, but what size would it have?
  overlay.draw = function() {
    var projection = this.getProjection(),
        padding = 10;

    var marker = layer.selectAll("svg")
        .data(data) //change1
        .each(transform) // update existing markers
      .enter().append("svg")
        .each(transform)
        .attr("class", "marker");

    // Add a circle.
    marker.append("circle")
        .transition()
        .ease(d3.easeLinear)
        .duration(1000)
        .delay(function(d,i){return i*50})
        .attr("r", 4.5)
        .attr("cx", padding)
        .attr("cy", padding);

    // Add a label.
    marker.append("text")
        .attr("x", padding + 7)
        .attr("y", padding)
        .attr("dy", ".31em")
        .text(function(d) { return d.Town; })
        .transition()
        .ease(d3.easeLinear)
        .duration(1000)
        .delay(function(d,i){return i*50}); //change2

    function transform(d) { // change lat lng to pixel
      d = new google.maps.LatLng(d.lat, d.lng); //change3
      d = projection.fromLatLngToDivPixel(d);
      return d3.select(this)
          .style("left", (d.x - padding) + "px")
          .style("top", (d.y - padding) + "px");
    }
  };
};

// Bind our overlay to the map…
overlay.setMap(map);
});
}

// window.initMap = initMap; This is from old clip video

// function nameFn(d){
//   return d.Town + " Population : "+ d.Population;
// }

// function mouseover(d){
//   d3.select(this).style('fill', '#f90');
//   bigText.text(nameFn(d));
// }

// function mouseout(d){
//   d3.select(this).style("fill", "rgba(255,255,255,0.4)")}
