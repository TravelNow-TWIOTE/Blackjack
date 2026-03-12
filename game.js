let points=1000
let wager=0

let deck=[]
let player=[]
let dealer=[]

let active=false

let rounds=0
let wins=0
let losses=0

function update(){

document.getElementById("points").innerText="Points: "+points
document.getElementById("betDisplay").innerText=wager

document.getElementById("rounds").innerText=rounds
document.getElementById("wins").innerText=wins
document.getElementById("losses").innerText=losses

}

function disableButtons(v){

document.getElementById("hitBtn").disabled=v
document.getElementById("standBtn").disabled=v
document.getElementById("doubleBtn").disabled=v

}

function setBet(x){

wager+=x

if(wager>points) wager=points

update()

}

function deckBuild(){

deck=[]

let suits=["♠","♥","♦","♣"]
let ranks=["A","2","3","4","5","6","7","8","9","10","J","Q","K"]

for(let s of suits){
for(let r of ranks){
deck.push({r,s})
}
}

deck.sort(()=>Math.random()-0.5)

}

function value(c){

if(c.r==="A") return 11
if(["K","Q","J"].includes(c.r)) return 10
return parseInt(c.r)

}

function total(hand){

let t=0
let aces=0

for(let c of hand){

t+=value(c)

if(c.r==="A") aces++

}

while(t>21 && aces>0){

t-=10
aces--

}

return t

}

function draw(){

return deck.pop()

}

function render(){

let pHTML=""

for(let c of player){

pHTML+="<div class='card'>"+c.r+c.s+"</div>"

}

document.getElementById("player").innerHTML=pHTML

let dHTML=""

if(active){

dHTML+="<div class='card'>?</div>"

dHTML+="<div class='card'>"+dealer[1].r+dealer[1].s+"</div>"

document.getElementById("dealerTotal").innerText="Total: ?"

}
else{

for(let c of dealer){

dHTML+="<div class='card'>"+c.r+c.s+"</div>"

}

document.getElementById("dealerTotal").innerText="Total: "+total(dealer)

}

document.getElementById("dealer").innerHTML=dHTML

document.getElementById("playerTotal").innerText="Total: "+total(player)

update()

}

function start(){

if(active) return

if(wager<=0){

document.getElementById("msg").innerText="Choose bet"

return

}

if(wager>points){

document.getElementById("msg").innerText="Not enough points"

return

}

deckBuild()

player=[draw(),draw()]
dealer=[draw(),draw()]

active=true

disableButtons(false)

rounds++

render()

}

function hit(){

if(!active) return

player.push(draw())

if(total(player)>21){

finish()

}

render()

}

function stand(){

if(!active) return

setTimeout(()=>{

while(total(dealer)<17){

dealer.push(draw())

}

finish()

},600)

}

function doublePlay(){

if(!active) return

wager*=2

player.push(draw())

stand()

}

function finish(){

active=false

disableButtons(true)

let p=total(player)
let d=total(dealer)

if(p>21){

points-=wager
losses++

document.getElementById("msg").innerText="Bust"

}

else if(d>21||p>d){

points+=wager
wins++

document.getElementById("msg").innerText="You win"

}

else if(p<d){

points-=wager
losses++

document.getElementById("msg").innerText="Dealer wins"

}

else{

document.getElementById("msg").innerText="Tie"

}

wager=0

render()

update()

}

function add(){

points+=1000

update()

}

disableButtons(true)

update()
