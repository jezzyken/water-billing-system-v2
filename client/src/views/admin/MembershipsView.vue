<template>
  <v-card class="ma-4">
    <v-card-title>Membership</v-card-title>

    <v-stepper v-model="step">
      <!-- Consumer Information Step -->
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          Consumer Information
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">Payment</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Complete</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- Step 1 -->
        <v-stepper-content step="1">
          <v-form ref="form">
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="consumer.lastName"
                  label="Last Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="consumer.firstName"
                  label="First Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="consumer.middleName"
                  label="Middle Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="consumer.extension"
                  :items="consumer.extensions"
                  label="Name Extension"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="consumer.address"
                  label="Complete Address"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="consumer.purok"
                  :items="consumer.puroks"
                  label="Purok"
                  outlined
                  required
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="consumer.contactNo"
                  label="Contact No"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn color="primary" @click="step = 2">Continue</v-btn>
          </v-form>
        </v-stepper-content>

        <!-- Step 2 -->
        <v-stepper-content step="2">
          <v-card-text>
            <h3>Consumer Information Overview</h3>
            <v-divider class="my-4"></v-divider>
            <p>
              {{ capitalizedConsumer.lastName }},
              {{ capitalizedConsumer.firstName }}
              {{ capitalizedConsumer.middleName }} {{ consumer.extension }}
            </p>
            <p>{{ consumer.purok }} {{ consumer.address }}</p>
            <p>{{ consumer.contactNo }}</p>
            <v-divider class="my-4"></v-divider>

            <h3>Membership Fee</h3>
            <v-alert type="info" color="primary" dark>
              Membership Fee of P200.00
            </v-alert>

            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model.number="payment.amountPaid"
                  label="Amount Paid"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="computedChange"
                  label="Change"
                  readonly
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="submitForm">Submit</v-btn>
            <v-btn text @click="step = 1">Back</v-btn>
          </v-card-actions>
        </v-stepper-content>

        <!-- Step 3 -->
        <v-stepper-content step="3">
          <v-card-text class="text-center">
            <v-icon x-large color="success">mdi-check-circle</v-icon>
            <h2 class="mt-4">Success! New Consumer has been registered</h2>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="goToConsumers">Finish</v-btn>
          </v-card-actions>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import api from '@/services/api'

export default {
  data() {
    return {
      step: 1,
      consumer: {
        lastName: '',
        firstName: '',
        middleName: '',
        address: 'Sitio Basak Brgy. Malandag',
        puroks: ['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6'],
        extensions: ['Jr', 'Sr'],
        purok: '',
        extension: '',
        contactNumber: '',
        isMember: false
      },
      payment: {
        amountPaid: 0,
        change: 0,
        collectionType: 'Membership Fee'
      },
      membershipFee: 200
    }
  },

  computed: {
    computedChange() {
      return this.payment.amountPaid >= this.membershipFee
        ? this.payment.amountPaid - this.membershipFee
        : 0
    },
    capitalizedConsumer() {
      return this.capitalizeObject(this.consumer)
    }
  },

  watch: {
    computedChange(newVal) {
      this.payment.change = newVal
    }
  },

  methods: {
    capitalize(value) {
      if (!value) return ''
      return value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },

    capitalizeObject(obj) {
      let capitalizedObj = {}
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          capitalizedObj[key] = this.capitalize(obj[key])
        } else {
          capitalizedObj[key] = obj[key]
        }
      }
      return capitalizedObj
    },

    async submitForm() {
      try {
        const data = {
          consumer: this.consumer,
          payment: { ...this.payment, totalBill: this.membershipFee }
        }
        await api.post('/consumer', data)
        this.step = 3
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },

    goToConsumers() {
      this.$router.push('/consumer')
    }
  }
}
</script>

<style scoped>
.v-card {
  margin: 100px !important;
}
</style>