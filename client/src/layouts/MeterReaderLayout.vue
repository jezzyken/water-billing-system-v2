<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Meter Reader Portal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout">
        <v-icon left>mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'MeterReaderLayout',
  methods: {
    ...mapActions('users', ['logout']),
    async handleLogout() {
      await this.logout();
      this.$router.push('/login');
    }
  }
}
</script>