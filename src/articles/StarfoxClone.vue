<template>
    <FancyTitle :project="project">
        Even today Star Fox for Super Nintendo is one of my favorite games.
        There is action. There is challenge. There are cool characters.
        And the kick-ass music.
    </FancyTitle>

    <FancyTV movieSlug="/clips/starfox-clone/starfox-snes">
        <p>
            The original game relied on simple 3D graphics to keep the workload
            for the Super FX chip low. That meant remaking the models
            would not be so hard.
        </p>
    </FancyTV>

    <FancyVideo clipSrc="starfox-clone/fancy"></FancyVideo>

    <FancyModel 
        modelPath="/glb/star-fox/fake_wing.glb" 
        :distance="-.06"
        :initialRotationRad="{x:.125, y:0, z:0}"
    >
        <p>
            Contrary to the usual workflow, I started with building
            the models instead of the game mechanics. The ship, then some enemies 
            and then the obstacles.
        </p>
    </FancyModel>

    <FancyVideo clipSrc="starfox-clone/shoot1"></FancyVideo>

    <FancyModel 
        modelPath="/glb/star-fox/boss.glb" 
        :distance="-.02"
        :flip="true"
    >
        <p>
            Half of the time I invested in camera and player controls.
            The other half in the boss. I wanted both to "feel right".
        </p>
    </FancyModel>

    <FancyVideo clipSrc="starfox-clone/movement"></FancyVideo>

    <FancyParagraph title="The interview">
        <p>
            Ironically the professors didn't get to the boss 
            since they weren't that much of gamers
            themselves. 😄
        </p>

        <p>
            However my friends did. And killing the boss 
            was the most rewarding experience for them. 
            So it was worth the effort. ❤️
        </p>
    </FancyParagraph>

    <FancyMessage>

    </FancyMessage>
</template>

<script>
import FancyTitle from '@/components/project-components/FancyTitle'
import FancyParagraph from '@/components/project-components/FancyParagraph'
import FancyModel from '../components/project-components/FancyModel.vue'
import FancyTV from '../components/project-components/FancyTV.vue'
import FancyVideo from '../components/project-components/FancyVideo.vue'

export default {
    props: {
        project: {
            required: true
        }
    },
    components: {
        FancyTitle,
        FancyParagraph,
        FancyModel,
        FancyTV,
        FancyVideo,
    }
}
</script>