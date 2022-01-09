<template>
    <div>
      <loader v-if="loading"></loader>
      <v-row>
        <v-col cols="11" md="8">
          <v-text-field
              placeholder="Procurar filme..."
              v-model="search"
              append-icon="mdi-magnify"
              clearable
          ></v-text-field>
        </v-col>
        <v-col cols="1" class="d-flex align-center">
          <v-btn icon @click="toggleOrder" title="Ordenar Lista" class="ml-5">
            <v-icon v-if="order=='asc'">mdi-sort-alphabetical-ascending</v-icon>
            <v-icon v-else>mdi-sort-alphabetical-descending</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="3" class="d-flex align-center">
          <div class="d-flex justify-end flex">
            <v-btn color="error" rounded @click="$router.push('/movie/new')">Adicionar filme</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=12 v-if="filteredMovies.length <= 0" class="py-10">
          <p class="text--darken-2 red--text text-center">Nenhum filme encontrado</p>
        </v-col>
        <v-col cols=12 md=4 v-for="movie in filteredMovies">
          <v-card>
            <v-card-title>
              {{movie.name}}
              <v-spacer></v-spacer>
              <v-btn icon @click="$router.push(`/movie/${movie.id}/edit`)" title="Editar">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="delMovie(movie.id)" title="Excluir">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <div class="poster-wrapper">
                <img :src="movie.poster" width="380px" height="500px">
              </div>
            </v-card-text>
            <v-card-subtitle>
              <ul class="list-style-none">
                <li v-for="tag in movie.tags">
                  <div
                      class="px-4 error text-no-wrap rounded-pill"
                  >
                    {{tag.name | captalize}}
                  </div>
                </li>
              </ul>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
</template>
<script>
import Loader from "../components/Loader";
export default {
  components: { Loader },
  data(){
    return {
      movies: [],
      loading: false,
      order: 'asc',
      search: '',
    }
  },
  computed:{
    filteredMovies(){
      return this.movies.filter( movie => !this.search || movie.name.toUpperCase().includes( this.search.toUpperCase() ) );
    }
  },
  filters:{
    captalize(value){
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods:{
    toggleOrder(){
      this.order = this.order == 'asc' ? 'desc' : 'asc';
      this.load();
    },
    load(){
      this.loading = true
      this.$axios.get(`/movies?sort=${this.order}`)
          .then(response=>{
            this.movies = response.data.data
          })
          .finally(response=>{
            setTimeout(()=>{
              this.loading = false
            }, 200)
          })
    },
    delMovie(id){
      this.$swal({
        title: 'Você tem certeza?',
        text: "Essa ação é irreversível!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.$axios.delete(`/movies/${id}`)
            this.$swal.fire(
                'Deletado!',
                'O filme foi deletado.',
                'success'
              )
            this.load()
          }catch(e){
          }
        }
      })
    }
  },
  mounted(){
    this.load();
  }
}
</script>
<style lang="scss">
    .poster-wrapper{
      display: flex;
      width: 100%;
      justify-content: center;
    }
    .list-style-none{
      list-style: none;
      & li{
        display: inline-block;
        margin: 0 5px;
      }
    }
</style>