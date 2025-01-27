<template>
  <v-container>
    <v-card elevation="2">
      <v-card-title class="d-flex align-center py-3 px-4">
        <h2 class="text-h5 font-weight-bold mb-0">Billings Management</h2>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-divider></v-divider>

      <v-data-table
        :items="consumers"
        :headers="headers"
        :search="search"
        :items-per-page="15"
        :loading="loading"
        :footer-props="{
          'items-per-page-options': [15, 20, 25, 50, -1],
          'items-per-page-text': 'Rows per page',
          'show-first-last-page': true,
        }"
        class="elevation-0"
      >
        <template v-slot:top>
          <v-toolbar flat class="px-4 d-flex justify-end">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search billings..."
              hide-details
              dense
              outlined
              rounded
              class="mt-6"
              clearable
              @click:clear="search = ''"
            ></v-text-field>
          </v-toolbar>
        </template>

          <template v-slot:[`item.select`]="{ item }">
            <v-btn small color="primary" @click="onViewItem(item)">
              Select
            </v-btn>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              icon
              small
              color="success"
              class="mr-2"
              @click="onPrintItem(item)"
            >
              <v-icon small>mdi-printer</v-icon>
            </v-btn>
            <v-btn icon small color="error">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      top
    >
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
import api from "@/services/api";
import Handlebars from "handlebars";
import moment from "moment";

export default {
  name: "BillingsPage",

  data() {
    return {
      consumers: [],
      search: "",
      loading: false,
      headers: [
        { text: "Select", value: "select", sortable: false },
        { text: "Account No", value: "accountNo" },
        { text: "Last Name", value: "lastName" },
        { text: "First Name", value: "firstName" },
        { text: "Middle Name", value: "middleName" },
        { text: "Address", value: "address" },
        { text: "Purok", value: "purok" },
        { text: "Contact No", value: "contactNo" },
        { text: "Actions", value: "actions", sortable: false, align: "right" },
      ],
      snackbar: {
        show: false,
        text: "",
        color: "",
      },
    };
  },

  methods: {
    showSnackbar(text, color = "success") {
      this.snackbar = {
        show: true,
        text,
        color,
      };
    },

    async fetchConsumers() {
      this.loading = true;
      try {
        const response = await api.get("/consumer");
        this.consumers = response.data;
      } catch (error) {
        this.showSnackbar(
          error.response?.data?.message || "Failed to fetch consumers",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },

    onViewItem(item) {
      this.$router.push(`/admin/billings/${item._id}/view`);
    },

    async onPrintItem(item) {
      try {
        const response = await api.get(`/billing/consumer/all/${item._id}`);

        if (!response.data.length) {
          this.showSnackbar("No billing records found to print", "warning");
          return;
        }

        const billingStatement = this.generateBillingStatement(response.data);

        const templateResponse = await api.get("/billing/template/html");

        const templateData = {
          name: `${item.lastName}, ${item.firstName}`.toUpperCase(),
          billingDate: moment(response.data[0].billingDate).format(
            "YYYY-MM-DD"
          ),
          dueDate: moment(response.data[0].dueDate).format("YYYY-MM-DD"),
          ...billingStatement,
          previousDate: moment(billingStatement.previousDate).format(
            "YYYY-MM-DD"
          ),
          presentDate: moment(billingStatement.presentDate).format(
            "YYYY-MM-DD"
          ),
        };

        const template = Handlebars.compile(templateResponse.data);
        const compiledHtml = template(templateData);

        const iframe = document.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "none";
        iframe.srcdoc = compiledHtml;

        document.body.appendChild(iframe);
        iframe.contentWindow.focus();
        iframe.contentWindow.print();

        iframe.onload = () => {
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        };
      } catch (error) {
        this.showSnackbar(
          error.response?.data?.message ||
            "Failed to generate billing statement",
          "error"
        );
      }
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
  },

  created() {
    this.fetchConsumers();
  },
};
</script>
