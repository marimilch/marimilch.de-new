import anime from 'animejs/lib/anime.es.js'

const STAGGER_DELAY = 100

function getMain(){
  return document.querySelector('main')
}

function overlappingLeave(el){
  const main = getMain()

  main.style.height = el.getBoundingClientRect().height + 'px'
  el.style.position = 'absolute'
}

function overlappingEnter(el) {
  const main = getMain()

  main.style.height = el.getBoundingClientRect().height + 'px'
  // el.style.position = 'absolute'
}

function overlappingEnterAfter() {
  const main = getMain()

  // main.style.height = ''
}

function colorChangeNav(view){
  const maybeBG = view.querySelector('.background-zoom');

  if ( maybeBG && isBGElem(maybeBG) ){
    const h1 = document.querySelector('h1')

    h1.classList.add('color-canvas')

    return
  }

  const h1 = document.querySelector('h1')
  h1.classList.remove('color-canvas')

}

function handleMilkGlass(_this){
  const path = _this.$route.path
  const milkglass = _this.$refs.milkglass

  // if (!milkglass.startPositionModel) return

  if (path == '/') {
    milkglass.moveTo(
      0,
      0,
      0
    )
    return
  }

  if ( path.includes('about') ){
    milkglass.moveTo(
      1.4, 
      -.5, 
      2
    )
    return
  }

  milkglass.moveTo(
    -4,
    0,
    .5
  )
}

function handleWave(_this){
  const path = _this.$route.path
  const wave = _this.$refs.wave

  if (path.includes('projects/')) {
    wave.play()
  }
}

function getAnimeTargets(el){
  const maybeFadeWrap = el.querySelector('.fade-wrap')
  if (maybeFadeWrap) return maybeFadeWrap.children

  return el.children
}

function fadeEnter(el, done) {
  overlappingEnter(el)
  colorChangeNav(el)
  handleMilkGlass(this)
  handleWave(this)

  anime({
    targets: getAnimeTargets(el),
    opacity: [
      {
        value: isBGZoom(1, 0),
        duration: 0,
        easing: 'linear'
      },
      {
        value: 1,
        duration: 500,
        easing: 'easeOutQuad'
      },
    ],
    scale: [
      {
        value: isBGZoom(0, .5),
        duration: 0,
        easing: 'linear'
      },
      {
        value: isBGZoom(1, 1),
        duration: 1500,
        easing: 'easeOutElastic(1, .6)'
      },
    ],
    delay: anime.stagger(STAGGER_DELAY),
    complete: () => {
      done()
      overlappingEnterAfter()
    }
  })
}

function fadeLeave(el, done) {
  overlappingLeave(el)
  colorChangeNav(el)

  anime({
    targets: getAnimeTargets(el),
    opacity: [
      {
        value: 1,
        duration: 0,
        easing: 'linear'
      },
      {
        value: isBGZoom(1, 0),
        duration: 500,
        easing: 'easeOutQuad'
      },
    ],
    scale: [
      {
        value: isBGZoom(1, 1),
        duration: 0,
        easing: 'linear'
      },
      {
        value: isBGZoom(0, .5),
        duration: 1000,
        easing: 'easeOutQuad'
      },
    ],
    delay: anime.stagger(STAGGER_DELAY),
    complete: done
  })
}

function isBGElem(el){
  return el.classList.contains('background-zoom')
}

function isBGZoom(yes, no){
  return (el) => { return isBGElem(el) ? yes : no }
}

function getScreenDims(){
  return {
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
  } 
}

function projectDetailsEnter(el, done) {
  const projectSlug = this.$route.params.slug

  if (!projectSlug) {
    fadeEnter.bind(this)(el, done)
    return
  }

  handleMilkGlass(this)

  document.body.scrollTo({
    top: 0,
    behaviour: 'smooth'
  })

  const clipBackground = el.querySelector('.project-video')
  const h1 = el.querySelector('.project-name')

  anime({
    targets: clipBackground,
    opacity: [
      { value: 0, duration: 0, easing: 'linear' },
      { value: 1, duration: 1000, easing: 'easeInOutQuad' }
    ]
  })

  anime({
    targets: h1,
    opacity: [
      { value: 0, duration: 0 },
      { value: 1, duration: 750, easing: 'easeInOutQuad' }
    ],
    delay: 1500,
    complete: done
  })

  anime({
    targets: el.querySelectorAll('h2, h3, h4, h5, h6, p'),
    opacity: [
      { value: 0, duration: 0 },
      { value: 1, duration: 750, easing: 'easeInOutQuad' }
    ],
    delay: anime.stagger(250, { start: 2250 }),
  })
}

export const Fade = {
  enter: fadeEnter,
  leave: fadeLeave,
}

export const Project = {
  enter: projectDetailsEnter,
  leave: fadeLeave,
}
