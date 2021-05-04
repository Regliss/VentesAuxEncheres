<template>
  <header class="header__main">
    <div class="header__logo">
      <img class="logo" src="../assets/logo1.png" alt="My App Vue">
    </div>
    <div class="header__nav">
          <span v-if="user.isAdmin">
          <!-- <router-link to="/">Login</router-link>
          </span> -->
            <!-- <span v-else> -->
            <router-link class="header__menu" to="/account">Profil</router-link>
            <router-link class="header__menu" to="/usersCRUD">Gestionnaire Utilisateurs</router-link>
            <router-link class="header__menu" to="/productsCRUD">Gestionnaire Produits</router-link>
            <router-link class="header__menu" to="/categoryzCRUD">Gestionnaire Catégories</router-link>
            </span>    
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
      fetch(`${apiConfigs.apiUrl}/users/${decodeToken.id}`, {
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
.header__logo{
  float: left;
}
.logo{
  width: 100px;
}
.header__nav{
  margin: auto;
}
.header__menu{
  font-size: 1em;
  color: white;
  text-decoration: none;
  font-weight: bold;
  margin: 0 10px 0 10px;
}
.header__menu:hover{
  color: lightgray;
}

.header__main{
  background-color: black ;
  display: flex;
  padding: 0 20% 0 20%;
  width: 100%;
}
</style>
