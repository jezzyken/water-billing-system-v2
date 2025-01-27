<template>
  <v-dialog v-model="show" max-width="500">
    <v-card>
      <!-- Payment Entry View -->
      <template v-if="!showConfirmation">
        <v-card-title class="headline primary white--text">
          <v-icon left color="white">mdi-cash-register</v-icon>
          Payment Details
        </v-card-title>

        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12">
              <div class="amount-display mb-6">
                <div class="text-h6 grey--text text--darken-1">
                  Total Amount Due
                </div>
                <div class="text-h3 primary--text font-weight-bold">
                  ₱{{ formatAmount(totalAmount) }}
                </div>
              </div>

              <v-text-field
                v-model.number="cashAmount"
                label="Enter Cash Amount"
                type="number"
                filled
                dense
                prefix="₱"
                :rules="[
                  (val) => val > 0 || 'Please enter a valid amount',
                  (val) => val >= totalAmount || 'Amount is insufficient',
                ]"
                class="mb-4"
                @input="calculateChange"
              ></v-text-field>

              <div class="change-display pa-4 mb-4" v-if="changeAmount > 0">
                <div class="d-flex justify-space-between align-center">
                  <span class="text-subtitle-1">Change Due:</span>
                  <span class="text-h5 success--text font-weight-bold">
                    ₱{{ formatAmount(changeAmount) }}
                  </span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn text @click="onCancel"> Cancel </v-btn>
          <v-btn
            color="primary"
            :disabled="!isPaymentValid"
            @click="showConfirmation = true"
          >
            <v-icon left>mdi-check-circle</v-icon>
            Review Payment
          </v-btn>
        </v-card-actions>
      </template>

      <!-- Confirmation View -->
      <template v-else>
        <v-card-title class="headline primary white--text">
          <v-icon left color="white">mdi-cash-check</v-icon>
          Confirm Payment
        </v-card-title>

        <v-card-text class="pt-4">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Amount Due</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">
                  ₱{{ formatAmount(totalAmount) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Cash Payment</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">
                  ₱{{ formatAmount(cashAmount) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Change</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold">
                  ₱{{ formatAmount(changeAmount) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-alert type="warning" dense class="mt-4">
            Please verify the payment details before confirming.
          </v-alert>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn text @click="showConfirmation = false"> Back </v-btn>
          <v-btn color="primary" @click="onConfirm" :loading="loading">
            Confirm Payment
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PaymentDialog",
  props: {
    show: Boolean,
    totalAmount: Number,
    loading: Boolean,
    consumer: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      cashAmount: 0,
      changeAmount: 0,
      showConfirmation: false,
    };
  },
  computed: {
    isPaymentValid() {
      return this.cashAmount >= this.totalAmount;
    },
  },
  methods: {
    calculateChange() {
      this.changeAmount = Math.max(this.cashAmount - this.totalAmount, 0);
    },
    formatAmount(amount) {
      return Number(amount).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    onCancel() {
      this.$emit("cancel");
      this.resetForm();
    },
    async onConfirm() {
      this.$emit("confirm", {
        cashAmount: this.cashAmount,
        changeAmount: this.changeAmount,
      });
      await this.printReceipt();
    },

    printReceipt() {
      const receipt = this.generateReceiptContent();
      const printWindow = window.open("", "_blank");
      printWindow.document.write(receipt);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    },

    generateReceiptContent() {
      const today = new Date().toLocaleDateString("en-PH");
      const time = new Date().toLocaleTimeString("en-PH");

      return `
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; width: 300px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .details { margin-bottom: 15px; }
            .amount { font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; }
            .divider { border-top: 1px dashed #000; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>WATER BILLING RECEIPT</h2>
            <p>Date: ${today}<br>Time: ${time}</p>
          </div>

          <div class="details">
            <p>Account No: ${this.consumer.consumerId.accountNo}</p>
            <p>Name: ${this.consumer.name}</p>
            <p>Address: ${this.consumer.consumerId.address}</p>
            <p>Purok: ${this.consumer.consumerId.purok}</p>
          </div>

          <div class="divider"></div>

          <div class="details">
            <p>Billing Period: ${this.consumer.previousDate} - ${
        this.consumer.presentDate
      }</p>
            <p>Previous Reading: ${this.consumer.previousRead}</p>
            <p>Present Reading: ${this.consumer.presentRead}</p>
            <p>Consumption: ${this.consumer.consumption} cu.m</p>
          </div>

          <div class="divider"></div>

          <div class="details">
            <p>Amount Due: ₱${this.formatAmount(this.totalAmount)}</p>
            <p>Cash Payment: ₱${this.formatAmount(this.cashAmount)}</p>
            <p>Change: ₱${this.formatAmount(this.changeAmount)}</p>
          </div>

          <div class="divider"></div>

          <div class="footer">
            <p>Due Date: ${new Date(this.consumer.dueDate).toLocaleDateString(
              "en-PH"
            )}</p>
            <p>Thank you for your payment!</p>
          </div>
        </body>
        </html>
      `;
    },

    resetForm() {
      this.cashAmount = 0;
      this.changeAmount = 0;
      this.showConfirmation = false;
    },
  },
  watch: {
    show(newValue) {
      if (!newValue) {
        this.resetForm();
      }
    },
  },
};
</script>

<style scoped>
.amount-display {
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
}

.change-display {
  background-color: #e8f5e9;
  border-radius: 8px;
}
</style>
