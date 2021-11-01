<template>
    <div class="default-padding">  
        <div class="projects-wrap fade-wrap">
            <h2>
                Projects
            </h2>
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
        top: var(--nav-height);
        left: var(--content-padding-x);
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
import projectsJson from '@/assets/json/projects.json'

export default {
    data() {
        return {
            projects: projectsJson,
        }
    },
    components: {
        ProjectEntry
    }
}
</script>
