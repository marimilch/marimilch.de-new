<template>
    <div class="fancy-title">
        <div class="sticky">
            <ClipBackground :src="`/clips/${project.slug}/fancy`" class="clip-background"></ClipBackground>
        </div>

        <div class="frame main">
            <h1 class="project-name">{{project.name}}</h1>
            <p class="date">{{niceDate}}</p>
        </div>

        <div class="frame additional-text">
            <p><slot></slot></p>
        </div>
    </div>
</template>

<script>
import ClipBackground from '@/components/project-components/ClipBackground'

export default {
    mounted(){
        console.log('project', this.project)
    },
    computed: {
        niceDate(){
            const dateStart = new Date(this.project.dateStart)
            const dateEnd = new Date(this.project.dateEnd)
            const dateStartStr = `${dateStart.getMonth() + 1}.${dateStart.getFullYear()}`
            const dateEndStr = `${dateEnd.getMonth() + 1}.${dateEnd.getFullYear()}`

            return dateStartStr + ' — ' + dateEndStr
        }
    },
    props: {
        project: {
            required: true
        },
    },
    components: {
        ClipBackground
    }
}
</script>

<style lang="scss" scoped>
.main {
    flex-direction: column;
    justify-content: center;
}
.sticky {
    position: sticky;
    top: 0;
    z-index: -1;
}
.date {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 24px;
}
.frame {
    display: flex;
    width: 100vw;
    height: 100vh;
    align-content: center; 
    align-items: center; 
}
.additional-text {
    display: flex;
    justify-content: flex-end;
    padding: 0 var(--content-padding-x);

    p {
        max-width: 800px;
        font-family: Manrope, sans-serif;
        text-transform: uppercase;
        letter-spacing: 3px;
        border-top: var(--brown) 2px solid;
        border-bottom: var(--brown) 2px solid;
        
        padding: 50px 0;
        font-size: 32px;

        color: var(--brown);
        @media (prefers-color-scheme: dark) {
            color: var(--dark-pink);
            border-top: var(--dark-pink) 2px solid;
            border-bottom: var(--dark-pink) 2px solid;
        }
    }
}
h1 {
    font-family: Manrope, sans-serif;
    text-transform: uppercase;
    letter-spacing: 10px;
    font-size: 180px;

    color: var(--brown);
    @media (prefers-color-scheme: dark) {
        color: var(--dark-pink);
    }
}
</style>