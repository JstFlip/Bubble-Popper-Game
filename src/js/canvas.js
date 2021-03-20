import { distance, randomIntFromRange} from './utils'

const body = document.querySelector('body')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let hueRotate = 0

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: undefined,
  y: undefined
}

let score = 0

addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('click', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
})

class Player {
  constructor() {
    this.x = 200
    this.y = 200
    this.radius = 20
    this.velX = 0.5
    this.velY = 0.5
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.fill()
    ctx.closePath()
  }
  
  move() {
    this.x = mouse.x
    this.y = mouse.y
  }

  update() {
    this.draw()
    this.move()
  }
}

const bubbleImg = new Image()
bubbleImg.src = '../bubble.png'

class Bubble {
  constructor() {
    this.radius = 50
    this.x = Math.floor(Math.random() * (canvas.width - this.radius)) + (0 + this.radius)
    this.y = canvas.height + this.radius
    this.velY = Math.random() * 3 + 1
    this.counted = false
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.fill()
    ctx.closePath()
    //ctx.drawImage(bubbleImg, this.x - 75, this.y - 75, this.radius / 0.34, this.radius / 0.34)
  }
  
  move() {
    this.y -= this.velY
  }

  update() {
    this.draw()
    this.move()
  }
}

let bubbles = []
const player = new Player()

function init() {
  score = 0
  bubbles = []
   for (let i = 0; i < 6; i++) {
    bubbles.push(new Bubble())
  }
}

let animId = null

function animate() {
  animId = requestAnimationFrame(animate)
  canvas.style.backgroundColor = `hsl(${hueRotate}, 100%, 56%)`
  hueRotate++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = '1.5rem Arial'
  ctx.fillStyle = '#fff'
  ctx.fillText(`Score: ${score}`, 50, 50)
  player.update()
  for(let i = 0; i < bubbles.length; i++){
    bubbles[i].update()
    if(distance(mouse.x, mouse.y, bubbles[i].x, bubbles[i].y) < 70){
        if(!bubbles[i].counted){
          score++
          bubbles[i].counted = true
          bubbles.splice(i, 1)
          i--
        }
      } else if(bubbles[i].y < 0 - bubbles[i].radius){
          bubbles.splice(i, 1)
          i--
          end(animId, score)
          // cancelAnimationFrame(animId)
          // if (confirm(`You just lost!\nYour score: ${score}\nDo you want to play again?`)) {
          //   location.reload()
          // } else {
          //   window.close()
          // }
          // createDiv('end', score)
    }
    if(score < 100){
      if(bubbles.length < 6){
        bubbles.push(new Bubble())
      }
    } else if(score < 200){
      if(bubbles.length < 14){
        bubbles.push(new Bubble())
      }
    } else {
      if(bubbles.length < 20){
        bubbles.push(new Bubble())
      }
    }
  }
}

function end(animId, score){
  cancelAnimationFrame(animId)
  createDiv('end', score)
  let btn = document.querySelector('button')
  let DivEl = document.querySelector('div')
  btn.addEventListener('click', ()=>{
    body.removeChild(DivEl)
    init()
    animate()
  })
}

function createDiv(args, score){
  let newDiv = document.createElement('div')
  let newParagraph = document.createElement('p')
  let newBtn = document.createElement('button')
  if(args === 'start'){
    newParagraph.innerHTML = 'Bubble popper'
    newBtn.innerHTML = 'Start!'
  }
  if(args === 'end') {
    newParagraph.innerHTML = `Your score: ${score}`
    newBtn.innerHTML = 'Start over!'
  }
  newDiv.appendChild(newParagraph)
  newDiv.appendChild(newBtn)
  body.appendChild(newDiv)
}

window.addEventListener('load', ()=>{
  createDiv('start') 
  let btn = document.querySelector('button')
  let DivEl = document.querySelector('div')
  btn.addEventListener('click', ()=>{
    body.removeChild(DivEl)
    init()
    animate()
  })
})