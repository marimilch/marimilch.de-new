<template>
    <div ref="toAppear">
        <slot></slot>
    </div>
</template>

<style lang="scss">
[data-word] {
    position: relative;
}
</style>

<script>
import {onVisible} from '@/assets/js/on-visible.js'

// Get all article components
const requireComponent = require.context(
  // The relative path of the components folder
  '@/assets/js/appearings-lib',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /[A-Za-z-]\w*\.(js)$/
)

console.log(requireComponent)

const dComponents = {}

const kebabToCamel = s => s.replace(/-./g, x=>x.toUpperCase()[1])

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
    
  // Gets the file name regardless of folder depth
  const componentName = fileName
    .split('/')
    .pop()
    .split('.')[0]
        
  // register the component locally
  dComponents[kebabToCamel(componentName)] = componentConfig.default
})

export default {
  data() {
    return {
      alreadyAppeared: false
    }
  },
  props: {
    effect: {
      required: true,
      type: String
    }
  },
  computed: {
    effectLibrary(){
      return dComponents[this.effect]
    }
  },
  mounted(){
    this.$nextTick(function() {
      this.effectLibrary.init(this.$refs.toAppear)

      onVisible([this.$refs.toAppear], {
        onElemVisible: this.applyEffect.bind(this),
      })
    })
  },
  methods: {
    applyEffect(el){
      if (this.alreadyAppeared) return
      this.alreadyAppeared = true
      this.effectLibrary.appear(el)
    },
  }
}
</script>
