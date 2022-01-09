<template>
  <v-row>
    <v-col cols="12" md="6" offset-md="3">
      <div class="card-wrapper">
        <v-card class="card-login">
          <h2>Registro</h2>
          <div class="card-content">

            <v-text-field
                label="Nome"
                v-model="$v.form.name.$model"
                :error-messages="nameErrors"
                @input="$v.form.name.$touch()"
                @blur="$v.form.name.$touch()"
            ></v-text-field>

            <v-text-field
                label="E-mail"
                v-model="$v.form.email.$model"
                :error-messages="emailErrors"
                @input="$v.form.email.$touch()"
                @blur="$v.form.email.$touch()"
            ></v-text-field>

            <v-text-field
                label="Senha"
                type="password"
                v-model="$v.form.password.$model"
                :error-messages="passwordErrors"
                @input="$v.form.password.$touch()"
                @blur="$v.form.password.$touch()"
            ></v-text-field>

            <v-text-field
                label="Confirmação de Senha"
                type="password"
                v-model="$v.form.password_confirmation.$model"
                :error-messages="passwordConfirmationErrors"
                @input="$v.form.password_confirmation.$touch()"
                @blur="$v.form.password_confirmation.$touch()"
            ></v-text-field>

            <v-btn block color="success" @click="save"> Salvar </v-btn>
          </div>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  layout: 'login',
  data(){
    return {
      form:{
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  validations:{
    form:{
      name:{
        required,
        minLength: minLength(6),
      },
      email:{
        required,
        email
      },
      password:{
        required,
        minLength: minLength(6)
      },
      password_confirmation:{
        sameAs: sameAs('password')
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
      return errors;
    },
    emailErrors(){
      let errors = [];
      if(!this.$v.form.email.$error)
        return errors
      if(!this.$v.form.email.required){
        errors.push("O campo email é obrigatório")
      }
      if(!this.$v.form.email.email){
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
      if(!this.$v.form.password.minLength){
        errors.push("O campo senha deve conter no mínimo 6 caracteres")
      }
      return errors;
    },
    passwordConfirmationErrors(){
      let errors = [];
      if(!this.$v.form.password_confirmation.$error)
        return errors
      if(!this.$v.form.password_confirmation.sameAs){
        errors.push("O campo confirmação de senha deve ser igual a senha")
      }
      return errors;
    }
  },
  methods:{
    async save(){
      this.$v.$touch();
      if(this.$v.$invalid)
        return;

      try{
        await this.$axios.post('user', this.form);
        this.$swal({
          toast: true,
          position: 'top',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000,
          title: 'Sucesso!',
          text: 'Seu registro foi efetuado com sucesso.',
          timerProgressBar: true
        });
        this.$nuxt.$router.push('/login');
      }catch(e){
        this.$swal({
          toast: true,
          position: 'top',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000,
          title: 'Um erro ocorreu!',
          text: 'Informe o desenvolvedor do sistema.',
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