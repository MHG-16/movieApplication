<template>
    <div>
        <h2 class="text-grey mt-2">Images</h2>
        <v-container>
            <v-row>
                <v-col cols="12" sm="3"
                    :key="index" v-for="(image, index) in props.images"
                >
                    <v-hover v-slot="{hover}" open-delay="200">
                        <v-card 
                            :elevation="hover ? 16 : 2"
                            :class="{'on-hover': hover}"
                        >
                            <v-img :src="movieImage(image)"></v-img>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    images: {
        required: true
    }
});

const movieImage = (image) => {
    if(image.file_path)
        return "https://image.tmdb.org/t/p/w300/" + image.file_path;
    else
        return "https://via.placeholder.com/300x450";
}
</script>