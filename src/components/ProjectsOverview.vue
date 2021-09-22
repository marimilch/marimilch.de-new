<template>
    <div class="default-padding">
        <h2>
            Projects
        </h2>
        <div class="projects-wrap fade-wrap">
            <ProjectEntry 
                :project="project" 
                v-for="(project, key) in projects"
                v-bind:key="key"
                class="project-entry"
            ></ProjectEntry>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    h2 {
        position: absolute;
        text-align: left;
        font-size: 120px;
        padding-left: 30px;
    }
    .projects-wrap {
        padding: 50px 0 300px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
    }
    .project-entry {
        max-width: 1100px;
    }
</style>

<script>
import ProjectEntry from '@/components/ProjectEntry'

export default {
    props: {
        projects: {
            required: true
        }
    },
    components: {
        ProjectEntry
    }
}
</script>
