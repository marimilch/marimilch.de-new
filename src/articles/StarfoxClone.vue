<template>
    <FancyTitle :project="project">
        <em>Learning by doing:</em> Since my bachelor thesis was supposed 
        to be built in the Unity ecosystem, I decided to learn about the engine by cloning
        the first stage of Star Fox for Super Nintendo.
    </FancyTitle>
    <FancyParagraph title="How it started">
        <p>
            Alright, I admit that's only partly true. Actually I programmed 
            <router-link to="/projects/petra">Petra & The Wolves</router-link>
            for that purpose.
        </p>
        <p>
            At university they had an open position for a bachelor thesis
            revolving around an internal project created in Unity. 
            Since I wanted to get into Game Development (and still want to) 
            this seemed like a perfect starting point.
            However they looked for someone with prior experience in Unity, 
            something I couldn't offer at that time yet.
        </p>
    </FancyParagraph>
    <FancyModel>
        <h2>The ship</h2>
        <p>
            At university they had an open position for a bachelor thesis
            revolving around an internal project created in Unity. 
            Since I wanted to get into Game Development (and still want to) 
            this seemed like a perfect starting point.
            However they looked for someone with prior experience in Unity, 
            something I couldn't offer at that time yet.
        </p>
        <p>
            At university they had an open position for a bachelor thesis
            revolving around an internal project created in Unity. 
            Since I wanted to get into Game Development (and still want to) 
            this seemed like a perfect starting point.
            However they looked for someone with prior experience in Unity, 
            something I couldn't offer at that time yet.
        </p>
        <p>
            At university they had an open position for a bachelor thesis
            revolving around an internal project created in Unity. 
            Since I wanted to get into Game Development (and still want to) 
            this seemed like a perfect starting point.
            However they looked for someone with prior experience in Unity, 
            something I couldn't offer at that time yet.
        </p>
        <p>
            At university they had an open position for a bachelor thesis
            revolving around an internal project created in Unity. 
            Since I wanted to get into Game Development (and still want to) 
            this seemed like a perfect starting point.
            However they looked for someone with prior experience in Unity, 
            something I couldn't offer at that time yet.
        </p>
        <p>
            At university they had an open position for a bachelor thesis
            revolving around an internal project created in Unity. 
            Since I wanted to get into Game Development (and still want to) 
            this seemed like a perfect starting point.
            However they looked for someone with prior experience in Unity, 
            something I couldn't offer at that time yet.
        </p>
        <p>
            At university they had an open position for a bachelor thesis
            revolving around an internal project created in Unity. 
            Since I wanted to get into Game Development (and still want to) 
            this seemed like a perfect starting point.
            However they looked for someone with prior experience in Unity, 
            something I couldn't offer at that time yet.
        </p>
        <p>
            At university they had an open position for a bachelor thesis
            revolving around an internal project created in Unity. 
            Since I wanted to get into Game Development (and still want to) 
            this seemed like a perfect starting point.
            However they looked for someone with prior experience in Unity, 
            something I couldn't offer at that time yet.
        </p>
    </FancyModel>
</template>

<script>
import FancyTitle from '@/components/project-components/FancyTitle'
import FancyParagraph from '@/components/project-components/FancyParagraph'
import FancyModel from '../components/project-components/FancyModel.vue'

export default {
    props: {
        project: {
            required: true
        }
    },
    components: {
        FancyTitle,
        FancyParagraph,
        FancyModel
    }
}
</script>