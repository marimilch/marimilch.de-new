<template>
    <div class="projects-wrap">
        <h2>
            Projects
        </h2>
        <Project 
            :project="project" 
            v-for="(project, key) in projects"
            v-bind:key="key"
        ></Project>
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
        padding: 50px 300px 300px;
        width: 100%;
    }
</style>

<script>
import Project from '@/components/Project'
import projectsJson from '@/assets/json/projects.json'

export default {
    data() {
        return {
            projects: projectsJson,
        }
    },
    components: {
        Project
    }
}
</script>