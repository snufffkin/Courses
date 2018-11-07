var Drone = require('drone');
var blocks = require('blocks')
var sounds = require('sounds')
var utils = require('utils')
var pointOne = [-377,15,-1065]
var pointTwo = [-377,15,-1038]
var players = []
var scores = [0,0]
var zona = [
    {
        x: -387,
        z: -1037
    },
    {
        x: -367,
        z: -1066
    }
]
function startBascket() {
    var listPlayers = utils.players();
    for (var i = 0; i < listPlayers.length; i++) {
        var player = utils.player(listPlayers[i].name)
        if (inZone(player)) {
            players.push(player.name)
        }
    }
    for (var i = 0; i < listPlayers.length; i++) {
        echo(players[i]);
    }
}
exports.startBascket = startBascket;
function inZone(player) {
    var loc = player.location;
    if (loc.x < zona[1].x && loc.x > zona[0].x) {
        if (loc.z > zona[1].z && loc.z < zona[0].z) {
            return true;
        }
    }
}
function build() {
    this
    .box(blocks.wool.red, 21, 1, 5)
    .fwd(5)
    .box(blocks.wool.yellow, 21, 1, 5)
    .fwd(5)
    .box(blocks.wool.green, 21, 1, 5)
    .fwd(5)
    .box(blocks.wool.green, 21, 1, 5)
    .fwd(5)
    .box(blocks.wool.yellow, 21, 1, 5)
    .fwd(5)
    .box(blocks.wool.red, 21, 1, 5)
    .fwd(4)
    .up(1)
    .right(10)
    .box(blocks.wool.black, 1, 10, 1)
    .up(10)
    .left(1)
    .box(blocks.wool.black, 3, 3, 3)
    .right(1)
    .up(1)
    .box(blocks.air, 1, 1, 1)
    .back(1)
    .box(blocks.air, 1, 1, 1)
    .back(28)
    .down(11)
    .box(blocks.wool.black, 1, 10, 1)
    .up(10)
    .left(1)
    .box(blocks.wool.black, 3, 3, 3)
    .right(1)
    .up(1)
    .box(blocks.air, 1, 1, 1)
    .fwd(2)
    .box(blocks.air, 1, 1, 1)
    .down(12)
    .fwd(11)
    .left(1)
    .box(blocks.iron, 3, 1, 4)
}
Drone.extend(build)
function snowball(event) {
    var projectile = event.getProjectile();
    var loc = projectile.location;
    console.log(Math.floor(loc.x) + ' ' + Math.floor(loc.y) + ' ' + Math.ceil(loc.z))
    if (checkOne(loc, pointOne)){
        console.log('1')
        scores[0]++;
        echo(scores[0] + ':' + scores[1])
    }
    else if (checkTwo(loc, pointTwo)){
        console.log('2')
        scores[1]++
        echo(scores[0] + ':' + scores[1])
    }
    else {
        console.log('false')
    }
}
events.projectileHit(snowball)
function checkTwo(loc, arr) {
    if (Math.floor(loc.x) == arr[0] && Math.floor(loc.y) == arr[1] && Math.ceil(loc.z) == arr[2]) {
        return true;
    }
}
function checkOne(loc, arr) {
    if (Math.floor(loc.x) == arr[0] && Math.floor(loc.y) == arr[1] && Math.floor(loc.z) == arr[2]) {
        return true;
    }
}
