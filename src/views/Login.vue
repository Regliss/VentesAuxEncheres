<template>
	<div class="login__form">
		<TitlePage title="Connexion" />
		<b-form @submit.prevent="login">
			<b-form-group>
				<label htmlFor="email">Mail :</label>
				<b-form-input type="email" name="email" v-model="email"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="password">Password :</label>
				<b-form-input type="password" name="password" v-model="password"/>
			</b-form-group>
			<b-form-group>
				<b-button type="submit" name="se connecter">Se Connecter</b-button>
			</b-form-group>
		</b-form>
		<p v-if="messageError">
			{{messageError}}
		</p>
	</div>
</template>

<script>
import TitlePage from "../components/TitlePage";
import apiConfigs from "../configs/api.configs";
export default {

  name: 'Login',
  data: function() {
  	return {
  		email:"",
  		password:"",
  		messageError:""
  	}
  },
  components: {
	  TitlePage
  },
  created () {
	  console.log(apiConfigs.apiUrl);
  },
  methods:{
  	login: function(e) {
  		const body = {
  			email: this.email,
  			password: this.password
  		}
  		const requestOptions = {
  			method: "POST",
  			headers: {
  				"Content-Type":"application/json"
  			},
  			body: JSON.stringify(body)
  		}
  		fetch(`${apiConfigs.apiUrl}/users/login`, requestOptions)
  		.then(response => response.json())
    	.then(data => {
    		if (!data.auth) {
    			this.messageError = data.message;
    		}
    		else {
    			console.log(data);
    			let token = data.token;
    			localStorage.setItem('token', token);
    			this.$router.push('/account');
    		}
    	})
    	.catch(err => {
    		console.log(err)
    	})
  	}
  },
  beforeDestroy () {
    this.$router.go(0);
  },
}
</script>

<style lang="css" scoped>
.login__form {
        font-family: 16px;
        margin: 0 auto;
        max-width: 400px;
        width: 100%;
    }
</style>