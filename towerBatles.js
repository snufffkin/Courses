var Drone = require('drone');
var blocks = require('blocks');
var inventory = require('inventory');
var entities = require('entities');
var spawn = require('spawn')

var tower = {}
var spawnPoint = {}

function Towerbatles() { 
    this
    .fort()
    .chkpt('fort')
    .back(30)
    .left(30)
    .cylinder0(blocks.bedrock,60,10)
    spawnPoint = this.move('fort').getLocation();
    setInterval(function() {
        var c = 20;
        var angle = Math.floor(Math.random() * 360)
        spawnPoint.x += getRandomSpawnX(c,angle);
        spawnPoint.z += getRandomSpawnZ(c,angle);
        spawn(entities.zombie(), spawnPoint)
        spawnPoint.x -= getRandomSpawnX(c,angle);
        spawnPoint.z -= getRandomSpawnZ(c,angle);
    }, 1000)
}
Drone.extend(Towerbatles)

var mobs = [
    entities.skeleton,
    entities.giant,
    entities.zombie
]
function getRandomSpawnX(c, angle) {
    return c * Math.sin(angle)

}
function getRandomSpawnZ(c, angle) {
    return c * Math.cos(angle)
}
function getspawnPoint() {
    
}

