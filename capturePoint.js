var Drone = require('drone');
var blocks = require('blocks');
var slash = require('slash')

var point = {
    loc: {},
    team: 'red',
    captureTime: 0,
    playerInZone: 'red'
}
var teamBlue = []
var teamRed = []

function joinTeams(player,color) {
    if (color == 'blue') {
        teamBlue.push(player.name)
    }
    else {
        teamRed.push(player.name)
    }
    echo('blue: ' + teamBlue[0] + ' red: ' + teamRed[0])
}
exports.joinTeams = joinTeams;

function setCenter() {
    point.loc = this.chkpt('centerMountain').getLocation()
}
Drone.extend(setCenter)
function mountain() {
    var radius = 35;
    for (var i = 0; i < 30; i++) {
        this
        .cylinder(57,radius)
        .right()
        .fwd()
        .up()
        radius--;
    }
}
function changeCenter(color) {
    if (color == 'blue'){
        var block = blocks.stained_glass.blue
    }
    else {
        var block = blocks.stained_glass.red
    }
    this.move('centerMountain').box(block)
}
function checkZone(event) {
    var a = Math.abs(point.loc.x - event.player.location.x)
    var b = Math.abs(point.loc.z - event.player.location.z)
    var c = Math.sqrt(a * a + b * b)
    if (c <= 5) {
        console.log(true)
        var name = event.player.name;
        if (teamBlue.indexOf(name) != -1) {
            point.playerInZone = 'blue'
        }
        if (teamRed.indexOf(name) != -1){
            point.playerInZone = 'red'
        }
    }
}
events.playerMove(checkZone)
Drone.extend(changeCenter)
Drone.extend(mountain)

function captureGame() {
    setInterval(function() {
        console.log(point.playerInZone)
        console.log(point.captureTime)
        if (point.team != point.playerInZone) {
            point.captureTime++;
        }
        if (point.team == point.playerInZone) {
            point.captureTime = 0;
        }
        if (point.captureTime == 5) {
            if (point.team == 'red') {
                point.team = 'blue'
            }
            else {
                point.team = 'red'
            }
            changeCenter(point.playerInZone)
        }
    },1000)

}
exports.captureGame = captureGame