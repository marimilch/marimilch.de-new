import anime from 'animejs/lib/anime.es.js'

const STAGGER_DELAY = 100

function getMain(){
  return document.querySelector('main')
}

function overlappingLeave(el){
  // const main = getMain()

  // main.style.height = el.getBoundingClientRect().height + 'px'

  el.style.position = 'absolute'
}

function overlappingEnter(el) {
  const main = getMain()

  main.style.height = el.getBoundingClientRect().height + 'px'
}

function overlappingEnterAfter() {
  const main = getMain()

  main.style.height = ''
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

  if (!milkglass.startPositionModel) return

  if (path.includes('projects')) {
    milkglass.moveTo(
      -.75,
      milkglass.startPositionModel.y,
      milkglass.startPositionModel.z
    )
    return
  }

  if ( path.includes('about') ){
    milkglass.moveTo(
      .1, 
      milkglass.startPositionModel.y - .08, 
      .5
    )
    return
  }

  milkglass.moveTo(
    milkglass.startPositionModel.x,
    milkglass.startPositionModel.y,
    milkglass.startPositionModel.z
  )
}

function fadeEnter(el, done) {
  overlappingEnter(el)
  colorChangeNav(el)
  handleMilkGlass(this)

  anime({
    targets: el.children,
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
        value: isBGZoom(2, 1),
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

function isBGElem(el){
  return el.classList.contains('background-zoom')
}

function isBGZoom(yes, no){
  return (el) => { return isBGElem(el) ? yes : no }
}

function fadeLeave(el, done) {
  overlappingLeave(el)
  colorChangeNav(el)

  anime({
    targets: el.children,
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
        value: isBGZoom(2, 1),
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

function projectDetailsLeave(el, done) {
  // overlappingEnter(el)

  const projectSlug = this.$route.params.slug
  const entryToDetails = el.querySelector(`#${projectSlug} .entry-to-details`)
  const entryToDetailsRect = entryToDetails.getBoundingClientRect()

  console.log(el, `#${projectSlug} .entry-to-details`, entryToDetails)

  anime({
    targets: entryToDetails,
    opacity: { value: 1, easing: 'easeOutCubic', duration: 1000 },
    width: { value: '100vw', duration: 1500, easing: 'easeOutElastic(1, .6)' },
    height: { value: '100vh', duration: 1500, easing: 'easeOutElastic(1, .6)' },
    translateY: { value: -entryToDetailsRect.top + 'px', duration: 1500, easing: 'easeOutElastic(1, .6)' },
    translateX: { value: -entryToDetailsRect.left + 'px', duration: 1500, easing: 'easeOutElastic(1, .6)' },
    completed: done
  })
}

export const Fade = {
  enter: fadeEnter,
  leave: fadeLeave,
}

export const ProjectDetails = {
  enter: fadeEnter,
  leave: projectDetailsLeave,
}
