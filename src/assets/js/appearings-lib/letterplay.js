import anime from 'animejs/lib/anime.es.js'
import Letterize from 'letterizejs'

export default {
  init(el) {
    // el.style.opacity
    const toLetterize = new Letterize({ targets: el, className: 'letter' })

    let i = 0
    this.listAll = toLetterize.listAll
    for (const l of this.listAll) {
      l.style.opacity = '0'
      const neg = i % 2 == 0 ? '' : '-'
      l.style.height = '0'
      l.style.display = 'inline-block'
      l.style.transform = 
                `rotate(${neg}60deg) translateY(300px) translateX(${neg}100px)`

      ++i
    }
  },
  appear(el) {
    const targets = el.querySelectorAll('.letter')
    if (!targets) return

    const targetHeight = anime.get(targets[0], 'font-size', 'px')

    anime({
      targets: el.querySelectorAll('.letter'),
      height: targetHeight,
      opacity: 1,
      easing: 'easeOutQuad',
      duration: 500,
      rotate: 0,
      translateY: 0,
      translateX: 0,
      delay: anime.stagger(70),
      // complete: () => {
      //     for (const l of this.listAll) {
      //         l.style.overflow = 'visible'
      //     }
      // }
    })
  }
}