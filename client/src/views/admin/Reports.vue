<template>
  <v-container fluid>
    <v-card>
      <v-card-title
        class="d-flex align-center pa-4 primary lighten-1 white--text"
      >
        <v-icon large class="mr-2 white--text">mdi-chart-box</v-icon>
        <span class="text-h5">Reports Dashboard</span>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-2"
          color="white"
          @click="exportToExcel"
          :loading="loadingExcel"
        >
          <v-icon left>mdi-microsoft-excel</v-icon>
          Export Excel
        </v-btn>
        <v-btn color="white" @click="generatePDF" :loading="loadingPDF">
          <v-icon left>mdi-file-pdf</v-icon>
          Export PDF
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-tabs v-model="activeTab" background-color="primary" dark>
          <v-tab>Collections</v-tab>
          <v-tab>Consumption</v-tab>
          <v-tab>Overdue</v-tab>
          <v-tab>Revenue/Expense</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <!-- Date Range Filter -->
          <v-row class="mt-4">
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateRangeText"
                    label="Date Range"
                    persistent-hint
                    outlined
                    dense
                    readonly
                    v-on="on"
                    prepend-icon="mdi-calendar-range"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateRange" range no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dateMenu = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="applyDateRange"
                    >Apply</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col
              cols="12"
              sm="6"
              md="3"
              v-for="(stat, index) in summaryStats"
              :key="index"
            >
              <v-card outlined hover class="summary-card">
                <v-card-text>
                  <div class="d-flex align-center">
                    <v-icon large :color="stat.color" class="mr-3">{{
                      stat.icon
                    }}</v-icon>
                    <div>
                      <div class="text-overline mb-1">{{ stat.label }}</div>
                      <div class="text-h5">{{ stat.value }}</div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-card outlined class="mt-4">
            <v-data-table
              :headers="currentHeaders"
              :items="tableData"
              :loading="loading"
              :items-per-page="10"
              :search="search"
              :footer-props="{
                'items-per-page-options': [10, 25, 50],
                showFirstLastPage: true,
              }"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    class="mx-4"
                  ></v-text-field>
                </v-toolbar>
              </template>

              <template v-slot:item.amount="{ item }">
                ₱{{ formatNumber(item.amount) }}
              </template>

              <template v-slot:item.consumption="{ item }">
                {{ item.consumption }} m³
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip :color="getStatusColor(item.status)" small label>
                  {{ item.status }}
                </v-chip>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn small text color="primary" @click="viewDetails(item)">
                  <v-icon small class="mr-1">mdi-eye</v-icon>
                  Details
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-tabs-items>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">
          {{ detailsTitle }}
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-list dense>
            <v-list-item v-for="(value, key) in selectedDetails" :key="key">
              <v-list-item-content>
                <v-list-item-subtitle>{{
                  formatLabel(key)
                }}</v-list-item-subtitle>
                <v-list-item-title>{{
                  formatDetailValue(key, value)
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
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
import { format } from "date-fns";
import { saveAs } from "file-saver";

export default {
  name: "Reports",

  data() {
    return {
      activeTab: 0,
      loading: false,
      loadingPDF: false,
      loadingExcel: false,
      dateMenu: false,
      dialog: false,
      search: "",
      dateRange: [
        format(new Date().setDate(1), "yyyy-MM-dd"),
        format(new Date(), "yyyy-MM-dd"),
      ],
      selectedDetails: null,
      snackbar: {
        show: false,
        text: "",
        color: "success",
      },

      // Report Data
      tableData: [],
      reportSummary: {},

      // Table Headers Configuration
      headers: {
        collections: [
          { text: "Date", value: "paymentDate" },
          { text: "Account No", value: "consumerId.accountNo" },
          { text: "Consumer Name", value: "consumerName" },
          { text: "Amount", value: "amountPaid", align: "right" },
          { text: "Payment Method", value: "paymentMethod" },
          // { text: "Status", value: "status" },
          { text: "Actions", value: "actions", sortable: false },
        ],
        consumption: [
          { text: "Account No", value: "accountNo" },
          { text: "Consumer Name", value: "consumerName" },
          { text: "Previous Reading", value: "previousRead" },
          { text: "Present Reading", value: "presentRead" },
          { text: "Consumption (m³)", value: "consumption" },
          { text: "Actions", value: "actions", sortable: false },
        ],
        overdue: [
          { text: "Account No", value: "accountNo" },
          { text: "Consumer Name", value: "consumerName" },
          { text: "Due Date", value: "dueDate" },
          { text: "Amount Due", value: "amount", align: "right" },
          { text: "Days Overdue", value: "daysPastDue" },
          { text: "Actions", value: "actions", sortable: false },
        ],
        revenue: [
          { text: "Date", value: "date" },
          { text: "Type", value: "type" },
          { text: "Description", value: "description" },
          { text: "Amount", value: "amount", align: "right" },
          { text: "Actions", value: "actions", sortable: false },
        ],
      },
    };
  },

  computed: {
    dateRangeText() {
      return this.dateRange.length === 2
        ? `${format(new Date(this.dateRange[0]), "MMM dd, yyyy")} - ${format(
            new Date(this.dateRange[1]),
            "MMM dd, yyyy"
          )}`
        : "";
    },

    currentHeaders() {
      const reportTypes = ["collections", "consumption", "overdue", "revenue"];
      return this.headers[reportTypes[this.activeTab]] || [];
    },

    reportType() {
      const types = ["collections", "consumption", "overdue", "revenue"];
      return types[this.activeTab];
    },

    summaryStats() {
      const stats = {
        collections: [
          {
            label: "Total Collections",
            value: `₱${this.formatNumber(this.reportSummary.totalAmount || 0)}`,
            icon: "mdi-cash-multiple",
            color: "success",
          },
          {
            label: "Total Transactions",
            value: this.reportSummary.totalTransactions || 0,
            icon: "mdi-receipt",
            color: "primary",
          },
        ],
        consumption: [
          {
            label: "Total Consumption",
            value: `${this.formatNumber(
              this.reportSummary.totalConsumption || 0
            )} m³`,
            icon: "mdi-water",
            color: "info",
          },
          {
            label: "Average Consumption",
            value: `${this.formatNumber(
              this.reportSummary.averageConsumption || 0
            )} m³`,
            icon: "mdi-chart-line",
            color: "primary",
          },
        ],
      };

      return stats[this.reportType] || [];
    },

    detailsTitle() {
      return `${
        this.reportType.charAt(0).toUpperCase() + this.reportType.slice(1)
      } Details`;
    },
  },

  watch: {
    activeTab() {
      this.fetchData();
    },
    dateRange() {
      if (this.dateRange.length === 2) {
        this.fetchData();
      }
    },
  },

  methods: {
    async fetchData() {
      if (!this.dateRange.length === 2) return;

      this.loading = true;
      try {
        const [startDate, endDate] = this.dateRange;
        const response = await api.get("/report", {
          params: {
            startDate,
            endDate,
            reportType: this.reportType,
          },
        });

        console.log(response);

        this.tableData = response.data.data.items;
        this.reportSummary = response.data.data.summary;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.showNotification("Error fetching report data", "error");
      }
      this.loading = false;
    },

    formatNumber(number) {
      return Number(number).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    formatDate(date) {
      return format(new Date(date), "MMM dd, yyyy");
    },

    getStatusColor(status) {
      const colors = {
        Paid: "success",
        Pending: "warning",
        Overdue: "error",
        Active: "success",
        Inactive: "error",
      };
      return colors[status] || "grey";
    },

    formatLabel(key) {
      return (
        key
          .split(/(?=[A-Z])/)
          .join(" ")
          .charAt(0)
          .toUpperCase() +
        key
          .split(/(?=[A-Z])/)
          .join(" ")
          .slice(1)
      );
    },

    formatDetailValue(key, value) {
      if (typeof value === "number") {
        return key.toLowerCase().includes("amount")
          ? `₱${this.formatNumber(value)}`
          : value;
      }
      if (key.toLowerCase().includes("date")) {
        return this.formatDate(value);
      }
      return value;
    },

    viewDetails(item) {
      this.selectedDetails = item;
      this.dialog = true;
    },

    showNotification(text, color = "success") {
      this.snackbar = {
        show: true,
        text,
        color,
      };
    },

    async generatePDF() {
      this.loadingPDF = true;
      try {
        const response = await api.post(
          "/report/generate-pdf",
          {
            reportType: this.reportType,
            dateRange: this.dateRange,
            data: this.tableData,
            summary: this.reportSummary,
          },
          { responseType: "blob" }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        saveAs(blob, `${this.reportType}-report.pdf`);
        this.showNotification("PDF generated successfully");
      } catch (error) {
        console.error("Error generating PDF:", error);
        this.showNotification("Error generating PDF", "error");
      }
      this.loadingPDF = false;
    },

    async exportToExcel() {
      this.loadingExcel = true;
      try {
        const response = await api.post(
          "/report/export-excel",
          {
            reportType: this.reportType,
            data: this.tableData,
            summary: this.reportSummary,
          },
          { responseType: "blob" }
        );

        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `${this.reportType}-report.xlsx`);
        this.showNotification("Excel file generated successfully");
      } catch (error) {
        console.error("Error generating Excel:", error);
        this.showNotification("Error generating Excel file", "error");
      }
      this.loadingExcel = false;
    },

    applyDateRange() {
      this.dateMenu = false;
      this.fetchData();
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.v-card__text {
  padding-top: 20px;
}

.summary-card {
  transition: all 0.3s;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
