<template>
    <div class="card-form" :style="{ minHeight: height + 'px' }">
        <div class="container">
            <div class="row">
                <div class="col-md-12 pt-3">
                    <div class="feature-image-wrap mb-4">
                        <img :src="featureImg" alt="" class="feature-image" />
                    </div>
                    <div class="card-apply text-center">
                        <h2>We didn't find any card register with your account. You can apply card online.</h2>
                         <md-button href="https://www.nicasiabank.com/product/cards" class="md-raised md-primary btn-md-full"> Apply Online </md-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NoCard',
    data () {
        return {
             height: "",
             featureImg: require("../assets/images/ecom.jpg"),
        }
    },
    mounted() {
        this.height = window.innerHeight;
    }
}
</script>