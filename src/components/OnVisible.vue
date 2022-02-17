<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    onVisible: {
      default: () => {},
      type: Function,
    },
    onHidden: {
      default: () => {},
      type: Function,
    }
  },
  mounted(){
    this.$nextTick(() => {
      if (!this.$refs.root) return
      const root = this.$refs.root
      const handle = entries => {
        for (const entry of entries){
          if (entry.isIntersecting) this.$emit('onVisible')
          else this.$emit('onHidden')
        }
      }
      handle.bind(this)

      const observer = new IntersectionObserver(handle)

      observer.observe(root)
    })
  }
})
</script>

<template>
  <div ref="root">
    <slot></slot>
  </div>
</template>