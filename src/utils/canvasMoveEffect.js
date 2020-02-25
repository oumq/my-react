let canvas = null,
  background = null,
  foreground1 = null,
  foreground2 = null,
  config = {
    circle: {
      amount: 18,
      layer: 3,
      color: [157, 97, 207],
      alpha: 0.3
    },
    line: {
      amount: 12,
      layer: 3,
      color: [255, 255, 255],
      alpha: 0.3
    },
    speed: 0.5,
    angle: 20
  },
  bctx = null,
  fctx1 = null,
  fctx2 = null,
  M = window.Math,
  degree = (config.angle / 360) * M.PI * 2,
  circles = [],
  lines = [],
  wWidth = 0,
  wHeight = 0,
  timer = null

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function(callback, element) {
    setTimeout(callback, 1000 / 60)
  }

const cancelAnimationFrame =
  window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  clearTimeout

function drawCircle(x, y, radius, color, alpha) {
  let gradient = fctx1.createRadialGradient(x, y, radius, x, y, 0)
  gradient.addColorStop(
    0,
    'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + alpha + ')'
  )
  gradient.addColorStop(
    1,
    'rgba(' +
      color[0] +
      ',' +
      color[1] +
      ',' +
      color[2] +
      ',' +
      (alpha - 0.1) +
      ')'
  )
  fctx1.beginPath()
  fctx1.arc(x, y, radius, 0, M.PI * 2, true)
  fctx1.fillStyle = gradient
  fctx1.fill()
}

function drawLine(x, y, width, color, alpha) {
  let endX = x + M.sin(degree) * width
  let endY = y - M.cos(degree) * width
  let gradient = fctx2.createLinearGradient(x, y, endX, endY)
  gradient.addColorStop(
    0,
    'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + alpha + ')'
  )
  gradient.addColorStop(
    1,
    'rgba(' +
      color[0] +
      ',' +
      color[1] +
      ',' +
      color[2] +
      ',' +
      (alpha - 0.1) +
      ')'
  )

  fctx2.beginPath()
  fctx2.moveTo(x, y)
  fctx2.lineTo(endX, endY)
  fctx2.lineWidth = 3
  fctx2.lineCap = 'round'
  fctx2.strokeStyle = gradient
  fctx2.stroke()
}

function drawBack() {
  bctx.clearRect(0, 0, wWidth, wHeight)

  let gradient = []

  gradient[0] = bctx.createRadialGradient(
    wWidth * 0.3,
    wHeight * 0.1,
    0,
    wWidth * 0.3,
    wHeight * 0.1,
    wWidth * 0.9
  )
  gradient[0].addColorStop(0, 'rgb(0, 26, 77)')
  gradient[0].addColorStop(1, 'transparent')

  bctx.translate(wWidth, 0)
  bctx.scale(-1, 1)
  bctx.beginPath()
  bctx.fillStyle = gradient[0]
  bctx.fillRect(0, 0, wWidth, wHeight)

  gradient[1] = bctx.createRadialGradient(
    wWidth * 0.1,
    wHeight * 0.1,
    0,
    wWidth * 0.3,
    wHeight * 0.1,
    wWidth
  )
  gradient[1].addColorStop(0, 'rgb(0, 150, 240)')
  gradient[1].addColorStop(0.8, 'transparent')

  bctx.translate(wWidth, 0)
  bctx.scale(-1, 1)
  bctx.beginPath()
  bctx.fillStyle = gradient[1]
  bctx.fillRect(0, 0, wWidth, wHeight)

  gradient[2] = bctx.createRadialGradient(
    wWidth * 0.1,
    wHeight * 0.5,
    0,
    wWidth * 0.1,
    wHeight * 0.5,
    wWidth * 0.5
  )
  gradient[2].addColorStop(0, 'rgb(40, 20, 105)')
  gradient[2].addColorStop(1, 'transparent')

  bctx.beginPath()
  bctx.fillStyle = gradient[2]
  bctx.fillRect(0, 0, wWidth, wHeight)
}

function animate() {
  let sin = M.sin(degree),
    cos = M.cos(degree)

  if (config.circle.amount > 0 && config.circle.layer > 0) {
    fctx1.clearRect(0, 0, wWidth, wHeight)
    for (let i = 0, len = circles.length; i < len; i++) {
      let item = circles[i],
        x = item.x,
        y = item.y,
        radius = item.radius,
        speed = item.speed

      if (x > wWidth + radius) {
        x = -radius
      } else if (x < -radius) {
        x = wWidth + radius
      } else {
        x += sin * speed
      }

      if (y > wHeight + radius) {
        y = -radius
      } else if (y < -radius) {
        y = wHeight + radius
      } else {
        y -= cos * speed
      }

      item.x = x
      item.y = y
      drawCircle(x, y, radius, item.color, item.alpha)
    }
  }

  if (config.line.amount > 0 && config.line.layer > 0) {
    fctx2.clearRect(0, 0, wWidth, wHeight)
    for (let j = 0, len = lines.length; j < len; j++) {
      let item = lines[j],
        x = item.x,
        y = item.y,
        width = item.width,
        speed = item.speed

      if (x > wWidth + width * sin) {
        x = -width * sin
      } else if (x < -width * sin) {
        x = wWidth + width * sin
      } else {
        x += sin * speed
      }

      if (y > wHeight + width * cos) {
        y = -width * cos
      } else if (y < -width * cos) {
        y = wHeight + width * cos
      } else {
        y -= cos * speed
      }

      item.x = x
      item.y = y
      drawLine(x, y, width, item.color, item.alpha)
    }
  }

  timer = requestAnimationFrame(animate)
}

function createItem () {
  circles = []
  lines = []

  if (config.circle.amount > 0 && config.circle.layer > 0) {
    for (let i = 0; i < config.circle.amount / config.circle.layer; i++) {
      for (let j = 0; j < config.circle.layer; j++) {
        circles.push({
          x: M.random() * wWidth,
          y: M.random() * wHeight,
          radius: M.random() * (20 + j * 5) + (20 + j * 5),
          color: config.circle.color,
          alpha: M.random() * 0.2 + (config.circle.alpha - j * 0.1),
          speed: config.speed * (1 + j * 0.5)
        })
      }
    }
  }

  if (config.line.amount > 0 && config.line.layer > 0) {
    for (let m = 0; m < config.line.amount / config.line.layer; m++) {
      for (let n = 0; n < config.line.layer; n++) {
        lines.push({
          x: M.random() * wWidth,
          y: M.random() * wHeight,
          width: M.random() * (20 + n * 5) + (20 + n * 5),
          color: config.line.color,
          alpha: M.random() * 0.2 + (config.line.alpha - n * 0.1),
          speed: config.speed * (1 + n * 0.5)
        })
      }
    }
  }

  cancelAnimationFrame(timer)
  timer = requestAnimationFrame(animate)
  drawBack()
}

export const initCanvas = dom => {
  canvas = dom.children
  background = canvas[0]
  foreground1 = canvas[1]
  foreground2 = canvas[2]
  if (background.getContext) {
    bctx = background.getContext('2d')
    fctx1 = foreground1.getContext('2d')
    fctx2 = foreground2.getContext('2d')
    wWidth = dom.offsetWidth
    wHeight = dom.offsetHeight
    for (let i = 0; i < canvas.length; i++) {
      canvas[i].width = wWidth
      canvas[i].height = wHeight
    }
    createItem()
  }
}
