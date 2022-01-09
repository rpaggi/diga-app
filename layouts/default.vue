<template>
  <v-app dark>
    <div>
      <v-toolbar
          flat
          title
          height="50px"
      >
        <v-toolbar-title class="grey--text">
          <nuxt-link to="/" class="white--text text-decoration-none">
            <span class="red--text">D</span>iga Movies
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <img class="rounded-circle mr-3" width="30" :src="userAvatar" :alt="$store.state.user.name" :title="$store.state.user.name">

        <v-btn icon @click="logout" title="Sair">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
    <v-row>
      <v-col cols="12" class="offset-uw-2 col-uw-8">
        <div class="px-10 py-4">
          <Nuxt />
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: 'auth',
  data () {
    return {
    }
  },
  computed:{
    userAvatar(){
      return `https://ui-avatars.com/api/?name=${this.$store.state.user.name}`
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
@media (min-width: 1922px){
  .offset-uw-2 {
    margin-left: 16.6666666667%;
  }
  .col-uw-8 {
    flex: 0 0 66.6666666667%;
    max-width: 66.6666666667%;
  }
}
</style>