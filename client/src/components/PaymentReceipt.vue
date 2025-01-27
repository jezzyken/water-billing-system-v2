<template>
  <v-dialog v-model="show" max-width="400">
    <v-card class="receipt-card">
      <v-card-text class="receipt-content pa-6">
        <!-- Header -->
        <div class="text-center mb-4">
          <div class="text-h5 font-weight-bold mb-1">Water Bill Receipt</div>
          <div class="caption grey--text">Transaction #{{ transactionId }}</div>
          <div class="caption">{{ formatDate(paymentDate) }}</div>
        </div>

        <v-divider class="mb-4"></v-divider>

        <!-- Consumer Details -->
        <div class="mb-4">
          <div class="subtitle-2 font-weight-bold mb-2">Consumer Details</div>
          <div class="body-2">{{ consumerName }}</div>
          <div class="caption grey--text">Account #{{ accountNo }}</div>
        </div>

        <!-- Bill Details -->
        <div class="mb-4">
          <div class="subtitle-2 font-weight-bold mb-2">Bill Details</div>
          <div class="d-flex justify-space-between mb-1">
            <span class="body-2">Present Bill:</span>
            <span class="body-2">₱{{ formatAmount(presentBill) }}</span>
          </div>
          <div class="d-flex justify-space-between mb-1">
            <span class="body-2">Previous Balance:</span>
            <span class="body-2">₱{{ formatAmount(previousBalance) }}</span>
          </div>
          <div class="d-flex justify-space-between">
            <span class="body-2">Other Charges:</span>
            <span class="body-2">₱{{ formatAmount(otherCharges) }}</span>
          </div>
        </div>

        <v-divider class="mb-4"></v-divider>

        <!-- Payment Details -->
        <div class="mb-4">
          <div class="d-flex justify-space-between mb-2">
            <span class="subtitle-1 font-weight-bold">Total Amount:</span>
            <span class="subtitle-1 font-weight-bold"
              >₱{{ formatAmount(totalAmount) }}</span
            >
          </div>
          <div class="d-flex justify-space-between mb-1">
            <span class="body-2">Cash Payment:</span>
            <span class="body-2">₱{{ formatAmount(cashAmount) }}</span>
          </div>
          <div class="d-flex justify-space-between">
            <span class="body-2">Change:</span>
            <span class="body-2">₱{{ formatAmount(changeAmount) }}</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center caption grey--text mt-6">
          <div>Thank you for your payment!</div>
          <div>Please keep this receipt for your records.</div>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn text @click="onClose"> Close </v-btn>
        <v-btn color="primary" @click="printReceipt">
          <v-icon left>mdi-printer</v-icon>
          Print
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
  name: "PaymentReceipt",
  props: {
    show: Boolean,
    transactionId: String,
    paymentDate: Date,
    consumerName: String,
    accountNo: String,
    presentBill: Number,
    previousBalance: Number,
    otherCharges: Number,
    totalAmount: Number,
    cashAmount: Number,
    changeAmount: Number,
  },

  methods: {
    formatAmount(amount) {
      return Number(amount).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    formatDate(date) {
      return moment(date).format("MMMM DD, YYYY hh:mm A");
    },

    onClose() {
      this.$emit("close");
    },

    printReceipt() {
      const printContent = document.querySelector(".receipt-content").innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = `
        <div class="receipt-print-wrapper">
          ${printContent}
        </div>
      `;

      window.print();
      document.body.innerHTML = originalContent;
    },
  },
};
</script>

<style scoped>
.receipt-card {
  border-radius: 8px;
}

.receipt-content {
  font-family: "Courier New", Courier, monospace;
}

@media print {
  .receipt-print-wrapper {
    width: 80mm;
    padding: 10mm;
  }
}
</style>
