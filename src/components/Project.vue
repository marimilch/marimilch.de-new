<template>
    <article :id="project.slug">
        <h3>
            <!-- <a class="hook-link" :href="'#' + project.slug">#</a> -->
            <span>
                {{ project.name }}
            </span>
        </h3>

        <template v-if="project.clips">
            <div class="vid-grid videos" v-if="project.clips.length > 1">
                <video 
                    controls 
                    loop 
                    v-for="(video, index) in project.clips"
                    v-bind:key="index"
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
            <p class="text-center single-vid videos" v-else>
                <video 
                    controls 
                    loop 
                    v-for="(video, index) in project.clips"
                    v-bind:key="index"
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

        <!-- <?php if(!empty($json["clips"])) { ?>
            <?php $clipdir = "/assets/clips/" ?>
            <?php 
                $clipsMp4 = get_filenames_in_dir(
                    $clipdir . $json["clips"] . "/" ,
                    "mp4"
                );

                $clipsWebm = get_filenames_in_dir(
                    $clipdir . $json["clips"] . "/" ,
                    "webm"
                );

                //semi dirty solution
                $clips = array_zip($clipsMp4, $clipsWebm);
            ?>

            <?php $multi = count($clips) > 1; ?>
            <?php echo $multi ? '<div class="vid-grid">' : '<p class="center">'; ?>
                <?php  
                    foreach(
                        $clips as $clip
                    ){ 
                ?>
                    <video controls loop autoplay>
                        <source 
                            src="<?php echo $clipdir . $json["clips"] . "/" . $clip[0]; ?>" 
                            type="video/mp4"
                        >
                        <source 
                            src="<?php echo $clipdir . $json["clips"] . "/" . $clip[1]; ?>" 
                            type="video/webm"
                        >
                    </video>
                <?php }?>
            <?php echo $multi ? '</div>' : '</p>'; ?>
        <?php } ?> -->

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
export default {
    computed: {
        getMaybeFile(path){
            try {
                const file = require(path)
                return file
            } catch (e) {
                return null
            }
        }
    },
    props: {
        project: {
            type: Object,
            required: true
        }
    }
}
</script>
