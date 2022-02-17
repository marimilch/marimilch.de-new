<template>
    <div>
    <FancyTitle 
        backgroundVideoSrc="klara/klara-fighting"
        dateStart="2019-07"
        dateEnd="2021-10"
    >
        <template v-slot:title>
            Klara
        </template>
        <template v-slot:description>
            In the early 2000s the <RainbowText>RPG Maker</RainbowText> 
            was the hot stuff in the german 
            internet community. Cultural heritage like Vampire's Dawn, 
            Ente die Ente & Velsarbor were born. All thanks to
            internet piracy.
        </template>
    </FancyTitle>

    <FancyBlock>
        <FancyTV movieSlug="/clips/klara/klara-riddle">
            <p>
                I always wanted to program a game like 
                Zelda in it instead of using the stock round-based fighting system. 
                But it required custom programming for which I lacked the knowledge.
            </p>
        </FancyTV>
    </FancyBlock>

    <FancyBlock>
        <FancyClip 
            source="/klara/klara-fighting" 
        >
            <p>
                Back then I just watched Over the Garden Wall and Rick & Morty.
                Since I enjoyed both shows so much, I decided they were 
                going to be my main inspiration for the story.
            </p>
        </FancyClip>
    </FancyBlock>

    <FancyBlock>
        <FancyClip 
            source="/klara/klara-boss" 
        >
            <p>
                Unfortunately I quickly ran into the limitations and quirks of 
                the RPG Maker 2003 esspecially when programming the bosses. 
                I realized the engine was probably never intended to be used this way.
            </p>
        </FancyClip>
    </FancyBlock>

    <FancyBlock>
        <FancyClip 
            source="/klara/klara-train" 
        >
            <p>
                However the nostalgic feelings and the fun outweighed 
                all of that tenfold. It was this game that made me 
                realize how much fun it is to make games.
            </p>
        </FancyClip>
    </FancyBlock>

    <FancyBlock :centerDown="true">
        <FancyButtons label="Downloads">
            <Button 
                :external="true" 
                to="/downloads/klara/klara-setup.zip"
            >
                Win32
            </Button>

            <Button 
                :external="true" 
                to="/downloads/klara/klara-source.zip"
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
import FancyTV from '../components/project-components/FancyTV'
import FancyButtons from '../components/project-components/FancyButtons'
import Button from '../components/Button'
import RainbowText from '@/components/effects/RainbowText'
import FancyClip from '../components/project-components/FancyClip.vue'


export default {
  components: {
    FancyTitle,
    FancyBlock,
    FancyTV,
    FancyButtons,
    RainbowText,
    Button,
    FancyClip
  }
}
</script>