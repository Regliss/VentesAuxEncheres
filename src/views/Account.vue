<template>
	<div class="page__account">
		<TitlePage title="Mon compte"/>
		<div v-if="isLogged">
			<div class="user__info" v-if="user">
				<p><b>Nom: </b>{{user.lastName}}</p>
				<p><b>Prénom: </b>{{user.firstName}}</p>
				<p><b>Adresse: </b>{{user.address}}</p>
				<p><b>Téléphone: </b>{{user.phone}}</p>
				<p><b>Mail: </b>{{user.email}}</p>
	  			<!-- <router-link :to="{name:'Product',params:{id:productObject._id}}"> -->
	  			<!-- <router-link :to="{name:'UpdateUser', params:{id:user._id}}">
	  				<b-button @click="">Modifier</b-button> 
	  			</router-link> | -->
	  			<b-button @click="logout">Se déconnecter</b-button>
	  			<p></p>
			</div>
		</div>
		<div v-else>
			<p>Vous n'êtes pas connecté</p>
		</div>
		
	</div>
</template>

<script>
import apiConfigs from '../configs/api.configs';
import VueJwtDecode from 'vue-jwt-decode';
import TitlePage from "../components/TitlePage";
export default {

  name: 'User',
  components: {
  	TitlePage
  },
  data: function() {
  	return {
  		user:[],
  		isLogged: false
  	}
  },
  methods: {
  	logout: function() {
  		localStorage.removeItem('token');
  		this.isLogged = false;
  		this.$router.push('/');
  	},
  	addAdmin: function() {
  		this.user.isAdmin = true;
  	}
  },
  created() {
  	const token = localStorage.getItem('token');
  	if (token) {
  		const decodeToken = VueJwtDecode.decode(token);
  		fetch(`${apiConfigs.apiUrl}/users/${decodeToken.id}`, {
  			headers: {
  				Authorization:token,
  			}
  		})
  		.then(res => res.json())
  		.then(data => {
  			this.isLogged = true;
  			this.user = data;
  			// console.log(this.user.isAdmin);
  		})
  		.catch(err => console.log(err))
  	}
  },
  beforeDestroy () {
        this.$router.go(0);
    },
}
</script>

<style lang="css" scoped>
</style>