<!-- src/views/Reports.vue -->
<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="headline">
        Reports Dashboard
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="generatePDF" :loading="loadingPDF">
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
          <!-- Collections Tab -->
          <v-tab-item>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="dateFilter"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFilter"
                      label="Month and Year"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateFilter"
                    type="month"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(dateFilter)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-data-table
              :headers="collectionHeaders"
              :items="collections"
              :loading="loading"
              :items-per-page="10"
              class="elevation-1"
            >
              <template v-slot:item.paymentDate="{ item }">
                {{ formatDate(item.paymentDate) }}
              </template>
              <template v-slot:item.amountPaid="{ item }">
                ₱{{ formatNumber(item.amountPaid) }}
              </template>
            </v-data-table>

            <v-card class="mt-4" outlined>
              <v-card-text>
                <div class="text-h6">Summary</div>
                <div class="mt-2">Total Collections: ₱{{ formatNumber(totalCollection) }}</div>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Consumption Tab -->
          <v-tab-item>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  v-model="dateRangeMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateRangeText"
                      label="Date Range"
                      prepend-icon="mdi-calendar-range"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dateRange" range></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-data-table
              :headers="consumptionHeaders"
              :items="consumptionData"
              :loading="loading"
              :items-per-page="10"
              class="elevation-1 mt-4"
            >
              <template v-slot:item.consumption="{ item }">
                {{ item.consumption }} m³
              </template>
            </v-data-table>

            <v-card class="mt-4" outlined>
              <v-card-text>
                <div class="text-h6">Consumption Summary</div>
                <div class="mt-2">Total Consumption: {{ totalConsumption }} m³</div>
                <div>Average Consumption: {{ averageConsumption }} m³</div>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Overdue Tab -->
          <v-tab-item>
            <v-data-table
              :headers="overdueHeaders"
              :items="overdueAccounts"
              :loading="loading"
              :items-per-page="10"
              class="elevation-1"
            >
              <template v-slot:item.totalBill="{ item }">
                ₱{{ formatNumber(item.totalBill) }}
              </template>
              <template v-slot:item.dueDate="{ item }">
                {{ formatDate(item.dueDate) }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  small
                  color="primary"
                  @click="showConsumerDetails(item)"
                >
                  View Details
                </v-btn>
              </template>
            </v-data-table>
          </v-tab-item>

          <!-- Revenue/Expense Tab -->
          <v-tab-item>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  v-model="revenueMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="revenueMonth"
                      label="Select Month"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="revenueMonth"
                    type="month"
                    @input="revenueMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-card outlined>
                  <v-card-text>
                    <div class="text-h6">Revenue Summary</div>
                    <div class="mt-2">Total Revenue: ₱{{ formatNumber(totalRevenue) }}</div>
                    <div>Total Expenses: ₱{{ formatNumber(totalExpenses) }}</div>
                    <div>Net Income: ₱{{ formatNumber(netIncome) }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>

    <!-- Consumer Details Dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Consumer Details</v-card-title>
        <v-card-text v-if="selectedConsumer">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Account No</v-list-item-subtitle>
                <v-list-item-title>{{ selectedConsumer.accountNo }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Name</v-list-item-subtitle>
                <v-list-item-title>
                  {{ `${selectedConsumer.firstName} ${selectedConsumer.lastName}` }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Address</v-list-item-subtitle>
                <v-list-item-title>{{ selectedConsumer.address }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Reports",

  data() {
    return {
      activeTab: 0,
      loading: false,
      loadingPDF: false,
      menu: false,
      dateRangeMenu: false,
      revenueMenu: false,
      dialog: false,
      dateFilter: new Date().toISOString().substr(0, 7),
      dateRange: [],
      revenueMonth: new Date().toISOString().substr(0, 7),
      selectedConsumer: null,

      // Collection Data
      collections: [],
      totalCollection: 0,

      // Consumption Data
      consumptionData: [],
      totalConsumption: 0,
      averageConsumption: 0,

      // Overdue Data
      overdueAccounts: [],

      // Revenue/Expense Data
      totalRevenue: 0,
      totalExpenses: 0,
      netIncome: 0,

      // Table Headers
      collectionHeaders: [
        { text: "Date", value: "paymentDate" },
        { text: "Account No", value: "consumerId.accountNo" },
        { text: "Consumer Name", value: "consumerId.firstName" },
        { text: "Amount", value: "amountPaid", align: "right" },
        { text: "Payment Method", value: "paymentMethod" }
      ],
      consumptionHeaders: [
        { text: "Account No", value: "consumerId.accountNo" },
        { text: "Consumer Name", value: "consumerId.firstName" },
        { text: "Previous Reading", value: "previousRead" },
        { text: "Present Reading", value: "presentRead" },
        { text: "Consumption (m³)", value: "consumption" }
      ],
      overdueHeaders: [
        { text: "Account No", value: "consumerId.accountNo" },
        { text: "Consumer Name", value: "consumerId.firstName" },
        { text: "Due Date", value: "dueDate" },
        { text: "Amount Due", value: "totalBill", align: "right" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },

  computed: {
    dateRangeText() {
      return this.dateRange.join(" to ");
    }
  },

  watch: {
    activeTab() {
      this.fetchData();
    },
    dateFilter() {
      if (this.activeTab === 0) this.fetchCollections();
    },
    dateRange() {
      if (this.dateRange.length === 2) {
        this.fetchConsumption();
      }
    },
    revenueMonth() {
      if (this.activeTab === 3) this.fetchRevenue();
    }
  },

  methods: {
    async fetchData() {
      this.loading = true;
      try {
        switch (this.activeTab) {
          case 0:
            await this.fetchCollections();
            break;
          case 1:
            if (this.dateRange.length === 2) {
              await this.fetchConsumption();
            }
            break;
          case 2:
            await this.fetchOverdue();
            break;
          case 3:
            await this.fetchRevenue();
            break;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      this.loading = false;
    },

    async fetchCollections() {
      const [year, month] = this.dateFilter.split("-");
      const response = await api.get("/report/monthly-collection", {
        params: { month, year }
      });
      this.collections = response.data.collections;
      this.totalCollection = response.data.totalCollection;
    },

    async fetchConsumption() {
      const [startDate, endDate] = this.dateRange;
      const response = await api.get("/report/consumption", {
        params: { startDate, endDate }
      });
      this.consumptionData = response.data.billings;
      
      // Calculate consumption totals
      const total = this.consumptionData.reduce((sum, item) => sum + item.consumption, 0);
      this.totalConsumption = total;
      this.averageConsumption = this.consumptionData.length 
        ? (total / this.consumptionData.length).toFixed(2) 
        : 0;
    },

    async fetchOverdue() {
      const response = await api.get("/report/overdue-accounts");
      this.overdueAccounts = response.data.overdueBills;
    },

    async fetchRevenue() {
      const [year, month] = this.revenueMonth.split("-");
      const response = await api.get("/report/revenue-expense", {
        params: { month, year }
      });
      this.totalRevenue = response.data.totalRevenue;
      this.totalExpenses = response.data.totalExpenses;
      this.netIncome = response.data.netIncome;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    formatNumber(number) {
      return Number(number).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },

    showConsumerDetails(item) {
      this.selectedConsumer = item.consumerId;
      this.dialog = true;
    },

    async generatePDF() {
      this.loadingPDF = true;
      try {
        // Implement PDF generation here
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Success message
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
      this.loadingPDF = false;
    }
  },

  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.v-card__text {
  padding-top: 20px;
}
</style>