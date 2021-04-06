<template>
	<header class="header__main">
		<div class="header__logo">
			<img src="../assets/logo.png" alt="My App Vue">
		</div>
		<div class="header__nav">
          <router-link to="/account">Profil</router-link> |
          <router-link to="/">Login</router-link>  
          <!-- <router-link to="/usersCRUD">Users CRUD</router-link> | -->
    	</div>
	</header>
</template>
<script>
export default {

  name: 'Header',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>