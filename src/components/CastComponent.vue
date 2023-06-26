<template>
<div>
    <h2 class="mt-2 text-grey">Cast</h2>
    <v-container>
        <v-row>
            <v-col cols="12" sm="3" 
                :key="index" v-for="(cast, index) in casts"
            >
                <v-hover v-slot="{hover}" open-delay="200">
                    <v-card 
                        :elevation="hover ? 16 : 2"
                        :class="{'on-hover': hover}"
                        :to="`/actor/${cast.id}`"
                    >
                        <v-img :src="castProfileImage(cast)" />
                        <v-card-title class="text-subtitle-2">
                            {{ cast.name }}
                        </v-card-title>
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
    casts: {
        required: true
    }
});

console.log(props.casts)

const castProfileImage = (cast) => {
    if(cast.profile_path)
        return "http://image.tmdb.org/t/p/w300" + cast.profile_path;
    else
        return "http://via.placeholder.com/300x450"
} 
</script>