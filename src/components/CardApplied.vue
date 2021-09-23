<template>
    <div class="thank-you" :style="{ minHeight: height + 'px' }">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                     <div class="feature-image-wrap mb-4">
                            <img :src="featureImg" alt="" class="feature-image" />
                    </div>
                    <h1>Thank you</h1>
                    <p>E-commerce Activation Request Created Successfully</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CardApplied',
    data () {
        return {
            height: "",
            featureImg: require("../assets/images/ecom.jpg"),
        }
    },
     mounted() {
        this.height = window.innerHeight;  
        this.height = this.height - 56; 
        },
}
</script>