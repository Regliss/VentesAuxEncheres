<template>
  <div class="update__product">
    <TitlePage title="Modifier le produit" />
    <div>
      <b-form @submit.prevent="update">
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
          <b-input type=text name="image" v-model="image" />
        </b-form-group>
        <b-form-group>
          <label htmlFor="category">Categorie :</label>
          <b-form-select type="text" name="category" v-model="category">
            <option
              v-for="category in this.CategoryzFromApi" v-bind:key="category._id" :value="category._id"  >
              {{ category.title }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group>
          <label htmlFor="dateStart">Date début :</label>
          <b-form-datepicker type="date" v-model="dateStart" :min="min" :max="max" locale="fr"></b-form-datepicker>
        </b-form-group>
        <b-form-group>
          <label htmlFor="dateEnd">Date Fin :</label>
          <b-form-datepicker type="date" v-model="dateEnd" :min="min" :max="max" locale="fr"></b-form-datepicker>
        </b-form-group>
        <b-form-group>
          <input type="submit" />
        </b-form-group>
      </b-form>
      <p></p>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Category from "../mixins/ApiCategoryzCrud";
import TitlePage from "../components/TitlePage";
import apiConfigs from "../configs/api.configs";
export default {
  name: "UpdateUser",
  components: {
    TitlePage,
  },
  mixins: [Category],
  data: function() {
    return {
      updateProduct: {},
      CategoryzFromApi: [],
      title: "",
      price: "",
      description: "",
      image: "",
      category:"",
      dateStart: "",
      dateEnd: "",
      min:"",
      max:"",
    };
  },
  methods: {
    update: function() {
      const token = localStorage.getItem("token");
      console.log(this.title);
      const body = {
        title: this.title,
        price: this.price,
        description: this.description,
        image: this.image,
        category: this.category,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      console.log(JSON.stringify(body));
      const decodeToken = VueJwtDecode.decode(token);
      fetch(
        `${apiConfigs.apiUrl}/products/edit/${this.$route.params.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.$router.push('/productsCRUD');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      const decodeToken = VueJwtDecode.decode(token);
      fetch(`${apiConfigs.apiUrl}/products/${this.$route.params.id}`, {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.title = data.title;
          this.price = data.price;
          this.description = data.description;
          this.image = data.image;
          this.category = data.category;
          this.dateStart = data.dateStart;
          this.dateEnd = data.dateEnd;
          this.updateRpduct = data;
        })
        .then((err) => console.log(err));

      this.getCategoryz()
        .then((data) => (this.CategoryzFromApi = data))
        .catch((err) => console.log(err));
    };
    $("#id_deadline").datepicker({ startDate: "today" });

  },
};
</script>

<style lang="css" scoped>
.update__product {
  font-family: 16px;
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
}
</style>
