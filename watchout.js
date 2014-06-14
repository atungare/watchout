// start slingin' some d3 here.

var svg = d3.select("body").append("svg")
  .attr("width", 700)
  .attr("height", 450);

var width = parseInt(d3.select("svg").style("width"));
var height = parseInt(d3.select("svg").style("height"));

var numEnem = 60;

// Create player circle
var player = svg.append("circle")
  .attr("class", "player")
  .attr("r", 10)
  .attr("fill", "orange")
  .attr("cx", width/2)
  .attr("cy", height/2);

// Add draggability to player
var drag = d3.behavior.drag()
  .on("drag", function(d) {
    d3.select(this)
      .attr("cx", d3.event.x)
      .attr("cy", d3.event.y);
});

// Generate random positions for enemies
var randPos = function() {
  var store = [];
  for(var i = 0; i <= numEnem; i++) {
    var x = width * Math.random();
    var y = height * Math.random();
    store.push([x, y]);
  }
  return store;
};

// Update the enemies' positions
var updateEnemies = function(posArr) {

  // Data Join
  var enemies = svg.selectAll(".enemies").data(posArr);

  // Enter
  enemies.enter().append("circle")
    .attr("class", "enemies")
    .attr("r", 10)
    .attr("fill", "black");

  // Update
  enemies.transition().duration(1500)
    .attr("cx", function(d) {
      return d[0];
    })
    .attr("cy", function(d){
      return d[1];
    });

  // Determine collision
  var myX = player.attr('cx');
  var myY = player.attr('cy');

  var radDist = parseInt(player.attr('r')) + parseInt(enemies.attr("r"));

  var collision = false;

  for(var i = 0; i < posArr.length; i++) {
    var dist = Math.sqrt(
      Math.pow((myX - posArr[i][0]), 2) +
      Math.pow((myY - posArr[i][1]), 2)
    );
    if(dist < radDist){
      collision = true;
      break;
    }
  }
};


player.call(drag);

// Generate enemies and update each second
updateEnemies(randPos());
setInterval(function() {
  var tupArr = randPos();
  updateEnemies(tupArr);
}, 1500);
