<template>
	<div class="signup__form">
		<TitlePage title="Ajout Utilisateur"/>
		<form @submit.prevent="signupadmin">
			<form>
				<label htmlFor="firstName">Prénom :</label>
				<input type="firstName" name="firstName" v-model="firstName"/>
			</form>
			<form>
				<label htmlFor="lastName">Nom :</label>
				<input type="lastName" name="lastName" v-model="lastName"/>
			</form>
			<form>
				<label htmlFor="address">Addresse :</label>
				<input type="address" name="address" v-model="address"/>
			</form>
			<form>
				<label htmlFor="phone">Téléphone :</label>
				<input type="phone" name="phone" v-model="phone"/>
			</form>
			<form>
				<label htmlFor="email">Mail :</label>
				<input type="email" name="email" v-model="email"/>
			</form>
			<form>
				<label htmlFor="password">Password :</label>
				<input type="password" name="password" v-model="password"/>
			</form>
			<form>
				<label htmlFor="isAdmin">isAdmin :</label>
				<input type="checkbox" name="isAdmin" v-model="isAdmin"/>
			</form>
				<button>Créer</button>
			</form>
		</form>
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