<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <form @submit.prevent="submitForm">
            <md-field>
              <label>Name</label>
              <md-input v-model="requestForm.name"></md-input>
            </md-field>
            <md-field>
              <label>Mobile</label>
              <md-input v-model="requestForm.mobileNumber"></md-input>
            </md-field>
            <md-field>
              <label>Email</label>
              <md-input v-model="requestForm.email"></md-input>
            </md-field>
            <md-field>
              <label>Amount</label>
              <md-input v-model="requestForm.amount"></md-input>
            </md-field>
            <md-field>
              <label>Remarks</label>
              <md-input v-model="requestForm.remarks"></md-input>
            </md-field>
            <md-button class="md-raised md-primary" type="submit"
              >Submit</md-button
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",

  data() {
    return {
      requestForm: {
        name: "",
        mobileNumber: "",
        email: "",
        amount:"",
        remarks: "",
        organizationId: "100710071234569",
        thirdPartyUniqueId: "1"
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      axios
        .post("http://localhost:3000/requestpay", this.requestForm)
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

