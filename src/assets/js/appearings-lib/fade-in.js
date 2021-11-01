import anime from 'animejs/lib/anime.es.js'

export default {
    init(el) {
        el.style.opacity = '0'
    },
    appear(el) {
        anime({
            targets: el,
            opacity: { value: 1, easing: 'linear', duration: 750 },
        })
    }
}