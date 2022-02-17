import anime from 'animejs/lib/anime.es.js'

export default {
  _splitAndWrapWords(text){
    return text.split(/\s+/).reduce( (acc, word) =>{
      if (!word) return acc
      return acc + '<span data-word>' + word + '</span> '
    }, '')
  },
  init(el_) {
    // assume paragraphs are not wrapped in each other
    const paragraphs = el_.querySelectorAll('p')
        
    for (const paragraph of paragraphs){
      // A little sinful, but quicker to implement
      paragraph.innerHTML = 
                this._splitAndWrapWords(paragraph.textContent)
    }

    const words = el_.querySelectorAll('[data-word]')

    for (const word of words){
      word.style.opacity = 0
      word.style.top = '100px'
    }
  },
  appear(el) {
    anime({
      targets: el.querySelectorAll('[data-word]'),
      top: { value: 0, easing: 'easeOutElastic(1, .5)', duration: 2000 },
      opacity: { value: 1, easing: 'linear', duration: 1000 },
      delay: anime.stagger(50),
    })
  }
}