import anime from 'animejs/lib/anime.es.js'
import Letterize from "letterizejs"

export default {
    init(el) {
        // el.style.opacity
        const toLetterize = new Letterize({ targets: el, className: 'letter' })

        for (const l of toLetterize.listAll) {
            l.style.opacity = 0
            l.style.filter = 'blur(50px)'
            // l.style.display = 'inline-block'
        }
    },
    appear(el) {
        console.log('aappearnigg el', el.querySelectorAll('.letter'))

        anime({
            targets: el.querySelectorAll('.letter'),
            filter: 'blur(0px)',
            opacity: 1,
            easing: 'linear',
            duration: 1000,
            delay: anime.stagger(100),
        })
    }
}