var map;
var marker;
var line;
var index = 0;
var ruta;
var mensajes = ["Hola estoy en Monterrey", "Hola estoy en DF", "Hola estoy en Misantla"];
var infoWindow;
function initMap() {
	ruta = [new google.maps.LatLng(25.24469595130604,  -100.107421875), new google.maps.LatLng( 19.062117883514667,  -100.986328125), new google.maps.LatLng(19.93591434153325, -96.84860229492188)];
  map = new google.maps.Map(document.getElementById('map'), {
    center: ruta[0],
    zoom: 5
  });
  map.setOptions({styles : [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]});
  marker = new google.maps.Marker();
  marker.setTitle("Hola estoy aqui");
  marker.setPosition(ruta[0]);
  marker.setMap(map);


  line = new google.maps.Polyline({
    path: ruta,
    map: map
  });

  marker.addListener('click', function () {
  	go();
  });

  infoWindow = new google.maps.InfoWindow({
  	content: mensajes[index]
  });
  infoWindow.open(map,marker);
}

function go () {
  var step = 0;
  var numSteps = 100; 
  var timePerStep = 1; 
  var interval = setInterval(function() {
    step += 1;
    if (step > numSteps) {
      index++;
      infoWindow.index = index;
      infoWindow.setContent(mensajes[index]);
      infoWindow.open(map,marker);
      clearInterval(interval);
      dataSet.push( restData[index-1]);
      path.transition().attr("d", linea)
    } else {
      marker.setPosition(google.maps.geometry.spherical.interpolate(ruta[index],ruta[index+1],step/numSteps));
    }
  }, timePerStep);
}

var estados = ["Monterrey", "DF", "Misantla"];
var values = [0.0, 3.0,5.0,10.0];
var dataSet = [ 
  ["Monterrey",3.0]
];
var restData = [
  ["DF",7.0],
  ["Misantla",5.0]
];

var margin = {top: 20, right: 50, bottom: 30, left: 50},
  width = 500 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangePoints([0, width],0);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .tickFormat(function(d) { return d; })
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var linea = d3.svg.line()
  .x(function(d) { return x(d[0]); })
  .y(function(d) { return y(d[1]); });

var svg = d3.select("#grap").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(estados.map(function(d) { return d; }));
y.domain(d3.extent(values, function(d) { return d; }));

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end");


var path = svg.append("path")
  .datum(dataSet)
  .attr("class", "line")
  .attr("d", linea)




