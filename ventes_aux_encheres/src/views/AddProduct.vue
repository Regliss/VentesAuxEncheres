<template>
  <div class="product__form">
    <TitlePage title="Ajout Produit" />
    <b-form @submit.prevent="addProduct">
      <b-form-group>
        <label htmlFor="title">Titre :</label>
        <b-input type="text" name="title" v-model="title" />
      </b-form-group>
      <b-form-group>
        <label htmlFor="price">Prix :</label>
        <b-input type="text" name="price" v-model="price" />
      </b-form-group>
      <b-form-group>
        <label htmlFor="description">Description :</label>
        <b-input type="text" name="description" v-model="description" />
      </b-form-group>
      <b-form-group>
        <label htmlFor="image">Image :</label>
        <b-input type="text" name="image" v-model="image" />
      </b-form-group>
      <b-form-group>
        <label htmlFor="category">Categorie :</label>
        <b-form-select type="text" name="category" v-model="category">
          <option v-for="category in this.CategoryzFromApi" v-bind:key="category._id" :value="category._id" >
            {{ category.title }}
          </option>
        </b-form-select>
      </b-form-group>
      <b-form-group>
        <label htmlFor="dateStart">Date début :</label>
        <b-form-datepicker type="date" v-model="dateStart" locale="fr" />
      </b-form-group>
      <b-form-group>
        <label htmlFor="dateEnd">Date Fin :</label>
        <b-form-datepicker type="date" v-model="dateEnd" locale="fr" />
      </b-form-group>
      <b-form-group>
        <input type="submit" value="Créer" />
      </b-form-group>
    </b-form>
    <p v-if="messageError">
      {{ messageError }}
    </p>
  </div>
</template>
<script>
import TitlePage from "../components/TitlePage";
import Category from "../mixins/ApiCategoryzCrud";
export default {
  name: "AddProduct",
  data: function() {
    return {
      title: "",
      price: "",
      description: "",
      image: "",
      dateEnd: "",
      dateStart: "",
      category: "",
      messageError: "",
      CategoryzFromApi: [],
    };
  },
  components: {
    TitlePage,
  },
  mixins: [Category],
  methods: {
    addProduct: function(e) {
      const body = {
        title: this.title,
        price: this.price,
        description: this.description,
        image: this.image,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        category: this.category,
      };
      console.log(body);
      const bodyToSend = JSON.stringify(body);
      console.log(bodyToSend);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyToSend,
      };
      console.log(bodyToSend);
      fetch("http://localhost:3030/apiVentes/product", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.$router.push("/productsCRUD");
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getCategoryz()
      .then((data) => (this.CategoryzFromApi = data))
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
.product__form {
  font-family: 16px;
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
}
</style>
