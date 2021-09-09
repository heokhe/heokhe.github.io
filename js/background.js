const projects = [...document.querySelectorAll('.project')]
const header = document.querySelector('header')
const sections = [header, ...projects]
const palettes = sections.map(section => section.getAttribute('data-palette').split(','))

function listenForScroll(callback) {
  const visiblity = sections.map(() => false)
  let activeSection;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const index = sections.indexOf(entry.target)
      visiblity[index] = entry.isIntersecting
    }
    
    const prevSection = activeSection;
    for (let i = visiblity.length - 1; i >= 0; i--) {
      if (visiblity[i]) {
        activeSection = sections[i]
        break;
      }
    }

    if (activeSection !== prevSection) callback(activeSection, prevSection)
  }, { threshold: 0.2 })
  sections.forEach(section => observer.observe(section))
}

/** @link https://css-tricks.com/thing-know-gradients-transparent-black */
const betterTransparent = color => color.startsWith('#') ? `${color}00` : 'transparent'

const canvas = document.createElement('canvas')
canvas.style.position = 'fixed'
canvas.style.zIndex = -1
document.body.prepend(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = true

const setBackground = color => {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
}
const createGradient = (x, y, color, size, opacity = 1) => {
  const w = window.innerWidth
  const h = window.innerHeight
  const k = Math.max(w / h, 1)

  ctx.setTransform(k, 0, 0, 1, 0,0)
  const g = ctx.createRadialGradient(x / k, y, 0, x / k, y, h * size)
  g.addColorStop(0.05, color)
  g.addColorStop(1, color.startsWith('#') ? `${color}00` : 'transparent')

  ctx.globalAlpha = opacity
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
  ctx.resetTransform()
}

let palette = palettes[0], prevPalette;

function render(t = 1) {
  const w = window.innerWidth
  const h = window.innerHeight

  ctx.clearRect(0, 0, w, h)

  const opacity = 1 - Math.pow(1 - t, 3);

  if (prevPalette) {
    ctx.globalAlpha = 1 - opacity
    setBackground(prevPalette[0])
    createGradient(w, 0, prevPalette[1], 0.9, 1 - opacity)
    createGradient(0, h, prevPalette[2], 0.8, 1 - opacity)
    createGradient(w, h, prevPalette[3], 0.7, 1 - opacity)
  }

  if (palette) {
    ctx.globalAlpha = opacity
    setBackground(palette[0])
    createGradient(w, 0, palette[1], 0.9, opacity)
    createGradient(0, h, palette[2], 0.7, opacity)
    createGradient(w, h, palette[3], 0.7, opacity)
  }
}

let pending = false
function animate(startTime) {
  pending = true

  const t = (Date.now() - startTime) / 500
  render(t)

  if (pending && t < 1) requestAnimationFrame(() => animate(startTime))
  else pending = false
}

listenForScroll((section, prevSection) => {
  if (section) {
    prevPalette = palettes[sections.indexOf(prevSection)]
    palette = palettes[sections.indexOf(section)]
  }

  document.querySelector('meta[name=theme-color]').content = palette[1]

  if (pending) pending = false
  animate(Date.now())
})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  if (!pending) render()
})
