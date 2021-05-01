<template>
  <div class="product__crud">
    <TitlePage :title="product.title" />
        <div class="content">
            <img class="product__img" :src="product.image" >
            <div class="product__info">

            <p><b>Description:</b>
                {{ product.description }}
            </p>
            <p><b>Prix:</b>
                {{ product.price | formatPriceDecimal | formatPrice }}
            </p>
            <p><b>Category:</b>
                {{ product.category.title }}
            </p>
            <p><b>Date de publication:</b>
                {{ product.dateStart }}
            </p>
            <p><b>Date d'échéance:</b>
                {{ product.dateEnd }}
            </p>
            </div>
        </div>
  </div>
</template>

<script>
import TitlePage from "../components/TitlePage";
import apiConfigs from "../configs/api.configs";
export default {
    components: {
        TitlePage,
    },
    data() {
        return {
            product: {},
        }
    },
    created () {
        fetch(`${apiConfigs.apiUrl}/products/${this.$route.params.id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.product = data;
            })
            .catch((err) => console.log(err));
    },    
}
</script>

<style lang="scss" scoped>
.content {
    border: lightgrey solid 1px;
    width: 60%;
    margin: auto;
    margin-bottom: 10px;
    padding: 20px 40px 40px;
    border-radius: 15px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    display: flex;
}

.product__img{
    max-height: 300px;
    max-width: 300px;
    float: left;
    margin: 10px
}

.product__info{
    margin: 10px;
    display: inline;
    text-align: left;
}
</style>
