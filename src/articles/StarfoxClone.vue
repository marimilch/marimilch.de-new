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

    <FancyParagraph title="The interview">
        <p>
            Ironically when I presented the game to the professors they
            didn't get to the boss since they weren't that much of gamers
            themselves. 😄
        </p>

        <p>
            However when I let my friends try it out later
            killing the boss was the most rewarding experience for them. 
            So it was worth the effort. ❤️
        </p>
    </FancyParagraph>

    <FancyParagraph title="What I learned">
        <p>
            Player and enemy are very similar in terms of movement and actions.
            The only difference is where both of them receive their input controls.
        </p>
        <p>
            The funniest "mistake" was probably once the game started to get its
            shape I kind of lost track by playing what I'd done so far over and 
            over again. I didn't have this problem with Petra & The Wolves. To
            me, that's a sign that I should always get inspiration for gameplay
            from the most fun classics.
        </p>
        <p>
            A lot of times I wanted to implement things quick and dirty 
            just to rethink and rewrite them later because they
            didn't work. I think it's better to opt for a smaller set of things that
            actually work than to clash together a buggy mess. It's a lesson I learn and 
            probably will always learn again and again:
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
    }
}
</script>