<template>
    <div>
    <FancyTitle 
        backgroundVideoSrc="starfox-clone/fancy"
        dateStart="2020-09"
        dateEnd="2020-10"
    >
        <template v-slot:title>
            Star Fox<br>in Unity
        </template>
        <template v-slot:description>
            Even today Star Fox for Super Nintendo is one of my 
            <RainbowText>favorite games</RainbowText>.
            There is action. There is challenge. 
            There are cool characters.
            And the kick-ass music.
        </template>
    </FancyTitle>

    <FancyBlock>
        <FancyTV movieSlug="/clips/starfox-clone/starfox-snes">
            <p>
                The original game relied on simple 3D graphics to keep the workload
                for the Super FX chip low. That meant remaking the models
                would not be so hard.
            </p>
        </FancyTV>

        <!-- <FancyVideos 
            srcPrefix="starfox-clone" 
            :slugs="['fancy', 'shoot1', 'movement']"
        ></FancyVideos> -->
    </FancyBlock>

    <FancyBlock>
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
        <!-- <FancyVideo srcPrefix="starfox-clone" slug="shoot1"></FancyVideo> -->
    </FancyBlock>

    <FancyBlock>
        <FancyCode 
            language="csharp" 
            title="PlayerController.cs"
            href="https://github.com/marimilch/starfox-clone-scripts/blob/main/PlayerController.cs#L155"
        >
            <template v-slot:code><pre><code>
// Linearly lerp to target move vector
var di = requestedMovement - inertedInput;
if (di.magnitude > inSpeedTimed)
{
    mv += di.normalized * inSpeedTimed;
}</code></pre>
            </template>
            <template v-slot:comment>
                <p>
                    Half of the time I invested in camera and player controls.
                    The other half in the boss. I wanted both to "feel right".
                </p>
            </template> 
        </FancyCode>
        <!-- <FancyVideo srcPrefix="starfox-clone" slug="movement"></FancyVideo> -->
    </FancyBlock>

    <FancyBlock>
        <FancyModel 
            modelPath="/glb/star-fox/boss.glb" 
            :distance="-.02"
            :flip="true"
        >
            <p>
                Ironically the professors didn't get to the boss 
                since they weren't that much of gamers
                themselves. 😄
            </p>

            <p>
                However my friends did. And defeating the boss 
                was the most rewarding experience for them. 
                So it was worth the effort. ❤️
            </p>
        </FancyModel>
    </FancyBlock>

    <FancyBlock :centerDown="true">
        <FancyButtons label="Links">
            <Button 
                :external="true" 
                to="/games-live/starfox-clone"
            >
                Play in Browser
            </Button>

            <Button 
                :external="true" 
                to="//github.com/marimilch/starfox-clone-scripts"
            >
                GitHub
            </Button>
        </FancyButtons>    

        <FancyButtons label="Downloads">
            <Button 
                :external="true" 
                to="/downloads/starfox-clone/starfox-clone-win.zip"
            >
                Win32
            </Button>

            <Button 
                :external="true" 
                to="/downloads/starfox-clone/starfox-clone-mac.zip"
            >
                macOS
            </Button>

            <Button 
                :external="true" 
                to="/downloads/starfox-clone/starfox-clone-source.zip"
            >
                Full Source
            </Button>
        </FancyButtons>    
    </FancyBlock>
  </div>
</template>

<script>
import FancyTitle from '@/components/project-components/FancyTitle'
import FancyBlock from '@/components/project-components/FancyBlock'
import FancyModel from '../components/project-components/FancyModel'
import FancyTV from '../components/project-components/FancyTV'
import FancyCode from '../components/project-components/FancyCode'
import FancyButtons from '../components/project-components/FancyButtons'
import Button from '../components/Button'
import RainbowText from '@/components/effects/RainbowText'


export default {
  components: {
    FancyTitle,
    FancyBlock,
    FancyModel,
    FancyTV,
    FancyButtons,
    FancyCode,
    RainbowText,
    Button,
  }
}
</script>