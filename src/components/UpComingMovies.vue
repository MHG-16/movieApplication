<template>
  <div id="carouselDiv">
    <h2 class="mx-3 text-grey">Upcoming Movies</h2>
    <v-carousel show-arrows="hover" class="text-pink-darken-1">
        <v-carousel-item
        v-for="movie in upcomingMovies"
        :key="movie.id"
        :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
        :to="`/movie/${movie.id}`"
        />
    </v-carousel>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      upcomingMovies: [],
    };
  },
  mounted() {
    this.fetchUpcomingMovies();
  },
  methods: {
    async fetchUpcomingMovies() {
      const response = await api.get("/movie/upcoming");
      this.upcomingMovies = response.data.results.slice(1, 7);
    },
  },
};
</script>

<style>
.carousel-3d-container figure {
  margin: 0;
}
.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}

.next span,
.prev span {
  color: red;
}
</style>
