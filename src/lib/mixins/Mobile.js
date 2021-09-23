module.exports = {
    created() {
        this.restrictDesktop()
    },
    methods: {
        restrictDesktop() {      
            // if (
            //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            //         navigator.userAgent
            //     )
            // ) {
            // } else {
            //     alert("Please use your mobile phone browser");
            //     this.$router.push("ecom/404");
            // }
        }
    }
}