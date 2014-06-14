// start slingin' some d3 here.

var svg = d3.select("body").append("svg")
  .attr("width", 700)
  .attr("height", 450);

var width = parseInt(d3.select("svg").style("width"));
var height = parseInt(d3.select("svg").style("height"));

var numEnem = 30;
var currScore = 0;
var numColl = 0;
var highScore = 0;

// timer for score
var begin;

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
    // var myR = this.style("r");
    var myR = d3.select(this).attr("r");
    d3.select(this)
      .attr("cx", Math.max(myR, Math.min(width - myR, d3.event.x)))
      .attr("cy", Math.max(myR, Math.min(height - myR, d3.event.y)));
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
};


var detectCollision = function () {

  var enemies = svg.selectAll(".enemies")
  var radDist = parseInt(player.attr('r')) + parseInt(enemies.attr("r"));
  var myX = player.attr('cx');
  var myY = player.attr('cy');
  var foundColl = false;

  enemies.each(function(d) {
    var dist = Math.sqrt(
      Math.pow((myX - d[0]), 2) +
      Math.pow((myY - d[1]), 2)
    );
    if(dist < radDist){
      foundColl = true;
    }
  });

  return foundColl;

};

var checkScore = function() {

  if(detectCollision()) {
    if(currScore > highScore) {
      highScore = currScore;
    }
    begin = new Date();
    numColl++;

    svg.style("background-color", "red").transition().duration(1000)
      .style("background-color", "white").transition();
  }

  // Display current score
  currScore = Math.floor((new Date() - begin)/100);
  d3.select("body").select(".current").select("span")
    .text(currScore);

  // Display Num Collisions
  d3.select("body").select(".collisions").select("span")
    .text(numColl);

  // Display High Score
  d3.select("body").select(".high").select("span")
    .text(highScore);
};

player.call(drag);

// Generate enemies and update each second
begin = new Date();
updateEnemies(randPos());

setInterval(function() {
  updateEnemies(randPos());
}, 1500);

setInterval(function(){
  checkScore();
}, 500);
