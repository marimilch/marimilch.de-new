<template>
    <div class="modal-wrap project-story">
        <article class="fade-wrap">
            <component :is="projectNameComponent"></component>
        </article>
    </div>
</template>

<style lang="scss" scoped>
::v-deep {

.modal-wrap {
    margin-top: var(--content-padding-y);
    counter-reset: fancy-block-counter;
}
h1, h2, h3, h4, h5, h5, p {
    padding-left: var(--content-padding-x);
    padding-right: var(--content-padding-x);
    margin: 0;
}
.no-break {
    white-space: nowrap;
}

}
</style>

<script>
// Get all article components
const requireComponent = require.context(
    // The relative path of the components folder
    '@/articles',
    // Whether or not to look in subfolders
    false,
    // The regular expression used to match base component filenames
    /[A-Za-z\-]\w*\.(vue)$/
)

const dComponents = {}

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    
    // Gets the file name regardless of folder depth
    const componentName = fileName
        .split("/")
        .pop()
        .split(".")[0]
        
    // register the component locally
    dComponents[componentName] = componentConfig.default
});

export default {
    methods: {
        kebabToPascal(s) {
            const s_ = s.replace(/-./g, x=>x.toUpperCase()[1])
            return s_.charAt(0).toUpperCase() + s_.slice(1)
        },
    },
    mounted(){
        if ( !dComponents[this.projectNameComponent] ) 
            this.$router.push('/404')
    },
    computed: {
        projectName() {
            return this.$route.params.project
        },
        projectNameComponent() {
            return this.kebabToPascal(this.projectName)
        }
    },
    components: {
        ...dComponents
    }
}
</script>
