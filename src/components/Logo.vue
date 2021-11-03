<template>
    <div 
        :class="`logo ${flicker ? 'flicker' : ''}`"
        @click="startFlicker"
        ref="logo"
    >
        <img :src="`/images/${logoName}.svg`" alt="Marimilch Logo">
    </div>
</template>

<script>
export default {
    data(){
        return {
            flicker: false,
        }
    },
    computed: {
        logoName(){
            return 'logo'
        }
    },
    methods: {
        async startFlicker(){
            this.flicker = true
            await this.later(500)
            this.flicker = false
        },
        later(delay) {
            return new Promise(function(resolve) {
                setTimeout(resolve, delay);
            });
        }
    }
}
</script>

<style lang="scss">
.logo {
    width: 150px;
    height: 150px;
    animation: .125s FlickerSoftAnimation cubic-bezier(.65,.05,.36,1) infinite alternate;
    cursor: pointer;
}

.logo.flicker {
    animation: .03125s FlickerAnimation cubic-bezier(.65,.05,.36,1) infinite alternate;
}
</style>
