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

function fadeEnter(el, done) {
  overlappingEnter(el)

  anime({
    targets: el.children,
    opacity: [
      {
        value: 0,
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
        value: .5,
        duration: 0,
        easing: 'linear'
      },
      {
        value: 1,
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

  anime({
    targets: el.children,
    opacity: [
      {
        value: 1,
        duration: 0,
        easing: 'linear'
      },
      {
        value: 0,
        duration: 500,
        easing: 'easeOutQuad'
      },
    ],
    scale: [
      {
        value: 1,
        duration: 0,
        easing: 'linear'
      },
      {
        value: .5,
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
