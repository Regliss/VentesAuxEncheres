<template>
	<div class="signup__form">
		<TitlePage title="Ajout Utilisateur"/>
		<b-form @submit.prevent="signupadmin">
			<b-form-group>
				<label htmlFor="firstName">Prénom :</label>
				<input type="firstName" name="firstName" v-model="firstName"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="lastName">Nom :</label>
				<input type="lastName" name="lastName" v-model="lastName"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="address">Addresse :</label>
				<input type="address" name="address" v-model="address"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="phone">Téléphone :</label>
				<input type="phone" name="phone" v-model="phone"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="email">Mail :</label>
				<input type="email" name="email" v-model="email"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="password">Password :</label>
				<input type="password" name="password" v-model="password"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="isAdmin">isAdmin :</label>
				<input type="checkbox" name="isAdmin" v-model="isAdmin"/>
			</b-form-group>
			<b-form-group>
				<button>Créer</button>
			</b-form-group>
		</b-form>
		<p v-if="messageError">
			{{messageError}}
		</p>
	</div>
</template>

<script>
import apiConfigs from "../configs/api.configs";
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
  components: {
      TitlePage
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
  		fetch(`${apiConfigs.apiUrl}/users/add`, requestOptions)
  		.then(response => response.json())
    	.then(data => {
    		if (!data.auth) {
    			this.messageError = data.message;
    		}
    		else {
    			// console.log(data);
    			// let token = data.token;
    			// localStorage.setItem('token', token);
    			this.$router.push('/usersCRUD');
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