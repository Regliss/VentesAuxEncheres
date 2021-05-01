<template>
  <div class="update__account">
    <TitlePage title="Modifier l'utilisateur" />
    <div>
      <b-form @submit.prevent="update">
        <b-form-group>
          <label htmlFor="lastName">Nom :</label>
          <b-input type="text" name="lastName" v-model="lastName" />
        </b-form-group>
        <b-form-group>
          <label htmlFor="firstName">Prénom :</label>
          <b-input type="text" name="firstName" v-model="firstName" />
        </b-form-group>
        <b-form-group>
          <label htmlFor="address">Adresse :</label>
          <b-input type="text" name="address" v-model="address" />
        </b-form-group>
        <b-form-group>
          <label htmlFor="phone">Téléphone :</label>
          <b-input type="text" name="phone" v-model="phone" />
        </b-form-group>
        <b-form-group>
          <label htmlFor="isAdmin">isAdmin :</label>
          <input type="checkbox" name="isAdmin" v-model="isAdmin" />
        </b-form-group>
        <input type="submit" />
      </b-form>
      <p></p>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import TitlePage from "../components/TitlePage";
import apiConfigs from "../configs/api.configs";
export default {
  name: "UpdateUser",
  components: {
    TitlePage,
  },
  data: function() {
    return {
      updateUser: {},
      lastName: "",
      firstName: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      isAdmin: "",
      messageError: "",
    };
  },
  methods: {
    update: function() {
      console.log(this.firstName);
      const body = {
        lastName: this.lastName,
        firstName: this.firstName,
        address: this.address,
        phone: this.phone,
        isAdmin: this.isAdmin,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      console.log(JSON.stringify(body));
      fetch(
        `${apiConfigs.apiUrl}/users/edit/${this.$route.params.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.$router.push("/usersCRUD");
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
      fetch(`${apiConfigs.apiUrl}/users/${this.$route.params.id}`, {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.lastName = data.lastName;
          this.firstName = data.firstName;
          this.address = data.address;
          this.phone = data.phone;
          this.isAdmin = data.isAdmin;
          this.updateUser = data;
        })
        .then((err) => console.log(err));
    }
  },
};
</script>

<style lang="css" scoped>
.update__account {
  font-family: 16px;
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
}
</style>
