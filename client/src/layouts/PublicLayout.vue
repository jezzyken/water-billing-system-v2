<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'PublicLayout',
}
</script>

<style scoped>
@media (max-width: 600px) {
  .text-h6 {
    font-size: 1.1rem !important;
  }

  .v-avatar {
    width: 35px !important;
    height: 35px !important;
  }
}
</style>