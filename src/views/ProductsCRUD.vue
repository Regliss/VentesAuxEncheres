<template>
  <div class="product__crud">
    <TitlePage title="Gestion des products" />
    <div style="margin-left: 980px;">
      <router-link to="/addProduct" custom v-slot="{ navigate }">
        <b-button variant="info" @click="navigate" @keypress.enter="navigate" role="link">Ajouter</b-button>
      </router-link>
    </div>
    <p></p>
    <b-container>
      <b-table-simple bordered>
        <b-thead head-variant="dark" bordered>
          <b-tr>
            <b-th>Id</b-th>
            <b-th>Titre</b-th>
            <b-th>Prix</b-th>
            <b-th>Description</b-th>
            <b-th>Image</b-th>
            <b-th>Catégorie</b-th>
            <b-th>Date début</b-th>
            <b-th>Date fin</b-th>
            <b-th>Actions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="product in productsFromApi" :key="product._id">
            <b-td> {{ product._id }} </b-td>
            <b-td> 
              <router-link :to="{ name: 'Product',params: {id: product._id}} ">
              {{ product.title }}
              </router-link>
            </b-td>
            <b-td> {{ product.price | formatPriceDecimal | formatPrice  }} </b-td>
            <b-td> {{ product.description }} </b-td>
            <b-td><img :src="product.image" class="img__product"/></b-td>
            <b-td> {{ product.category.title }} </b-td>
            <b-td> {{ product.dateStart }} </b-td>
            <b-td> {{ product.dateEnd }} </b-td>
            <b-td>
              <router-link :to="{name:'UpdateProduct',params:{id:product._id}}" custom v-slot="{ navigate }">
                <b-button variant="info" @click="navigate" @keypress.enter="navigate" role="link">Modifier</b-button>
              </router-link> |
              <b-button variant="danger" @click="DeleteOne(product)" >Supprimer </b-button>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-container>
  </div>
</template>

<script>
import TitlePage from "../components/TitlePage";
import ApiProductsCrud from "../mixins/ApiProductsCrud";
import apiConfigs from "../configs/api.configs";
export default {
    data: function(){
        return {
            productsFromApi:[],
        }
    },
    components: {
        TitlePage
    },
    mixins:[ApiProductsCrud],
    created() {
        this.getProducts() 
        .then(data => {
        	console.log(data);
            this.productsFromApi = data;
        })
        .catch(err => console.log(err))          
    },
    methods: {
        DeleteOne(product) {
            const requestOptions = {
                method: "GET"
            };
            fetch(`${apiConfigs.apiUrl}/products/delete/${product._id}`, requestOptions)
            .then(res=> res.json())
            .catch(err => console.log(err))

            this.getProducts() 
            .then(data => {
            this.productsFromApi = data;
            })
            .catch(err => console.log(err))      
        }
    },
    
}
</script>

<style lang="scss" scoped>
.img__product{
    max-width: 5rem;
}
</style>
