<template>
  <div class="card-detail" :class="{'loading': !dataLoaded}" :style="{ minHeight: height + 'px' }">

    <div class="pong-loader" v-if="!dataLoaded"></div>
    <template v-else>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="card-nic">
                <img src="../assets/images/nic-card-2.png" alt="" />
                <span class="card-password card-text">{{
                      cardDetails.cardNumber
                    }}</span>
                <span class="card-name card-text">{{
                      cardDetails.customerName
                    }}</span>
                  <span class="card-exp card-text">{{
                      cardExpDisplayDate
                    }}</span>
                    <span class="card-type card-text">{{
                      cardDetailsList.type
                    }}</span>
              </div>

              <!-- <div class="body-detail-list">
                <md-list>
                  <template v-for="(value, name, index) in cardDetailsList">
                    <md-list-item :key="index">
                      <span class="list-title">{{ textMapper[name] }}</span>
                      <span class="title-info">{{ value }}</span>
                    </md-list-item>
                  </template>
                </md-list>
              </div> -->
            </div>
          </div>
          <card-form-wrap :canApplyCard="canApplyCard" :requestLoading="requestLoading" ref="cardForm" :apiCalled="apiCalled" @submitCardForm="submitCardForm"  />
        </div>
        <!-- <md-button @click="procced"  :class="{'btn-disabled': !btnActivated}"  class="md-raised md-primary btn-full-btm"
          >Activate E-Commerce
        </md-button> -->
    </template>
  </div>
</template>
<script>
import CardFormWrap from './CardFormWrap.vue';

export default {
  components: { CardFormWrap },
  name: "CardDetail",
  props: {
      apiCalled: {
        type: Boolean,
        default: false
      },
      canApplyCard: {
        type: Boolean,
        default: true
      },
      requestLoading: {
      type: Boolean,
      default: false
    },
      cardDetails: {
          type: Object,
          default: () => {}
      },
      cardDetailsList: {
          type: Object,
          default: () => {}
      },
      dataLoaded: {
        type: Boolean,
        default: false
      },
      cardExpDisplayDate: {
        type:String,
        default: ''
      }
  },
  data() {
    return {
      btnActivated: false,
      height: "",
      textMapper: {
        cardNumber: "Card Number",
        name: "Holder's Name",
        type: "Type",
        status: "Status",
        exp: "Expiry Date",
      }
    };
  },
  
  mounted() {
    this.height = window.innerHeight;   
  },
  methods: {
   changeSelectedCards() {
     this.$refs.cardForm.changeSelectedCards()
   },
   submitCardForm (payload) {
     this.$emit("submitCardForm", payload);
   },
    procced() {
      this.$emit("goToStep2");
    },
  },
};
</script>
