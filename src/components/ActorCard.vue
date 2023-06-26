<template>
    <v-hover v-slot="{ hover }" open-delay="200">
        <v-card 
            :elevation="hover ? 16 : 2"
            :class="{'on-hover' : hover}"
        >
            <router-link :to="`/actor/${actor.id}`">
                <v-img :src="profileImage" />
            </router-link>
            <v-card-title class="text-subtitle-2">
                {{ actor.name }}
            </v-card-title>
            <v-card-text>
                <p class="text-gray-400">{{ KnowFor }}</p>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    actor: {
        required: true
    }
});

const profileImage = computed(() => {
    if(props.actor.profile_path)
    {return "https://image.tmdb.org/t/p/w235_and_h235_face/" + 
    props.actor.profile_path
    }
    else
    return "http://via.placeholder.com/235x235"
})

const KnowFor = computed(() => {
    let knowStr = "";
    for(let i; i < props.actor.known_for.length - 1; i++){
        knowStr += this.actor.known_for[i].title;
    }
    return knowStr;
})
</script>