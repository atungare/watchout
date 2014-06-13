// start slingin' some d3 here.

var width = parseInt(d3.select("svg").style("width"));
var height = parseInt(d3.select("svg").style("height"));

var svg = d3.select("svg");

var randPos = function() {
  var store = [];
  for(var i = 0; i <= 30; i++) {
    var x = width * Math.random();
    var y = height * Math.random();
    store.push([x, y]);
  }
  return store;
};

var updateEnemies = function(posArr) {
  // Data Join
  var enemies = svg.selectAll("circle").data(posArr);

  // Update - NA

  // Enter
  enemies.enter().append("circle")
    .attr("cx", function(d) {
      return d[0];
    })
    .attr("cy", function(d){
      return d[1];
    })
    .attr("r", 10)
    .attr("fill", "black");

  // Update
  enemies.transition()
    .attr("cx", function(d) {
      return d[0];
    })
    .attr("cy", function(d){
      return d[1];
    });

};

updateEnemies(randPos());

setInterval(function() {
  var tupArr = randPos();
  console.log(tupArr);
  updateEnemies(tupArr);
}, 1000);
