<template>
	<div class="update__account">
		<TitlePage title="Modifier l'utilisateur"/>
		<div>
      <b-form @submit.prevent="update">
        <b-form-group>
          <label htmlFor="lastName">Nom :</label>
          <b-input name="lastName" v-model="lastName"/>
        </b-form-group>
        <b-form-group>
          <label htmlFor="firstName">Prénom :</label>
          <b-input name="firstName" v-model="firstName"/>
        </b-form-group>
		<b-form-group>
          <label htmlFor="address">Adresse :</label>
          <b-input name="address" v-model="address"/>
        </b-form-group>
		<b-form-group>
          <label htmlFor="phone">Téléphone :</label>
          <b-input name="phone" v-model="phone"/>
        </b-form-group>
        <b-form-checkbox name="isAdmin" v-model="isAdmin">Admin</b-form-checkbox>
		<b-form-group>
          <input type="submit"></input>
        </b-form-group>
      </b-form>
      <p></p>
		</div>		
	</div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import TitlePage from "../components/TitlePage";
export default {
  name: 'UpdateUser',
  components: {
  	TitlePage
  },
  data: function() {
  	return {
      updateUser:{},
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
  methods: {
    update: function() {
      const token = localStorage.getItem('token');
      console.log(this.firstName);
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
        console.log(JSON.stringify(body));
      const decodeToken = VueJwtDecode.decode(token);
      fetch(`http://localhost:3030/apiVentes/users/edit/${decodeToken.id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // this.$router.push('/account');
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
  	const token = localStorage.getItem('token');
  	if (token) {
  		const decodeToken = VueJwtDecode.decode(token);
  		fetch(`http://localhost:3030/apiVentes/users/${decodeToken.id}`, {
  			headers: {
  				Authorization:token
  			}
  		})
  		.then(res=>res.json())
      .then(data=>{
      this.lastName = data.lastName;
      this.firstName = data.firstName;
      this.address = data.address;
      this.phone = data.phone;
      this.isAdmin = data.isAdmin;
      this.updateUser = data;
      })
    .then(err=>console.log(err));
  	}
  }
}
</script>

<style lang="css" scoped>
.update__account {
        font-family: 16px;
        margin: 0 auto;
        max-width: 400px;
        width: 100%;
    }
</style>