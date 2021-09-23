module.exports = {
    mounted() {
        this.getUserInfo()
    },
    methods: {
        restrictDesktop() {
           let validUser = localStorage.getItem("card_userValid");
           if(!validUser) {
                alert("Unauthorized");
                this.$router.push("/ecom/404");
           } 
        }
    }
}