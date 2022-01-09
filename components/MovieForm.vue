<template>
  <v-row>
    <v-col cols="12" md="6" offset-md="3">
      <h2 class="text-center">{{ movieId ? 'Editar' : 'Novo' }} filme</h2>
      <v-text-field
          :label="`Nome ${movieId?'':'(*)'}`"
          v-model="$v.form.name.$model"
          :error-messages="nameErrors"
      ></v-text-field>
      <v-file-input
          :rules="posterRules"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-file-image"
          :label="`Poster ${movieId?'':'(*)'}`"
          placeholder="Tamanho máximo: 3MB"
          v-model="form.poster"
          :error-messages="posterErrors"
      ></v-file-input>
      <v-autocomplete
          label="Tags"
          chips
          multiple
          :items="tags"
          v-model="form.tags"
          item-text="name"
          item-value="id"
      ></v-autocomplete>
      <v-btn color="error" block class="mt-4" @click="save" :disabled="saving">Salvar</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default {
  name: "MovieForm",
  props:{
    movieId: Object
  },
  data(){
    return {
      form:{
        name: '',
        poster: null,
        tags: [],
      },
      tags:[],
      posterRules: [
        value => !value || value.size < 3000000 || 'O tamanho do poster deve ser menor que 3MB!',
      ],
      saving: false,
    }
  },
  validations(){
    return {
      form:{
        name:{
          required: this.movieId ? false : required,
          minLength: minLength(3),
          maxLength: maxLength(50)
        },
        poster:{
          required: this.movieId ? false : required
        }
      }
    }
  },
  computed:{
    nameErrors(){
      let errors = [];
      if(!this.$v.form.name.$error)
        return errors

      if(!this.$v.form.name.required){
        errors.push("O campo nome é obrigatório")
      }
      if(!this.$v.form.name.minLength){
        errors.push("O campo nome deve conter no mínimo 3 caracteres")
      }
      if(!this.$v.form.name.maxLength){
        errors.push("O campo nome deve conter no máximo 50 caracteres")
      }
      return errors
    },
    posterErrors(){
      let errors = [];
      if(!this.$v.form.poster.$error)
        return errors

      if(!this.$v.form.poster.required){
        errors.push("Você precisa selecionar uma imagem de poster")
      }
      return errors
    }
  },
  methods:{
    save(){
      this.$v.$touch();
      if(this.$v.$invalid)
        return

      this.saving = true

      if(this.movieId){
        this.update()
      }else{
        this.insert()
      }
    },
    insert(){
      let formData = new FormData()
      formData.append('name', this.form.name)
      formData.append('poster', this.form.poster)
      this.form.tags.forEach(tag=>{
        formData.append('tags[]', tag)
      })

      this.$axios.post('/movies', formData)
      .then(response=>{
        this.$router.push('/')
      })
      .finally(()=>{
        this.saving = false
      })
    },
    update(){
      let formData = new FormData()
      formData.append('name', this.form.name)

      if(this.form.poster){
        formData.append('poster', this.form.poster)
      }

      this.form.tags.forEach(tag=>{
        formData.append('tags[]', tag)
      })

      this.$axios.post(`/movies/${this.movieId}?_method=PUT`, formData)
          .then(response=>{
            this.$router.push('/')
          })
          .finally(()=>{
            this.saving = false
          })
    }
  },
  async mounted() {
    try{
      let response = await this.$axios.get('/movie-tags')
      this.tags = response.data.data.map(item=> (
          {
            ...item,
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1)
          }
      ))
    }catch(e){
      this.tags = []
    }

    if(this.movieId){
      try{
        let movie_response = await this.$axios.get(`/movies/${this.movieId}`)
        this.form.name = movie_response.data.data.name
        this.form.tags = movie_response.data.data.tags.map(tag => tag.id)
      }catch(e){
        this.$swal({
          toast: true,
          position: 'top',
          icon: 'error',
          showConfirmButton: false,
          timer: 5000,
          title: 'Um erro ocorreu!',
          text: 'Ocorreu um erro ao carregar os dados do filme.',
          timerProgressBar: true
        });
      }
    }
  }
}
</script>

<style scoped>

</style>