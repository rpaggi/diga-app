<template>
  <v-row>
    <v-col cols="12" md="6" offset-md="3">
      <div class="card-wrapper">
        <v-card class="card-login">
          <h2>Login</h2>
          <div class="card-content">

            <v-text-field
                label="E-mail"
                v-model="$v.form.username.$model"
                :error-messages="usernameErrors"
                @input="$v.form.username.$touch()"
                @blur="$v.form.username.$touch()"
            ></v-text-field>

            <v-text-field
                label="Senha"
                type="password"
                v-model="$v.form.password.$model"
                :error-messages="passwordErrors"
                @input="$v.form.password.$touch()"
                @blur="$v.form.password.$touch()"
            ></v-text-field>

            <v-row class="mt-3">
              <v-col cols=12 md=6>
                <v-btn block color="primary" @click="$nuxt.$router.push('/register')"> Registrar-se </v-btn>
              </v-col>
              <v-col cols=12 md=6>
                <v-btn block color="success" @click="login"> Entrar </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  layout: 'login',
  data(){
    return {
      form:{
        username: '',
        password: ''
      }
    }
  },
  validations:{
    form:{
      username:{
        required,
        email
      },
      password:{
        required
      }
    }
  },
  computed:{
    usernameErrors(){
      let errors = [];
      if(!this.$v.form.username.$error)
        return errors

      if(!this.$v.form.username.required){
        errors.push("O campo email é obrigatório")
      }
      if(!this.$v.form.username.email){
        errors.push("O campo email é inválido")
      }
      return errors;
    },
    passwordErrors(){
      let errors = [];

      if(!this.$v.form.password.$error)
        return errors
      if(!this.$v.form.password.required){
        errors.push("O campo senha é obrigatório")
      }
      return errors;
    }
  },
  methods:{
    async login(){
      this.$v.$touch();
      if(this.$v.$invalid)
        return;

      let data = {
        ...this.form,
        grant_type: 'password',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        scope: ''
      }

      try{
        let login = await this.$axios.post('oauth/token', data);
        localStorage.setItem('token', login.data.access_token)
        this.$nuxt.$router.push('/');
      }catch(e){
        this.$swal({
          toast: true,
          position: 'top',
          icon: 'error',
          showConfirmButton: false,
          timer: 5000,
          title: 'Um erro ocorreu!',
          text:' Por favor verifique seu login e senha.',
          timerProgressBar: true
        });
      }
    }
  }
}
</script>
<style>
.error-message{
  font-size: 10px;
  color: #f15555;
}


</style>