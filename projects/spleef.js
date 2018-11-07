var teleport = require('teleport');
var inventory = require('inventory');
var blocks = require('blocks')
var Drone = require('drone')
var players = []
var slash = require('slash')
var items = require('items')
var utils = require('utils')
var scores = [0,0]
var rounds = [0,0]
var spawn = {}
var time = 60;
var dead = false;
var game = false;


function updateScore () {
    this
    .move('score')
    .up(7)
    .box(blocks.air,10,6)
    .blocktype(scores[0], blocks.iron)
    .right(5) 
    .blocktype(scores[1], blocks.iron)
}
function updateTime() {
    this
    .move('score')
    .up(7)
    .right(5) 
    .back(32)
    .turn(2)
    .box(blocks.air,10,6)
    .blocktype(time)
}
function updateSpleef() {
    this
    .move('start')
    .fwd(15)
    .turn()
    .back(15)
    .cylinder(blocks.snow, 15, 1)
}
Drone.extend(updateSpleef)
Drone.extend(updateTime)
function checkZone(spawn, location) {
    var a = Math.abs(spawn.x - location.x)
    var b = Math.abs(spawn.z - location.z)
    var c = Math.sqrt(a * a + b * b)
    if (c <= 20) {
        return true
    }
    else {
        return false;
    }
}
function startSpleef() {
    game = true;
    
    var listPlayers = utils.players()
    for (var i = 0; i < listPlayers.length; i++) {
        var player = utils.player(listPlayers[i].name)
        if (checkZone(spawn, player.location)) {
            players.push(player.name)
            inventory(player).add(items.diamondSpade(1))
        }
    }
    for (var i = 0; i < listPlayers.length; i++) {
        echo(players[i]);
    } 
    setInterval(function() {
        if (game) {
            if (getMaxOfArray(scores) == 9) {
                rounds[scores.indexOf(getMaxOfArray(scores))]++;
                updateSpleef();
                scores = [0,0]
                updateScore();
            }
            if (getMaxOfArray(rounds) == 3) {
                game = false;
                echo('Win')
            }
        }
        else {
            clearInterval();
        }
    })
}
exports.startSpleef = startSpleef;
Drone.extend(updateScore)
function death(event) {
    var player = event.player;
    if (players.indexOf(player.name != -1)) {
        scores[players.indexOf(player.name)] += 1;
    }
    updateScore()
    console.log(scores[players.indexOf(player.name)])
}
function getRandomSpawnX(c, angle) {
    return c * Math.sin(angle)

}
function getRandomSpawnZ(c, angle) {
    return c * Math.cos(angle)
}
function resp(event) {
    var player = event.player;
    if (players.indexOf(player.name != -1)) {
        var c = Math.floor(Math.random() * 14);
        var angle = Math.floor(Math.random() * 365);
        spawn.x += getRandomSpawnX(c,angle);
        spawn.z += getRandomSpawnZ(c,angle);
        teleport(player, spawn);
        spawn.x -= getRandomSpawnX(c,angle);
        spawn.z -= getRandomSpawnZ(c,angle);
    }
}
events.playerRespawned(resp)
events.playerDeath(death)
function spleefArena() {
    var d = this;
    spawn = 
    d
    .chkpt('start')
    .fwd(16)
    .chkpt('score') 
    .turn()
    .back(16)
    .down()
    .cylinder(blocks.quartz, 16, 2)
    .up()
    .fwd()
    .right()
    .cylinder(blocks.lava, 15, 1)
    .up()
    .back()
    .left()
    .cylinder0(blocks.quartz, 16, 2)
    .up(2)
    .cylinder0(blocks.wool.green, 16, 1)
    .up()
    .cylinder0(blocks.glowstone, 16, 1)
    .up()
    .down(4)
    .fwd()
    .right()
    .cylinder(blocks.snow, 15, 1)
    .fwd(16)
    .right(16)
    .up(2)
    .getLocation()
    updateScore()
}
function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }
  exports.getMaxOfArray = getMaxOfArray;
Drone.extend(spleefArena)
