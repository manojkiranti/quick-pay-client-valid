<template>
  <div class="card-form" :style="{ minHeight: height + 'px' }">
    <div class="container">
      <div class="row">
        <div class="col-md-12 pt-3">
          <div class="feature-image-wrap mb-4">
            <img :src="featureImg" alt="" class="feature-image" />
          </div>
        </div>
        <div class="col-md-12">
          <form novalidate @submit.prevent="submitForm">
            <div class="mb-4">
              <md-field>
                <label for="movie">Card Type</label>
                <md-select
                  name="cardType"
                  id="cardType"
                  v-model="form.cardType"
                >
                  <md-option value="DEBIT">Debit Card</md-option>
                  <md-option value="CREDIT">Credit Card</md-option>
                </md-select>
              </md-field>
            </div>

            <template v-if="form.cardType == 'CREDIT'">
              <div class="mb-4">
                <md-field :class="getValidationClass('cardNumber')">
                  <label>Card Number</label>
                  <md-input
                    type="text"
                    v-model="form.cardNumber"
                    maxlength="16"
                  ></md-input>
                  <span class="md-error" v-if="!$v.form.cardNumber.required"
                    >Card number is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.form.cardNumber.maxLength"
                    >Card number is not valid.</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.form.cardNumber.minLength"
                    >Card number is not valid.</span
                  >
                </md-field>
              </div>

              <div class="mb-4">
                <md-field :class="getValidationClass('cardExipryDate')">
                  <label>Expiry Date</label>
                  <md-input
                    maxlength="5"
                    placeholder="MM/YY"
                    v-model="form.cardExpiryDate"
                    type="text"
                    @keyup="formatString($event)"
                  ></md-input>
                  <span class="md-error" v-if="!$v.form.cardExpiryDate.required"
                  >Expiry Date is Required</span
                >
                <span class="md-error" v-else-if="!$v.form.cardExpiryDate.minLength"
                  >Invalid Date</span
                >
                </md-field>
              </div>
            </template>

            <div class="mb-4">
              <md-field :class="getValidationClass('email')">
                <label>Email Address</label>
                <md-input type="email" v-model="form.email"></md-input>
                <span class="md-error" v-if="!$v.form.email.required"
                  >Email is required</span
                >
                <span class="md-error" v-else-if="!$v.form.email.email"
                  >Invalid email</span
                >
              </md-field>
            </div>
            <div class="mb-3 form-check form-check-wrap">
              <md-checkbox
                v-model="form.isAgreedTermsAndConditions"
                class="md-primary"
                :class="getValidationClass('isAgreedTermsAndConditions')"
                value="1"
                >I agree to the
                <a href="#" @click="showModal = !showModal"
                  >Terms and conditions
                </a>
                <span
                class="md-error"
                v-if="!$v.form.isAgreedTermsAndConditions.required"
                >Please agree terms and conditons</span
              >
              </md-checkbox>
              
            </div>

            <md-button type="submit" class="md-raised md-primary submit-btn"
              >Submit
              <md-progress-spinner
                v-if="requestLoading"
                class="md-accent btn-loading"
                :md-stroke="3"
                :md-diameter="20"
                md-mode="indeterminate"
              ></md-progress-spinner
            ></md-button>

            <transition name="fade">
              <div class="modal-vue-box" v-if="showModal">
                <md-button
                  class="md-fab md-primary modal-close md-mini"
                  @click="showModal = false"
                >
                  <img src="../assets/images/close.png" alt="" />
                </md-button>
                <pdf
                  v-for="i in numPages"
                  :key="i"
                  :page="i"
                  :src="pdfPath"
                  style="width: 100%"
                >
                </pdf>
              </div>
            </transition>
          </form>
        </div>
      </div>
      <transition name="fade">
        <div
          class="overlay-vue"
          v-if="showModal"
          @click="showModal = false"
        ></div>
      </transition>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

import pdf from "vue-pdf";
let pdfPath = `${window.location.origin}/conditions.pdf`;
var loadingTask = pdf.createLoadingTask(pdfPath);

export default {
  name: "CardForm",
  mixins: [validationMixin],
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    pdf,
  },
  data() {
    return {
      height: "",
      agreeTerms: false,
      pdfPath: pdfPath,
      passwordVisible: false,
      passwordType: "password",
      form: {
        cardType: "DEBIT",
        email: null,
        cardNumber: null,
        cardExpiryDate: null,
        isAgreedTermsAndConditions: null,
      },
      src: loadingTask,
      numPages: undefined,
      showModal: false,

      featureImg: require("../assets/images/ecom.jpg"),
      loading: false,
    };
  },
  validations() {
    if (this.form.cardType == "DEBIT") {
      return {
        form: {
          cardType: {
            required,
          },
          email: {
            required,
            email,
          },
          isAgreedTermsAndConditions: {
            required,
          },
        },
      };
    } else {
      return {
        form: {
          cardType: {
            required,
          },
          cardNumber: {
            maxLength: maxLength(16),
            minLength: minLength(16),
            required
          },
          cardExpiryDate: {
            required,
            minLength: minLength(5)
          },
          email: {
            required,
            email,
          },
          isAgreedTermsAndConditions: {
            required,
          },
        },
      };
    }
  },
  mounted() {
    this.height = window.innerHeight;
    this.src.promise.then((pdf) => {
      this.numPages = pdf.numPages;
    });
 console.log(window.location.origin)
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    formatString(event) {
      // var inputChar = String.fromCharCode(event.keyCode);
      // console.log(inputChar)
      var code = event.keyCode;
      var allowedKeys = [8];
      if (allowedKeys.indexOf(code) !== -1) {
        return;
      }

      this.form.cardExpiryDate = this.form.cardExpiryDate
        .replace(
          /^([1-9]\/|[2-9])$/g,
          "0$1/" // 3 > 03/
        )
        .replace(
          /^(0[1-9]|1[0-2])$/g,
          "$1/" // 11 > 11/
        )
        .replace(
          /^([0-1])([3-9])$/g,
          "0$1/$2" // 13 > 01/3
        )
        .replace(
          /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
          "$1/$2" // 141 > 01/41
        )
        .replace(
          /^([0]+)\/|[0]+$/g,
          "0" // 0/ > 0 and 00 > 0
        )
        .replace(
          /[^\d\/]|^[\/]*$/g,
          "" // To allow only digits and `/`
        )
        .replace(
          /\/\//g,
          "/" // Prevent entering more than 1 `/`
        );
    },

    submitForm() {
      this.$v.$touch();
      console.log("this.$v.$invalid", this.$v.$invalid);

      if (!this.$v.$invalid) {
        console.log('this.form', this.form)
        this.$emit("submitCardForm", this.form);
      }
    },
    submitDetail() {},
  },
};
</script>
<style lang="scss">
.overlay-vue {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue-box {
  position: absolute;
  width: 90%;
  z-index: 9999;
  margin: 0 auto;
  padding: 10px 10px;
  left: 5%;
  top: 50px;
  background-color: #fff;
}
.modal-close {
  position: absolute !important;
  right: -22px;
  top: -27px;
}
.modal-vue .close {
  position: absolute;
  top: 10px;
  right: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.password-wrap {
  position: relative;
  .btn.btn-cirle {
    position: absolute;
    top: 7px;
    right: 0;
  }
  .btn.btn-cirle:focus {
    box-shadow: none;
  }
}
</style>
