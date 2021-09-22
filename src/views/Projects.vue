<template>
    <div>
        <ProjectStory v-if="selected" :project="selected"></ProjectStory>
        <ProjectsOverview v-else :projects="projects"></ProjectsOverview>
    </div>
</template>

<script>
import ProjectStory from '@/components/ProjectStory'
import ProjectsOverview from '@/components/ProjectsOverview'
import projectsJson from '@/assets/json/projects.json'

export default {
    data() {
        return {
            projects: projectsJson,
        }
    },
    computed: {
        selected(){
            const slug = this.$route.params.slug
            if (!slug) return null

            const maybeProject = projectsJson.find(project => project.slug == slug)
            if (!maybeProject) return this.$router.push('/404')

            return maybeProject
        }
    },
    components: {
        ProjectStory,
        ProjectsOverview
    }
}
</script>