<template>
	<header class="header__main">
		<div class="header__logo">
			<img src="../assets/logo.png" alt="My App Vue">
		</div>
		<div class="header__nav">
          <router-link to="/account">Profil</router-link> |
          <router-link to="/">Login</router-link>  |
          <div v-if="user.isAdmin">
          <router-link to="/usersCRUD">Users CRUD</router-link> |
          <router-link to="/productsCRUD">Products CRUD</router-link> |
          <router-link to="/categoryzCRUD">Categoris CRUD</router-link>
          </div>
          
    	</div>
	</header>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode';
import apiConfigs from "../configs/api.configs";
export default {

  name: 'Header',

  data () {
    return {
      user:[],
    }
  },
  methods: {
    isAdmin: function() {
      this.user.isAdmin = true;
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
      .then(res => res.json())
      .then(data => {
        this.user = data;
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="css" scoped>
</style>