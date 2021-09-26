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
        background: var(--dark-pink);
        position: relative;
        display: flex;
        align-content: flex-start;
        align-items: flex-start;
        font-size: 28px;

        @media (prefers-color-scheme: dark) {
            background: var(--deep-pink);
        }

        p, h2, a {
            color: var(--canvas);
        }

        &:nth-child(2n-1){
            background: var(--canvas);

            p, h2, a {
                color: var(--brown);
            }

            @media (prefers-color-scheme: dark) {
                background: var(--dark-brown);

                p, h2, a {
                    color: var(--canvas);
                }
            }

            @media (prefers-color-scheme: light) {
                p:first-of-type, 
                h1 + p, 
                h2 + p {
                    &::first-letter {
                        background: var(--brown);
                        color: var(--canvas);
                    }
                }
            }
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
                background: var(--canvas);
                color: var(--dark-pink);
                border-radius: 5px;
                
                @media (prefers-color-scheme: dark) {
                    color: var(--brown);
                }
            }
        }
        
        .left-side, 
        .right-side {
            width: 50%;
            padding-top: 100px;
            padding-bottom: 100px;
        }

        .left-side {
            // position: sticky;
            // top: 0;
        }
    }
</style>

<script>
import { ref } from 'vue'

// Get all article components
const requireComponent = require.context(
    // The relative path of the components folder
    '@/articles',
    // Whether or not to look in subfolders
    false,
    // The regular expression used to match base component filenames
    /[A-Z]\w+\.(vue)$/
)

const dComponents = {}

const kebabToCamel = s => s.replace(/-./g, x=>x.toUpperCase()[1])

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    console.log(componentConfig.default)
    // Gets the file name regardless of folder depth
    const componentName = fileName
        .split("/")
        .pop()
        .split(".")[0]
        
    // register the component locally
    dComponents[kebabToCamel(componentName)] = componentConfig.default
});

export default {
    setup(props){
        let compiledMD = ref('')
        let failed = ref(false)

        const getMarkdown = async () => {
            try {
                const component = await import(`@/articles/${kebabToCamel(props.project.slug)}.vue`)
                this.components.Story = component
            } catch (e) {
                console.error('Something went wrong', e)
                failed.value = true
            }
        }

        return {
            compiledMD,
            failed,
            getMarkdown
        }
    },
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
