<template>
  <v-app>
    <Navbar/>
    <v-main>
      <router-view />
    </v-main>
    <Footer/>
  </v-app>
</template>

<script setup>
  import Navbar from './components/NavbarComponent.vue';
  import Footer from './components/FooterComponent.vue';
</script>
