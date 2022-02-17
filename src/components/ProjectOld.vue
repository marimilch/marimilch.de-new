<template>
    <article :id="project.slug">
        <h3>
            <a class="hook-link" :href="'#' + project.slug">#</a>
            <span>
                {{ project.name }}
            </span>
        </h3>

        <template v-if="project.clips">
            <template v-if="project.clips.length > 1">
                <div class="vid-grid videos">
                    <video 
                        controls 
                        loop
                        muted
                        v-for="(video, index) in project.clips"
                        v-bind:key="index"
                        preload="metadata"
                    >
                        <source 
                            :src="`/clips/${project.slug}/${video.url}.mp4`" 
                            type="video/mp4"
                        >
                        <source 
                            :src="`/clips/${project.slug}/${video.url}.webm`" 
                            type="video/webm"
                        >
                    </video>
                </div>
                <p class="text-center scroll-vids mobile-only">← Scroll →</p>
            </template>

            <p class="text-center single-vid videos" v-else>
                <video 
                    controls 
                    loop
                    muted
                    v-for="(video, index) in project.clips"
                    v-bind:key="index"
                    preload="metadata"
                >
                    <source 
                        :src="`/clips/${project.slug}/${video.url}.mp4`" 
                        type="video/mp4"
                    >
                    <source 
                        :src="`/clips/${project.slug}/${video.url}.webm`" 
                        type="video/webm"
                    >
                </video>
            </p>
        </template>

        <p class="center" v-if="project.liveGame">
            <Button :to="`/games-live/${project.liveGame}`" :external="true">Play In Browser</Button>
        </p>

        <p>{{ project.description }}</p>

        <p class="project-links" v-if="project.links">
            <span>Links:</span>
            <a 
                v-for="(link, index) in project.links" 
                v-bind:key="index"
                :href="link.url"
                class="button"
                target="_blank"
            >
                {{ link.label }}
            </a>
        </p>

         <p class="project-links" v-if="project.files">
            <span>Download:</span>
            <a 
                v-for="(link, index) in project.files" 
                v-bind:key="index"
                :href="`/downloads/${project.slug}/${link.url}`"
                class="button"
            >
                {{ link.label }}
            </a>
        </p>
    </article>
</template>

<script>
import Button from '@/components/Button'

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  components: {
    Button
  }
}
</script>
