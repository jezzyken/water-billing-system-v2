<template>
  <v-container fluid>
    <v-btn
      :color="printer.isConnected ? 'success' : 'primary'"
      @click="printer.isConnected ? disconnectPrinter() : initializePrinter()"
      class="mb-2"
    >
      <v-icon left>
        {{ printer.isConnected ? "mdi-printer-check" : "mdi-printer" }}
      </v-icon>
      {{ printer.isConnected ? "Printer Connected" : "Connect Printer" }}
    </v-btn>

    <v-card class="mb-6 billing-card" elevation="2">
      <v-card-title
        class="headline primary white--text py-4 d-flex justify-space-between align-center"
      >
        <div class="d-flex align-center">
          <v-icon large color="white" class="mr-3"
            >mdi-file-document-outline</v-icon
          >
          Billing Statement
        </div>
        <v-btn
          color="white"
          outlined
          @click="openPaymentDialog"
          :disabled="!statement.totalBill"
          class="header-pay-button"
        >
          <v-icon left>mdi-cash-register</v-icon>
          Process Payment
        </v-btn>
      </v-card-title>
      <v-card-text class="pt-4">
        <v-row class="consumer-info-section mb-6">
          <v-col cols="12" md="4">
            <div class="info-card pa-4">
              <div class="caption grey--text">Consumer Name</div>
              <div class="title font-weight-bold">
                {{ consumerData.consumerName }}
              </div>
              <v-chip small class="mt-2" color="primary" outlined>
                Account #{{ consumerData.accountNo }}
              </v-chip>
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <div class="info-card pa-4">
              <div class="caption grey--text">Billing Date</div>
              <div class="title font-weight-bold">
                {{ consumerData.billingDate }}
              </div>
              <div class="caption primary--text mt-2">
                <v-icon small color="primary">mdi-calendar</v-icon>
                Statement Generated
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <div class="info-card pa-4">
              <div class="caption grey--text">Due Date</div>
              <div class="title font-weight-bold">
                {{ consumerData.dueDate }}
              </div>
              <div class="caption error--text mt-2">
                <v-icon small color="error">mdi-alert-circle</v-icon>
                Please pay before due date
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Consumption Overview -->
        <v-card outlined class="mb-6">
          <v-card-title class="subtitle-1 grey lighten-4">
            <v-icon left color="primary">mdi-water</v-icon>
            Consumption Overview
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <div class="metric-card text-center pa-3">
                  <div class="caption grey--text mb-1">Previous Reading</div>
                  <div class="headline font-weight-bold">
                    {{ readingData.previousRead }}
                  </div>
                  <div class="caption">{{ readingData.previousDate }}</div>
                </div>
              </v-col>

              <v-col cols="12" md="3">
                <div class="metric-card text-center pa-3">
                  <div class="caption grey--text mb-1">Present Reading</div>
                  <div class="headline font-weight-bold">
                    {{ readingData.presentRead }}
                  </div>
                  <div class="caption">{{ readingData.presentDate }}</div>
                </div>
              </v-col>

              <v-col cols="12" md="3">
                <div class="metric-card text-center pa-3">
                  <div class="caption grey--text mb-1">Consumption</div>
                  <div class="headline font-weight-bold primary--text">
                    {{ readingData.consumption }}
                  </div>
                  <div class="caption">Cubic Meters</div>
                </div>
              </v-col>

              <v-col cols="12" md="3">
                <div class="metric-card text-center pa-3">
                  <div class="caption grey--text mb-1">Meter Status</div>
                  <v-chip
                    small
                    :color="getMeterStatusColor(readingData.readType)"
                  >
                    {{ readingData.readType }}
                  </v-chip>
                  <div class="caption mt-1">
                    {{ readingData.meterDescription }}
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Billing History -->
        <div class="d-flex align-center mb-4">
          <h3 class="text-h6 font-weight-bold grey--text text--darken-2">
            <v-icon left>mdi-history</v-icon>
            Billing History
          </h3>
          <v-spacer></v-spacer>
          <!-- <v-btn small color="primary" outlined>
            <v-icon left small>mdi-download</v-icon>
            Export
          </v-btn> -->
        </div>

        <v-card outlined class="billing-history-card">
          <v-card-text class="pa-0">
            <v-timeline dense>
              <v-timeline-item
                v-for="(bill, index) in consumers"
                :key="index"
                :color="bill.status === 'Paid' ? 'success' : 'error'"
                small
              >
                <div class="d-flex justify-space-between align-center pr-5">
                  <div>
                    <div class="subtitle-1 font-weight-medium">
                      {{ bill.billingDate }}
                    </div>
                    <div class="caption grey--text">
                      Consumption: {{ bill.consumption }} cubic meters
                    </div>
                  </div>
                  <div class="text-right">
                    <v-chip
                      x-small
                      :color="bill.status === 'Paid' ? 'success' : 'error'"
                      :text-color="bill.status === 'Paid' ? 'white' : 'white'"
                    >
                      {{ bill.status }}
                    </v-chip>
                    <div class="caption mt-1">
                      Reading: {{ bill.previousRead }} → {{ bill.presentRead }}
                    </div>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col cols="12" md="12">
        <v-card class="summary-card" elevation="2">
          <v-card-title class="primary white--text">
            <v-icon left color="white">mdi-receipt</v-icon>
            Bill Summary
          </v-card-title>

          <v-card-text class="pa-6">
            <v-row>
              <v-col cols="12" md="4">
                <div class="charge-item">
                  <div class="caption grey--text">Present Bill</div>
                  <div class="title font-weight-medium">
                    ₱{{ formatAmount(statement.presentBill) }}
                  </div>
                </div>
              </v-col>

              <v-col cols="12" md="4">
                <div class="charge-item">
                  <div class="caption grey--text">Previous Balance</div>
                  <div class="title font-weight-medium">
                    ₱{{ formatAmount(statement.previousBalance) }}
                  </div>
                </div>
              </v-col>

              <v-col cols="12" md="4">
                <div class="charge-item">
                  <div class="caption grey--text">Other Charges</div>
                  <div class="title font-weight-medium">₱0</div>
                </div>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <div class="d-flex justify-space-between align-center">
              <div class="text-h6 font-weight-bold">Total Amount Due</div>
              <div class="text-h4 primary--text font-weight-bold">
                ₱{{ formatAmount(statement.totalBill) }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- <v-col cols="12" md="4">
        <v-card elevation="2" class="payment-action-card">
          <v-card-text class="text-center pa-6">
            <v-icon size="64" color="primary" class="mb-4"
              >mdi-cash-multiple</v-icon
            >
            <div class="text-h5 font-weight-bold mb-2">Ready to Pay?</div>
            <div class="text-subtitle-2 grey--text mb-4">
              Total Amount Due: ₱{{ formatAmount(statement.totalBill) }}
            </div>
            <v-btn
              x-large
              block
              color="primary"
              @click="openPaymentDialog"
              class="pay-button"
            >
              <v-icon left>mdi-cash-register</v-icon>
              Process Payment
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col> -->
    </v-row>

    <payment-dialog
      :show="showPaymentDialog"
      :total-amount="statement.totalBill"
      :loading="isLoading"
      :consumer="currentBilling"
      @cancel="showPaymentDialog = false"
      @confirm="handlePaymentConfirm"
    />

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      top
    >
      <v-icon left>{{ snackbar.icon }}</v-icon>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import moment from "moment";
import api from "@/services/api";
import PaymentDialog from "@/components/PaymentDialog.vue";

export default {
  name: "BillingForm",
  components: {
    PaymentDialog,
  },

  data() {
    return {
      consumers: [],
      currentBilling: null,
      cashAmount: 0,
      consumerColumns: [
        {
          text: "CONSUMER NAME",
          value: "consumerName",
          align: "left",
        },
        {
          text: "BILLING DATE",
          value: "billingDate",
          align: "center",
        },
        {
          text: "DUE DATE",
          value: "dueDate",
          align: "center",
        },
      ],
      readingColumns: [
        {
          text: "PREVIOUS DATE",
          value: "previousDate",
          align: "center",
        },
        {
          text: "PREVIOUS READ",
          value: "previousRead",
          align: "center",
        },
        {
          text: "PRESENT DATE",
          value: "presentDate",
          align: "center",
        },
        {
          text: "PRESENT READ",
          value: "presentRead",
          align: "center",
        },
        {
          text: "CONSUMPTION (IN CUBIC)",
          value: "consumption",
          align: "center",
        },
        {
          text: "READ TYPE",
          value: "readType",
          align: "center",
        },
        {
          text: "METER DESCRIPTION",
          value: "meterDescription",
          align: "center",
        },
      ],
      columns: [
        {
          text: "Billing Date",
          value: "billingDate",
          align: "left",
        },
        {
          text: "Previous Read",
          value: "previousRead",
          align: "left",
        },
        {
          text: "Present Read",
          value: "presentRead",
          align: "left",
        },
        {
          text: "Consumption",
          value: "consumption",
          align: "left",
        },
        {
          text: "Payment Status",
          value: "status",
          align: "left",
        },
      ],
      statement: {},
      isLoading: false,
      confirmDialog: false,
      snackbar: {
        show: false,
        text: "",
        color: "",
      },
      showPaymentDialog: false,
      printer: {
        device: null,
        characteristic: null,
        isConnected: false,
      },
    };
  },

  computed: {
    consumerData() {
      if (!this.currentBilling) return {};
      return {
        consumerName: this.currentBilling.name,
        accountNo: this.currentBilling.accountNo,
        billingDate: moment(this.currentBilling.billingDate).format(
          "YYYY-MM-DD"
        ),
        dueDate: moment(this.currentBilling.dueDate).format("YYYY-MM-DD"),
      };
    },

    readingData() {
      if (!this.currentBilling) return {};
      return {
        previousDate: moment(this.currentBilling.previousDate).format(
          "YYYY-MM-DD"
        ),
        previousRead: this.currentBilling.previousRead,
        presentDate: moment(this.currentBilling.presentDate).format(
          "YYYY-MM-DD"
        ),
        presentRead: this.currentBilling.presentRead,
        consumption: this.currentBilling.consumption,
        readType: this.currentBilling.readType,
        meterDescription: this.currentBilling.meterDescription,
      };
    },

    totalAmountPayable() {
      if (!this.currentBilling) return 0;
      return (
        (this.currentBilling.presentBill || 0) +
        (this.currentBilling.previousBalance || 0) +
        (this.currentBilling.otherCharges || 0)
      );
    },

    changeAmount() {
      return Math.max(this.cashAmount - this.totalAmountPayable, 0).toFixed(2);
    },

    isPaymentValid() {
      return this.cashAmount >= this.totalAmountPayable;
    },
  },

  methods: {
    async initializePrinter() {
      if (this.printer.isConnected) {
        return true;
      }

      try {
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ services: ["000018f0-0000-1000-8000-00805f9b34fb"] }],
        });

        const server = await device.gatt.connect();
        const service = await server.getPrimaryService(
          "000018f0-0000-1000-8000-00805f9b34fb"
        );
        const characteristic = await service.getCharacteristic(
          "00002af1-0000-1000-8000-00805f9b34fb"
        );

        this.printer = {
          device,
          characteristic,
          isConnected: true,
        };

        device.addEventListener("gattserverdisconnected", () => {
          this.printer.isConnected = false;
          this.showSnackbar("Printer disconnected", "warning");
        });

        return true;
      } catch (error) {
        console.error("Printer initialization error:", error);
        this.showPrintError(error);
        return false;
      }
    },

    async fetch() {
      try {
        const response = await api.get(
          `/billing/consumer/all/${this.$route.params.id}`
        );
        this.consumers = response.data.map((item) => ({
          ...item,
          billingDate: moment(item.billingDate).format("YYYY-MM-DD"),
        }));

        this.statement = this.generateBillingStatement(response.data);

        if (this.consumers.length > 0) {
          this.currentBilling = this.consumers[0];
          this.currentBilling.name = `${this.currentBilling.consumerId.firstName} ${this.currentBilling.consumerId.middleName} ${this.currentBilling.consumerId.lastName}`;
        }
      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    },

    onViewItem(item) {
      this.$router.push(`/consumer/${item._id}/view`);
    },

    generateBillingStatement(records) {
      records.sort((a, b) => new Date(b.billingDate) - new Date(a.billingDate));

      const recentRecord = records[0];
      let totalBill = 0;
      let previousBalance = 0;
      let hasUnpaidRecords = false;

      records.forEach((record) => {
        if (record.status === "Unpaid") {
          hasUnpaidRecords = true;
          totalBill += record.presentBill;

          if (record._id.toString() !== recentRecord._id.toString()) {
            previousBalance += record.presentBill;
          }
        }
      });

      const presentBill = hasUnpaidRecords ? recentRecord.presentBill : 0;

      return {
        previousDate: recentRecord.previousDate,
        previousRead: recentRecord.previousRead,
        presentDate: recentRecord.presentDate,
        presentRead: recentRecord.presentRead,
        consumption: recentRecord.consumption,
        readType: recentRecord.readType,
        meterDescription: recentRecord.meterDescription,
        presentBill: presentBill,
        totalBill: totalBill,
        previousBalance: previousBalance,
      };
    },

    async confirmPaymentAction() {
      try {
        this.isLoading = true;
        const unpaidBillId = this.consumers
          .filter((item) => item.status !== "Paid")
          .map((item) => item._id);

        const data = {
          billId: unpaidBillId,
          consumerId: this.$route.params.id,
          totalBill: this.totalAmountPayable,
          amountPaid: this.cashAmount,
          change: this.changeAmount,
          paymentMethod: "Cash",
          collectionType: "Water Bill",
          paymentDate: new Date(),
        };

        await api.post("/collection", data);

        this.showSnackbar("Payment processed successfully!", "success");
        this.confirmDialog = false;
        this.onCompletePayment();
      } catch (error) {
        console.error("Payment processing error:", error);
        this.showSnackbar("Failed to process payment", "error");
      } finally {
        this.isLoading = false;
      }
    },

    formatAmount(amount) {
      return Number(amount).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    getMeterStatusColor(status) {
      const statusColors = {
        Normal: "success",
        Warning: "warning",
        Critical: "error",
        default: "grey",
      };
      return statusColors[status] || statusColors.default;
    },

    calculateChange() {
      this.changeAmount = Math.max(
        this.cashAmount - this.totalAmountPayable,
        0
      ).toFixed(2);
    },

    showSnackbar(text, color = "success") {
      this.snackbar = {
        show: true,
        text,
        color,
        icon: color === "success" ? "mdi-check-circle" : "mdi-alert-circle",
      };
    },

    openPaymentDialog() {
      this.showPaymentDialog = true;
    },

    async handlePaymentConfirm(paymentDetails) {
      try {
        this.isLoading = true;
        const unpaidBillId = this.consumers
          .filter((item) => item.status !== "Paid")
          .map((item) => item._id);

        const data = {
          billId: unpaidBillId,
          consumerId: this.$route.params.id,
          totalBill: this.statement.totalBill,
          amountPaid: paymentDetails.cashAmount,
          change: paymentDetails.changeAmount,
          paymentMethod: "Cash",
          collectionType: "Water Bill",
          paymentDate: new Date(),
        };

        await api.post("/collection", data);
        this.showSnackbar("Payment processed successfully!", "success");
        this.showPaymentDialog = false;
        this.onCompletePayment();
        await this.printReceipt(paymentDetails);
      } catch (error) {
        console.error("Payment processing error:", error);
        this.showSnackbar("Failed to process payment", "error");
      } finally {
        this.isLoading = false;
      }
    },

    async printReceipt(paymentDetails) {
      try {
        // Initialize printer if not connected
        const isPrinterReady = await this.initializePrinter();
        if (!isPrinterReady) {
          throw new Error("Printer not ready");
        }

        // ESC/POS Commands
        const ESC = "\x1B";
        const LF = "\x0A";
        const ALIGN_CENTER = `${ESC}a1`;
        const ALIGN_LEFT = `${ESC}a0`;
        const EMPHASIZE_ON = `${ESC}E1`;
        const EMPHASIZE_OFF = `${ESC}E0`;
        const INIT = `${ESC}@`;
        const CUT = `${ESC}m`;
        const PESO = "\x50";

        // Format receipt content
        const receiptContent = [
          INIT,
          ALIGN_CENTER,
          EMPHASIZE_ON,
          "WATER DISTRICT\n",
          EMPHASIZE_OFF,
          "Official Receipt\n",
          `OR No: ${Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0")}\n`,
          `Date: ${new Date().toLocaleDateString("en-PH")}\n`,
          `Time: ${new Date().toLocaleTimeString("en-PH")}\n\n`,

          ALIGN_LEFT,
          `Account No: ${this.currentBilling.consumerId.accountNo}\n`,
          `Name: ${this.currentBilling.name}\n`,
          `Address: ${this.currentBilling.consumerId.address}\n`,
          `Purok: ${this.currentBilling.consumerId.purok}\n\n`,

          "--------------------------------\n",

          `Period: ${moment(this.currentBilling.previousDate).format(
            "MM/DD/YYYY"
          )} - \n`,
          `       ${moment(this.currentBilling.presentDate).format(
            "MM/DD/YYYY"
          )}\n`,
          `Previous: ${this.currentBilling.previousRead}\n`,
          `Present: ${this.currentBilling.presentRead}\n`,
          `Consumption: ${this.currentBilling.consumption} cu.m\n`,

          "--------------------------------\n",

          `Current Bill:      ${PESO}${this.formatAmount(
            this.statement.presentBill
          )}\n`,
          `Previous Balance:  ${PESO}${this.formatAmount(
            this.statement.previousBalance
          )}\n`,
          EMPHASIZE_ON,
          `Total Amount:      ${PESO}${this.formatAmount(
            this.statement.totalBill
          )}\n`,
          EMPHASIZE_OFF,
          `Cash Payment:      ${PESO}${this.formatAmount(
            paymentDetails.cashAmount
          )}\n`,
          `Change:           ${PESO}${this.formatAmount(
            paymentDetails.changeAmount
          )}\n\n`,

          "--------------------------------\n",

          ALIGN_CENTER,
          `Next Due Date: ${moment(this.currentBilling.dueDate).format(
            "MM/DD/YYYY"
          )}\n`,
          "Thank you for your payment!\n\n",
          "Cashier: _________________\n\n",
          "This serves as your Official Receipt\n",

          LF + LF + LF,
          CUT,
        ].join("");

        // Convert text to bytes
        const encoder = new TextEncoder();
        const data = encoder.encode(receiptContent);

        // Send data in chunks
        const CHUNK_SIZE = 50;
        for (let i = 0; i < data.length; i += CHUNK_SIZE) {
          const chunk = data.slice(i, i + CHUNK_SIZE);
          await this.printer.characteristic.writeValue(chunk);
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        this.showSnackbar("Receipt printed successfully", "success");
      } catch (error) {
        console.error("Print error:", error);
        this.showPrintError(error);
      }
    },

    showPrintError(error) {
      let message = "Failed to print receipt: ";
      if (!navigator.bluetooth) {
        message = "Bluetooth not supported in this browser";
      } else if (error.name === "NotFoundError") {
        message = "No compatible printer found";
      } else if (error.name === "NetworkError") {
        message = "Printer connection failed";
      } else if (error.message === "Printer not ready") {
        message = "Please connect a printer first";
      } else {
        message += error.message;
      }
      this.showSnackbar(message, "error");
    },

    // Add a method to manually disconnect the printer if needed
    async disconnectPrinter() {
      if (this.printer.device && this.printer.isConnected) {
        await this.printer.device.gatt.disconnect();
        this.printer.isConnected = false;
        this.printer.characteristic = null;
      }
    },

    // printReceipt(paymentDetails) {
    //   console.log(paymentDetails)
    //   const receipt = this.generateReceiptContent(paymentDetails);
    //   const printWindow = window.open("", "_blank");
    //   printWindow.document.write(receipt);
    //   printWindow.document.close();
    //   printWindow.print();
    //   printWindow.close();
    // },

    //   generateReceiptContent(paymentDetails) {
    //     const today = new Date().toLocaleDateString("en-PH");
    //     const time = new Date().toLocaleTimeString("en-PH");
    //     const orNumber = Math.floor(Math.random() * 1000000)
    //       .toString()
    //       .padStart(6, "0");

    //     return `
    //   <html>
    //   <head>
    //     <style>
    //       body {
    //         font-family: Arial, sans-serif;
    //         width: 300px;
    //         margin: 0 auto;
    //         padding: 20px;
    //         font-size: 12px;
    //       }
    //       .header { text-align: center; margin-bottom: 20px; }
    //       .details { margin-bottom: 15px; }
    //       .amount { font-weight: bold; }
    //       .footer { text-align: center; margin-top: 20px; font-size: 12px; }
    //       .divider { border-top: 1px dashed #000; margin: 10px 0; }
    //       .text-right { text-align: right; }
    //       .text-center { text-align: center; }
    //       .bold { font-weight: bold; }
    //     </style>
    //   </head>
    //   <body>
    //     <div class="header">
    //       <h2 style="margin: 0;">WATER DISTRICT</h2>
    //       <p style="margin: 5px 0;">Official Receipt</p>
    //       <p style="margin: 5px 0;">OR No: ${orNumber}</p>
    //       <p style="margin: 5px 0;">Date: ${today}<br>Time: ${time}</p>
    //     </div>

    //     <div class="details">
    //       <p style="margin: 5px 0;">Account No: ${
    //         this.currentBilling.consumerId.accountNo
    //       }</p>
    //       <p style="margin: 5px 0;">Name: ${this.currentBilling.name}</p>
    //       <p style="margin: 5px 0;">Address: ${
    //         this.currentBilling.consumerId.address
    //       }</p>
    //       <p style="margin: 5px 0;">Purok: ${
    //         this.currentBilling.consumerId.purok
    //       }</p>
    //     </div>

    //     <div class="divider"></div>

    //     <div class="details">
    //       <p style="margin: 5px 0;">Period: ${moment(
    //         this.currentBilling.previousDate
    //       ).format("MM/DD/YYYY")} - ${moment(
    //       this.currentBilling.presentDate
    //     ).format("MM/DD/YYYY")}</p>
    //       <p style="margin: 5px 0;">Previous: ${
    //         this.currentBilling.previousRead
    //       }</p>
    //       <p style="margin: 5px 0;">Present: ${
    //         this.currentBilling.presentRead
    //       }</p>
    //       <p style="margin: 5px 0;">Consumption: ${
    //         this.currentBilling.consumption
    //       } cu.m</p>
    //     </div>

    //     <div class="divider"></div>

    //     <div class="details">
    //       <table style="width: 100%;">
    //         <tr>
    //           <td>Current Bill:</td>
    //           <td class="text-right">₱${this.formatAmount(
    //             this.statement.presentBill
    //           )}</td>
    //         </tr>
    //         <tr>
    //           <td>Previous Balance:</td>
    //           <td class="text-right">₱${this.formatAmount(
    //             this.statement.previousBalance
    //           )}</td>
    //         </tr>
    //         <tr>
    //           <td class="bold">Total Amount:</td>
    //           <td class="text-right bold">₱${this.formatAmount(
    //             this.statement.totalBill
    //           )}</td>
    //         </tr>
    //         <tr>
    //           <td>Cash Payment:</td>
    //           <td class="text-right">₱${this.formatAmount(
    //             paymentDetails.cashAmount
    //           )}</td>
    //         </tr>
    //         <tr>
    //           <td>Change:</td>
    //           <td class="text-right">₱${this.formatAmount(
    //             paymentDetails.changeAmount
    //           )}</td>
    //         </tr>
    //       </table>
    //     </div>

    //     <div class="divider"></div>

    //     <div class="footer">
    //       <p style="margin: 5px 0;">Next Due Date: ${moment(
    //         this.currentBilling.dueDate
    //       ).format("MM/DD/YYYY")}</p>
    //       <p style="margin: 5px 0;">Thank you for your payment!</p>
    //       <p style="margin: 15px 0 5px;">Cashier: _________________</p>
    //       <p style="margin: 5px 0; font-size: 10px;">This serves as your Official Receipt</p>
    //     </div>
    //   </body>
    //   </html>
    // `;
    //   },

    onCompletePayment() {
      this.$router.push({ name: "billings" });
    },
  },

  created() {
    this.fetch();
    this.initializePrinter;
  },
};
</script>

<style scoped>
.billing-card {
  border-radius: 8px;
}

.info-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  height: 100%;
  border: 1px solid #e9ecef;
}

.metric-card {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  height: 100%;
}

.metric-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

.charge-item {
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  height: 100%;
}

.billing-history-card {
  border-radius: 8px;
}

.pay-button {
  text-transform: none;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

.v-timeline-item__body {
  padding: 12px !important;
}

.v-timeline::before {
  background-color: #e9ecef;
}

.summary-card,
.payment-card {
  border-radius: 8px;
  height: 100%;
}

/* Hover effects */
.v-btn:not(.v-btn--disabled) {
  transition: transform 0.2s;
}

.v-btn:not(.v-btn--disabled):hover {
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .charge-item {
    margin-bottom: 16px;
  }

  .info-card {
    margin-bottom: 16px;
  }
}

.payment-action-card {
  border-radius: 8px;
  transition: transform 0.2s;
}

.payment-action-card:hover {
  transform: translateY(-2px);
}

.header-pay-button {
  text-transform: none;
  letter-spacing: 0.5px;
  border-width: 2px;
}

.header-pay-button:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

/* For mobile responsiveness */
@media (max-width: 600px) {
  .headline {
    flex-direction: column;
    align-items: stretch !important;
  }

  .header-pay-button {
    margin-top: 12px;
    width: 100%;
  }
}
</style>
