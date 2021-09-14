<template>
    <router-link :to="to" :class="'button' + (alt ? ' alt' : '')" v-if="!external">
        <span :class="icon ? 'desktop-only' : ''"><slot></slot></span>
        <i class="mobile-only" v-if="icon" :data-feather="icon"></i>
    </router-link>
    <a :href="to" :class="'button' + (alt ? ' alt' : '')" v-else target="_blank">
        <span :class="icon ? 'desktop-only' : ''"><slot></slot></span>
        <i class="mobile-only" v-if="icon" :data-feather="icon"></i>
    </a>
</template>

<script>
export default {
    name: 'Button',
    props: {
        external: {
            type: Boolean,
            default: false
        },
        alt: {
            type: Boolean,
            default: false
        },
        to: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: null
        },
    }
}
</script>