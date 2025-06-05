let board = document.querySelector("#container")
let body = document.querySelector("#body")
let btn = document.querySelector("#roll-button")
let n = Number(prompt("Type the number of people"))
let innerDiv = 24;
let outerDiv = 60;
let rollvalue;
let d1done = true;
let d2done = true;
let locs = []
board.style.width = "510px";
board.style.height = "510px";
let widthDistance = (innerWidth - 510)/2;
let heightDistance = (innerHeight - 510)/2;
board.style.top = heightDistance+"px";
board.style.left = widthDistance+"px";
let turn = 0;
let turns = ["blue","red","green","yellow"]
btn.innerHTML = `Roll Dice (${turns[turn%n]})`;
let boxes = {
    "o0":[0,9,"#FF8599"],
    "o1":[1,9,"pink"],
    "o2":[2,9,"pink"],
    "o3":[3,9,"pink"],
    "o4":[4,9,"pink"],
    "o5":[5,9,"pink"],
    "o6":[6,9,"pink"],
    "o7":[7,10,"beige"],
    "o8":[7,11,"beige"],
    "o9":[7,12,"beige"],
    "o10":[7,13,"beige"],
    "o11":[7,14,"beige"],
    "o12":[7,15,"beige"],
    "o13":[7,16,"beige"],
    "o14":[8,16,"beige"],
    "o15":[9,16,"#EAE9B1"],
    "o16":[9,15,"beige"],
    "o17":[9,14,"beige"],
    "o18":[9,13,"beige"],
    "o19":[9,12,"beige"],
    "o20":[9,11,"beige"],
    "o21":[9,10,"beige"],
    "o22":[10,9,"lightblue"],
    "o23":[11,9,"lightblue"],
    "o24":[12,9,"lightblue"],
    "o25":[13,9,"lightblue"],
    "o26":[14,9,"lightblue"],
    "o27":[15,9,"lightblue"],
    "o28":[16,9,"lightblue"],
    "o29":[16,8,"lightblue"],
    "o30":[16,7,"#72BDD4"],
    "o31":[15,7,"lightblue"],
    "o32":[14,7,"lightblue"],
    "o33":[13,7,"lightblue"],
    "o34":[12,7,"lightblue"],
    "o35":[11,7,"lightblue"],
    "o36":[10,7,"lightblue"],
    "o37":[9,6,"lightgreen"],
    "o38":[9,5,"lightgreen"],
    "o39":[9,4,"lightgreen"],
    "o40":[9,3,"lightgreen"],
    "o41":[9,2,"lightgreen"],
    "o42":[9,1,"lightgreen"],
    "o43":[9,0,"lightgreen"],
    "o44":[8,0,"lightgreen"],
    "o45":[7,0,"#4BE34B"],
    "o46":[7,1,"lightgreen"],
    "o47":[7,2,"lightgreen"],
    "o48":[7,3,"lightgreen"],
    "o49":[7,4,"lightgreen"],
    "o50":[7,5,"lightgreen"],
    "o51":[7,6,"lightgreen"],
    "o52":[6,7,"pink"],
    "o53":[5,7,"pink"],
    "o54":[4,7,"pink"],
    "o55":[3,7,"pink"],
    "o56":[2,7,"pink"],
    "o57":[1,7,"pink"],
    "o58":[0,7,"pink"],
    "o59":[0,8,"pink"],
    "i0":[1,8,"red"],
    "i1":[2,8,"red"],
    "i2":[3,8,"red"],
    "i3":[4,8,"red"],
    "i4":[5,8,"red"],
    "i5":[6,8,"red"],
    "i11":[8,10,"yellow"],
    "i10":[8,11,"yellow"],
    "i9":[8,12,"yellow"],
    "i8":[8,13,"yellow"],
    "i7":[8,14,"yellow"],
    "i6":[8,15,"yellow"],
    "i17":[10,8,"blue"],
    "i16":[11,8,"blue"],
    "i15":[12,8,"blue"],
    "i14":[13,8,"blue"],
    "i13":[14,8,"blue"],
    "i12":[15,8,"blue"],
    "i18":[8,1,"green"],
    "i19":[8,2,"green"],
    "i20":[8,3,"green"],
    "i21":[8,4,"green"],
    "i22":[8,5,"green"],
    "i23":[8,6,"green"],
}
const div = (top,left,color="white")=>{
    let d = document.createElement("div")
    board.appendChild(d)
    d.style.top = (top*30)+"px";
    d.style.left = (left*30)+"px";
    d.style.backgroundColor = color;
}
function d1() {
    if(!d1done){
    check(rollvalue[0])
    d1done = true;
    }
}
function d2() {
    if(!d2done){
    check(rollvalue[1])
    d2done = true;
    }
}
function findLocation(color,name){
    let locations = {
        red:{
            p1: [60,360],
            p2: [60,420],
            p3: [120,360],
            p4: [120,420]
        },
        yellow:{
            p1: [360,360],
            p2: [360,420],
            p3: [420,360],
            p4: [420,420]
        },
        blue:{
            p1: [360,60],
            p2: [360,120],
            p3: [420,60],
            p4: [420,120]
        },
        green:{
            p1: [60,60],
            p2: [60,120],
            p3: [120,60],
            p4: [120,120]
        }
    }
    return locations[color][name]
}
function Player(color,name,id){
    this.id = id
    this.color = color;
    this.name = name;
    this.position = "none";
    this.location = findLocation(this.color,this.name);
    this.num = false;
    this.inside = false;
    this.insideNum = null;
    this.element = document.createElement("div")
    board.appendChild(this.element)
    this.element.className = "player";
    this.element.style.backgroundColor = this.color;
    this.havStarted = false;
    this.atHome = false;
    this.update = ()=>{
        this.element.style.top = this.location[0]+"px";
        this.element.style.left = this.location[1]+"px";
        locs[this.id] = this.location;
    }
    this.element.addEventListener("click",()=>{
        if(allowed.indexOf(this.name) != -1){
        move(allowed[0],this)
        checked--;
        check(0)
        }
    })
    this.update()
}
function times(box){
    return [box[0]*30,box[1]*30]
}
function index(parr,carr){
    found = false;
    for (let i = 0; i < parr.length; i++) {
        const arr = parr[i];
        if(arr[0] == carr[0] && arr[1] == carr[1]){
            found = true;
            return i;
        }
    }
    if(!found){
    return -1
    }
}
function equal(a,b){
    let same = true;
    for (let i = 0; i < a.length; i++) {
        if(a[i]!=b[i]){
            same = false;
        }
    }
    return same;
}
function goInside(player,val) {
    if(player.num+val > info[player.color][3] && player.num <= info[player.color][3]){
        let newVal = info[player.color][3] - player.num;
        if(player.inside){
            moveIn(val,player)
            return true;
        }
        else if (val-newVal <= 7){
            move(newVal,player)
            player.insideNum = -1;
            moveIn((val-newVal),player)
            player.inside = true;
            return true;
        }
        else{
            return false;
        }
    }
}
function allHome(color) {
    let c = color[0]
    if(players[`${c}p1`].atHome&&players[`${c}p2`].atHome&&players[`${c}p3`].atHome&&players[`${c}p4`].atHome){
        return true
    }
}
function moveIn(val,player) {
    if((player.insideNum + val) < 6){
    player.insideNum += val;
    player.location = times(boxes["i"+(player.insideNum+info[player.color][4])])
    player.update()
    }
    else if((player.insideNum + val) == 6){
        player.insideNum += val-1;
        player.location = times(boxes["i"+(player.insideNum+info[player.color][4])])
        player.location[info[player.color][5]] += info[player.color][6];
        player.update()
        player.atHome = true;
        if(allHome(player.color)){
            alert(`${player.color} has won!!`)
        }
    }
}
function move(val,player){
    if(val == 6 && !player.havStarted){
        player.havStarted = true;
        player.location = times(info[player.color][1]);
        if(!info[player.color][0]){
            info[player.color][0] = true;
        }
        player.update()
        player.num = info[player.color][2];
    }
    else{
        if(!goInside(player,val) || !player.inside){
        player.num += val;
        player.location = times(boxes["o"+(player.num%60)])
        player.update()
        }
    }
    let loc = [];
    for (let i = 0; i < locs.length; i++) {
        const element = locs[i];
        loc.push(element)
    }
    loc.splice(index(loc,player.location),1)
    if(index(loc,player.location) != -1){
        for (p in players) {
            let play = players[p];
            if(equal(play.location,player.location) && (play.color != player.color)){
                play.location = findLocation(play.color,play.name);
                play.update()
                play.havStarted = false;
                play.num = info[player.color][2];
            }
        }
    }
}
for (let i = 0; i < outerDiv; i++) {
    let elem = boxes["o"+i]
    div(elem[0],elem[1],elem[2])
}
for (let i = 0; i < innerDiv; i++) {
    let elem = boxes["i"+i]
    div(elem[0],elem[1],elem[2])
}
let players = {
    rp1: new Player("red","p1",0),
    rp2: new Player("red","p2",1),
    rp3: new Player("red","p3",2),
    rp4: new Player("red","p4",3),
    yp1: new Player("yellow","p1",4),
    yp2: new Player("yellow","p2",5),
    yp3: new Player("yellow","p3",6),
    yp4: new Player("yellow","p4",7),
    bp1: new Player("blue","p1",8),
    bp2: new Player("blue","p2",9),
    bp3: new Player("blue","p3",10),
    bp4: new Player("blue","p4",11),
    gp1: new Player("green","p1",12),
    gp2: new Player("green","p2",13),
    gp3: new Player("green","p3",14),
    gp4: new Player("green","p4",15),
}
let info = {
    red: [false,boxes["o0"],0,59,0,0,30],
    blue: [false,boxes["o30"],30,89,12,0,-30],
    yellow: [false,boxes["o15"],15,74,6,1,-30],
    green: [false,boxes["o45"],45,104,18,1,30]
}
let proceed = false;
function evaluate(value){
    if(info[turns[turn%n]][0]){
        d1done = false;
        d2done = false;
        proceed = true;
    }
    else if(value[0] == 6 || value[1] == 6){
        d1done = false;
        d2done = false;
        proceed = true;
    }
    else{
        turn++;
        btn.disabled = false;
        btn.innerHTML = `Roll Dice (${turns[turn%n]})`;
    }
}
// Dice
function rollDouble(){
    btn.disabled = "true";
    rollvalue = [roll(document.querySelector("#dice1")),roll(document.querySelector("#dice2"))]
    setTimeout(()=>{evaluate(rollvalue)},1000)
}
let allowed;
let checked = 0;
function check(value){
    let arr = [value];
    if(proceed == true){
    if(value == 6){
        allowed = [value,"p1","p2","p3","p4"]
    }
    else{
        for (let i = 0; i < 4; i++) {
            let color = turns[turn%n];
            color = color[0];
            console.log(color)
            if(players[color+"p"+(i+1)].havStarted){
                arr[arr.length] = "p"+(i+1);
            }
        }
        allowed = arr;
    }
    }
    checked++
    if(checked == 2){
        turn++;
        btn.disabled = false;
        btn.innerHTML = `Roll Dice (${turns[turn%n]})`;
        checked = 0;
    }
}
let yArrange = {
    0: 1,
    1: 4,
    2: 2,
    3: 3
}
let xArrange = {
    1: {
       0: 1,
       1: 6,
       2: 2,
       3: 5 
    },
    2: {
       0: 2,
       1: 6,
       2: 1,
       3: 5 
    },
    3: {
       0: 3,
       1: 6,
       2: 4,
       3: 5 
    },
    4: {
       0: 4,
       1: 6,
       2: 3,
       3: 5 
    }
}
var min = 1;
var max = 48;
function roll(cube) {
debugger;
  var xRand = getRandom(max, min);
  var yRand = getRandom(max, min);
  cube.style.transform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
  let x = (xRand/90)%4;
  let y = (yRand/90)%4;
  let value = xArrange[yArrange[y]][x];
  return value;
}

function getRandom(max, min) {
  return (Math.floor(Math.random() * (max-min)) + min) * 90;
}