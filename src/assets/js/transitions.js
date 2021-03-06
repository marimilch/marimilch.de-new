import anime from 'animejs/lib/anime.es.js'

function getMain(){
  return document.querySelector('main')
}

function overlappingLeave(el){
  const main = getMain()

  main.style.height = el.getBoundingClientRect().height + 'px'
  el.style.position = 'absolute'

  el.style.overflow = 'hidden'
  el.style.zIndex = '5'
}

function overlappingEnter(el) {
  const main = getMain()
  const leaving = document.querySelector('.v-leave-active')
  const rect = el.getBoundingClientRect()

  if (leaving){
    console.log('found leaving')
    leaving.style.height = rect.height + 'px'
  }

  main.style.height = rect.height + 'px'
  // el.style.position = 'absolute'
}

// function overlappingEnterAfter() {
//   const main = getMain()

//   main.style.height = ''
// }

function handleMilkGlass(_this){
  const path = _this.$route.path
  const milkglass = _this.$refs.milkglass

  if (path == '/') {
    // model.setVisible()
    milkglass.moveTo(
      -1.4,
      0,
      0
    )
    return
  }

  if ( path.includes('about') ){
    // model.setVisible()
    milkglass.moveTo(
      1.2, 
      -.5, 
      2
    )
    return
  }

  // model.setHidden()
  milkglass.moveTo(
    -5,
    0,
    .5
  )
}

function stopLoadingBar(_this){
  if (_this.$refs.loadingBar) _this.$refs.loadingBar.finishLoading()
}

function fadeEnter(el, done) {
  stopLoadingBar(this)
  overlappingEnter(el)
  // colorChangeNav(el)
  handleMilkGlass(this)

  anime({
    targets: el,
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
    filter: [
      {
        value: 'blur(100px)',
        duration: 0,
        easing: 'linear'
      },
      {
        value: 'blur(0)',
        duration: 500,
        easing: 'easeOutQuad'
      },
    ],
    complete: done
  })
}

function fadeLeave(el, done) {
  overlappingLeave(el)

  anime({
    targets: el,
    opacity: [
      {
        value: 1,
        duration: 0,
        easing: 'linear'
      },
      {
        value: isBGZoom(1, 0),
        duration: 1000,
        easing: 'easeOutQuad'
      },
    ],
    filter: [
      {
        value: 'blur(0px)',
        duration: 0,
        easing: 'linear'
      },
      {
        value: 'blur(100px)',
        duration: 1000,
        easing: 'easeOutQuad'
      },
    ],
    complete: done
  })
}

function isBGElem(el){
  return el.classList.contains('background-zoom')
}

function isBGZoom(yes, no){
  return (el) => { return isBGElem(el) ? yes : no }
}

function projectDetailsEnter(el, done) {
  stopLoadingBar(this)
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

  anime({
    targets: clipBackground,
    opacity: [
      { value: 0, duration: 0, easing: 'linear' },
      { value: 1, duration: 1000, easing: 'easeInOutQuad' }
    ]
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
