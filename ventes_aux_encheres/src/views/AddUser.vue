<template>
	<div class="signup__form">
		<TitlePage title="Ajout Utilisateur"/>
		<b-form-simple @submit.prevent="signupadmin">
			<b-form-group>
				<label htmlFor="firstName">Prénom :</label>
				<b-input type="firstName" name="firstName" v-model="firstName"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="lastName">Nom :</label>
				<b-input type="lastName" name="lastName" v-model="lastName"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="address">Addresse :</label>
				<b-input type="address" name="address" v-model="address"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="phone">Téléphone :</label>
				<b-input type="phone" name="phone" v-model="phone"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="email">Mail :</label>
				<b-input type="email" name="email" v-model="email"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="password">Password :</label>
				<b-input type="password" name="password" v-model="password"/>
			</b-form-group>
			<b-form-checkbox name="isAdmin" v-model="isAdmin">Admin</b-form-checkbox>
			<b-form-group>
				<b-button>Créer</b-button>
			</b-form-group>
		</b-form-simple>
		<p v-if="messageError">
			{{messageError}}
		</p>
	</div>
</template>

<script>
import TitlePage from "../components/TitlePage";
export default {

  name: 'AddUser',
  data: function() {
  	return {
  		firstName:"",
  		lastName:"",
  		address:"",
  		phone:"",
  		email:"",
  		password:"",
  		isAdmin:"",
  		messageError:""
  	}
  },
  methods:{
  	signupadmin: function(e) {
  		const body = {
  			firstName: this.firstName,
  			lastName: this.lastName,
  			address: this.address,
  			phone: this.phone,
  			email: this.email,
  			password: this.password,
  			isAdmin: this.isAdmin
  		}
  		const requestOptions = {
  			method: "POST",
  			headers: {
  				"Content-Type":"application/json"
  			},
  			body: JSON.stringify(body)
  		}
  		fetch("http://localhost:3030/apiVentes/users/add", requestOptions)
  		.then(response => response.json())
    	.then(data => {
    		if (!data.auth) {
    			this.messageError = data.message;
    		}
    		else {
    			// console.log(data);
    			// let token = data.token;
    			// localStorage.setItem('token', token);
    			this.$router.push('/account');
    		}
    	})
    	.catch(err => {
    		console.log(err)
    	})
  	}
  }
}
</script>

<style lang="css" scoped>
.signup__form {
        font-family: 16px;
        margin: 0 auto;
        max-width: 400px;
        width: 100%;
    }
</style>