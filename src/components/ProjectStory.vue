<template>
    <div class="modal-wrap project-story">
        <article class="fade-wrap">
            <component :is="thisKebabToCamel(project.slug)" :project="project"></component>
        </article>
    </div>
</template>

<style lang="scss" scoped>
::v-deep {

.modal-wrap {
    margin-top: var(--content-padding-y)
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

<style lang="scss">
    .fancy-paragraph {
        background: var(--canvas);
        position: relative;
        display: flex;
        align-items: center;
        align-content: center;
        min-height: 100vh;
        font-size: 28px;

        &:nth-of-type(2n-1){
            &, & * {
                --primary: var(--style2-primary); // main color
                --neutral: var(--style2-neutral); // text color
                --canvas: var(--style2-canvas); // background color
            } 
        }

        p, h2, a {
            color: var(--neutral);
        }

        p {
            padding-bottom: 50px;
            line-height: 1.8;
        }

        p:first-of-type, 
        h1 + p, 
        h2 + p {
            &::first-letter {
                text-transform: uppercase;
                font-family: Pacifico, cursive;
                font-size: 64px;
                padding: 19px 24px 19px 10px;
                margin-right: 7px;
                float: left;
                background: var(--primary);
                color: var(--canvas);
                border-radius: 5px;
                line-height: .9;
            }
        }
        
        .left-side, 
        .right-side {
            width: 50%;
            padding-top: 100px;
            padding-bottom: 100px;
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

const kebabToCamel = s => s.replace(/-./g, x=>x.toUpperCase()[1])

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    
    // Gets the file name regardless of folder depth
    const componentName = fileName
        .split("/")
        .pop()
        .split(".")[0]
        
    // register the component locally
    dComponents[kebabToCamel(componentName)] = componentConfig.default
});

export default {
    props: {
        project: {
            required: true
        },
    },
    methods: {
        thisKebabToCamel(s) { return kebabToCamel(s) }
    },
    watch: {
        failed(v){
            this.$router.push('/404')
        } 
    },
    components: {
        ...dComponents
    }
}
</script>
