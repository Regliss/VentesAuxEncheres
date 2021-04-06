<template>
	<div class="category__form">
		<TitlePage title="Ajout Category"/>
		<b-form-simple @submit.prevent="addCategory">
			<b-form-group>
				<label htmlFor="title">Titre :</label>
				<b-input type="title" name="title" v-model="title"/>
			</b-form-group>
			<b-form-group>
				<b-button>Créer</b-button>
			</b-form-group>
		</b-form-simple>
	</div>
</template>
<script>
import TitlePage from "../components/TitlePage";
  
  export default {
    name: 'AddCategory',
    data: function() {
        return {
            title:""
        }
    },
    components: {
      TitlePage
    },
    methods: {
      addCategory: function(e) {
          const body = {
              title: this.title,
          }
           console.log(body)
          const bodyToSend = JSON.stringify(body);
            console.log(bodyToSend)
          const requestOptions = {
              method: "POST",
              headers: {
                  "Content-Type":"application/json"
              },
              body: bodyToSend
          }
             console.log(bodyToSend)
          fetch("http://localhost:3030/apiVentes/categoryz", requestOptions)
          .then(res=>res.json())
          .then(data=> console.log(data))
          .catch(err=>console.log(err))
      }
    },
  }
  
</script>


<style lang="scss" scoped>
.category__form {
        font-family: 16px;
        margin: 0 auto;
        max-width: 400px;
        width: 100%;
    }
</style>