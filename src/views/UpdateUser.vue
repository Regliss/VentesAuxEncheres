<template>
	<div class="update__account">
		<TitlePage title="Modifier l'utilisateur"/>
		<div>
      <form @submit.prevent="update">
        <form>
          <label htmlFor="lastName">Nom :</label>
          <input name="lastName" v-model="lastName"/>
        </form>
        <form>
          <label htmlFor="firstName">Prénom :</label>
          <input name="firstName" v-model="firstName"/>
        </form>
		<form>
          <label htmlFor="address">Adresse :</label>
          <input name="address" v-model="address"/>
        </form>
		<form>
          <label htmlFor="phone">Téléphone :</label>
          <input name="phone" v-model="phone"/>
        </form>
        <form>
			<label htmlFor="isAdmin">isAdmin :</label>
			<input type="checkbox" name="isAdmin" v-model="isAdmin"/>
		</form>
        <input type="submit">
      </form>
      <p></p>
	</div>		
	</div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import TitlePage from "../components/TitlePage";
import apiConfigs from "../configs/api.configs"
export default {
  name: 'UpdateUser',
  components: {
  	TitlePage
  },
  data: function() {
  	return {
      updateUser:{},
      lastName:"",
      firstName:"",
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
      console.log(this.firstName);
      const body = {
        lastName: this.lastName,
        firstName: this.firstName,
        address: this.address,
        phone: this.phone,
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
      fetch(`${apiConfigs.apiUrl}/users/edit/${this.$route.params.id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.$router.push('/usersCRUD');
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
  		fetch(`${apiConfigs.apiUrl}/users/${this.$route.params.id}`, {
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