<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
      <router-link :to="`/movie/${props.movie.id}`">
        <v-img :src="posterPath" alt="" class=""></v-img>
      </router-link>
      <v-card-title class="text-subtitle2">{{ movie.title }}</v-card-title>
      <v-card-text class="mx-auto">
        <v-row class="mx-auto text-center">
            <span class="text-grey">Rating: ({{ rating }})</span>
        </v-row>
        <v-row class="mx-auto">
            Release date : {{ movie.release_date }}
        </v-row>
        <div class="my-4 text-subtitle-2">
            <span
                v-for="(genre, index) in movie.genre_ids"
                :key="genre"
            >
                {{ genertypeName(genre, index) }}
        </span>
        </div>
      </v-card-text>

    </v-card>
  </v-hover>
</template>

<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  movie: {
    required: true,
  },
  genres: {
    required: true,
  },
});


const rating = props.movie.vote_average / 2
const posterPath = computed(() => {
  return "https://image.tmdb.org/t/p/w500/" + props.movie.poster_path;
});

const genertypeName = (geraId, index) => {
  for (const item of props.genres) {
    if(item.id == geraId){
        if(props.movie.genre_ids.length -1 == index)
            return item.name;
        else
            return item.name + ", "
    }
  }
};
</script>
