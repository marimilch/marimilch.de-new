export function applyOn(s){
  if (s.hasAttribute('data-initialized')) return

  for (var j = 0; j < 3; j++) {
    const div = document.createElement('div')
    // div.style.animationPlayState = "running";
    s.appendChild(div)
  }

  updatePerspectiveOrigin(s)

  window.addEventListener('scroll', () => {
    updatePerspectiveOrigin(s)
  })
  window.addEventListener('resize', () => {
    updatePerspectiveOrigin(s)
  })

  s.setAttribute('data-initialized', '')
} 

function updatePerspectiveOrigin(s) {
  const wTop = window.innerHeight / 2
  const wLeft = window.innerWidth / 2

  const rect = s.getBoundingClientRect()
  const winMidX = wLeft - rect.left
  const winMidY = wTop - rect.top

  const left = winMidX
  const top = winMidY

  s.style.perspectiveOrigin =
        left + 'px ' +
        top + 'px'
  

  const brightness = lightDist(
    scalarProductNorm(
      vec(0, 0, 800),
      vec(0, (rect.top + rect.height / 2) - wTop, 800)
    )
  )

  s.style.filter = 'brightness(' + (1 + brightness) + ')'
}

function lightDist(x) {
  return (x - 0.92) * 2.5
}

function vec(x, y, z) {
  const v = {
    x: x,
    y: y,
    z: z
  }

  return v
}

function scalarProductNorm(v1_, v2_) {
  const v1 = normalize(v1_)
  const v2 = normalize(v2_)
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
}

function normalize(v) {
  const a = Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2) + Math.pow(v.z, 2))
  const vN = {
    x: v.x / a,
    y: v.y / a,
    z: v.z / a
  }

  return vN
}