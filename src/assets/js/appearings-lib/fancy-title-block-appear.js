import anime from 'animejs/lib/anime.es.js'

export default {
    init(el_) {
        this.el = el_.querySelector('p')
        const el = this.el

        this.originalHeight = anime.get(el, 'height', 'px')
        this.originalPadding = anime.get(el, 'padding-top', 'px')

        el.style.overflow = 'hidden'
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
    },
    appear() {
        const el = this.el        

        anime({
            targets: el,
            height: this.originalHeight,
            paddingTop: this.originalPadding,
            paddingBottom: this.originalPadding,
            opacity: 1,
            easing: 'easeInOutQuad',
            duration: 1000,
            delay: 300,
            // delay: anime.stagger(100),
        })
    }
}