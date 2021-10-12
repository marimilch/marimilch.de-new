<template>
    <span class="background-rainbow rainbow-text"><slot></slot></span>
</template>

<style lang="scss" scoped>
.rainbow-text {
    background-clip: text;
    color: transparent !important;
    animation: RainbowAnimation 1.5s linear infinite;
}
</style>