<template>
	<div class="product__form">
		<TitlePage title="Ajout Produit"/>
		<b-form-simple @submit.prevent="addProduct">
			<b-form-group>
				<label htmlFor="title">Titre :</label>
				<b-input type="title" name="title" v-model="title"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="price">Prix :</label>
				<b-input type="price" name="price" v-model="price"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="descritpion">Description :</label>
				<b-input type="descritpion" name="descritpion" v-model="descritpion"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="image">Image :</label>
				<b-input type="image" name="image" v-model="image"/>
			</b-form-group>
			<b-form-group>
				<label htmlFor="dateStart">Date début :</label>
				<b-form-datepicker v-model="dateStart" :min="min" :max="max" locale="fr"></b-form-datepicker>
			</b-form-group>
			<b-form-group>
				<label htmlFor="dateEnd">Date Fin :</label>
				<b-form-datepicker v-model="dateEnd" :min="min" :max="max" locale="fr"></b-form-datepicker>
			</b-form-group>
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
    name: 'AddProduct',
    data: function() {
        return {
            title:"",
            price:"",
            description:"",
            image:"",
            dateEnd:"",
            dateStart:"",
            category:"",
            msgErr:""
        }
    },
    components: {
      TitlePage
    },
    methods: {
      addProduct: function(e) {
          const body = {
              title: this.title,
              price: this.price,
              description: this.description,
              image: this.image,
              dateStart: this.dateStart,
              dateEnd: this.dateEnd,
              category: this.category
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
          fetch("http://localhost:3030/apiVentes/product", requestOptions)
          .then(res=>res.json())
          .then(data=> console.log(data))
          .catch(err=>console.log(err))
      }
    },
  }
  
</script>


<style lang="scss" scoped>
.product__form {
        font-family: 16px;
        margin: 0 auto;
        max-width: 400px;
        width: 100%;
    }
</style>