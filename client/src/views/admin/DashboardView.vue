<template>
  <v-container fluid>
    <!-- Enhanced Loading Overlay -->
    <v-overlay :value="loading" class="d-flex align-center justify-center">
      <v-card class="pa-4" elevation="0" color="transparent">
        <v-progress-circular
          indeterminate
          size="64"
          color="primary"
        ></v-progress-circular>
        <div class="mt-4 white--text">Loading dashboard data...</div>
      </v-card>
    </v-overlay>

    <!-- Summary Cards with Improved Design -->
    <v-row>
      <v-col
        v-for="(card, index) in summaryCards"
        :key="index"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          :loading="loading"
          hover
          elevation="2"
          :color="card.color"
          class="rounded-lg fill-height"
        >
          <v-card-text class="d-flex flex-column h-100">
            <div class="d-flex flex-column h-100">
              <div
                class="text-overline mb-2"
                :class="card.isDark ? 'white--text' : 'grey--text'"
              >
                {{ card.title }}
              </div>
              <div
                class="text-h4 mb-2 flex-grow-1"
                :class="[card.valueClass, card.isDark ? 'white--text' : '']"
              >
                {{ card.value }}
              </div>
              <div
                v-if="card.stats"
                class="text-caption d-flex justify-space-between"
                :class="card.isDark ? 'white--text' : 'grey--text'"
              >
                <span v-for="(stat, idx) in card.stats" :key="idx">
                  {{ stat.label }}: {{ stat.value }}
                </span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Enhanced Charts Section -->
    <v-row class="mt-6">
      <v-col cols="12" md="8">
        <v-card class="rounded-lg" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon left color="primary">mdi-chart-line</v-icon>
            Collections Trend
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="chartPeriod" mandatory dense>
              <v-btn small value="month">Month</v-btn>
              <v-btn small value="quarter">Quarter</v-btn>
              <v-btn small value="year">Year</v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-4">
            <canvas ref="collectionsChart" height="300"></canvas>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="rounded-lg" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon left color="primary">mdi-chart-donut</v-icon>
            Billing Status
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-4">
            <canvas ref="billingChart" height="300"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Enhanced Expenses Summary -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="rounded-lg" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon left color="primary">mdi-currency-php</v-icon>
            Expenses Summary
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search expenses"
              single-line
              hide-details
              dense
              outlined
              class="ml-4"
              style="max-width: 300px"
            ></v-text-field>
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :headers="expenseHeaders"
            :items="expenseStats"
            :search="search"
            :loading="loading"
            dense
            class="elevation-0"
          >
            <template v-slot:item.totalAmount="{ item }">
              ₱{{ formatNumber(item.totalAmount) }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js";
import api from "@/services/api";

export default {
  name: "Dashboard",

  data: () => ({
    loading: true,
    search: "",
    chartPeriod: "month",
    dashboardData: {},
    collectionsData: [],
    billingStats: [],
    expenseStats: [],
    collectionsChart: null,
    billingChart: null,
    expenseHeaders: [
      { text: "Type", value: "_id" },
      { text: "Count", value: "count" },
      { text: "Total Amount", value: "totalAmount" },
    ],
  }),

  computed: {
    summaryCards() {
      return [
        {
          title: "TOTAL CONSUMERS",
          value: this.dashboardData.consumers?.total || 0,
          color: "#1E88E5", // Blue
          isDark: true,
          stats: [
            {
              label: "Active",
              value: this.dashboardData.consumers?.active || 0,
            },
            {
              label: "Inactive",
              value: this.dashboardData.consumers?.inactive || 0,
            },
          ],
        },
        {
          title: "MONTHLY BILLING",
          value: `₱${this.formatNumber(
            this.dashboardData.billing?.monthlyBilled
          )}`,
          color: "#43A047", // Green
          isDark: true,
          stats: [
            {
              label: "Unpaid",
              value: this.dashboardData.billing?.unpaidCount || 0,
            },
            {
              label: "Overdue",
              value: this.dashboardData.billing?.overdueCount || 0,
            },
          ],
        },
        {
          title: "MONTHLY COLLECTIONS",
          value: `₱${this.formatNumber(
            this.dashboardData.collections?.monthlyCollected
          )}`,
          color: "#FB8C00", // Orange
          isDark: true,
        },
        {
          title: "NET CASHFLOW",
          value: `₱${this.formatNumber(
            this.dashboardData.cashflow?.monthlyNet
          )}`,
          color:
            this.dashboardData.cashflow?.monthlyNet >= 0
              ? "#43A047"
              : "#E53935", // Green or Red
          isDark: true,
          valueClass:
            this.dashboardData.cashflow?.monthlyNet >= 0
              ? "white--text"
              : "white--text",
          stats: [
            {
              label: "Expenses",
              value: `₱${this.formatNumber(
                this.dashboardData.expenses?.monthlyExpenses
              )}`,
            },
          ],
        },
      ];
    },
  },

  watch: {
    chartPeriod() {
      this.fetchDashboardData();
    },
  },
  methods: {
    formatNumber(value) {
      return new Intl.NumberFormat().format(value || 0);
    },

    async fetchDashboardData() {
      try {
        const [summary, collections, billing, expenses] = await Promise.all([
          api.get("/dashboard/summary"),
          api.get("/dashboard/collections/trends"),
          api.get("/dashboard/billing/stats"),
          api.get("/dashboard/expenses/summary"),
        ]);

        this.dashboardData = summary.data;
        this.collectionsData = collections.data;
        this.billingStats = billing.data;
        this.expenseStats = expenses.data;

        this.initCharts();
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        this.loading = false;
      }
    },

    initCharts() {
      // Collections Trend Chart
      const collectionsCtx = this.$refs.collectionsChart.getContext("2d");
      this.collectionsChart = new Chart(collectionsCtx, {
        type: "line",
        data: {
          labels: this.collectionsData.map((item) => item._id),
          datasets: [
            {
              label: "Monthly Collections",
              data: this.collectionsData.map((item) => item.total),
              borderColor: "#1976D2",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      // Billing Status Chart
      const billingCtx = this.$refs.billingChart.getContext("2d");
      this.billingChart = new Chart(billingCtx, {
        type: "doughnut",
        data: {
          labels: this.billingStats.map((item) => item._id),
          datasets: [
            {
              data: this.billingStats.map((item) => item.totalAmount),
              backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },

  mounted() {
    this.fetchDashboardData();
  },

  beforeDestroy() {
    if (this.collectionsChart) {
      this.collectionsChart.destroy();
    }
    if (this.billingChart) {
      this.billingChart.destroy();
    }
  },
};
</script>

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-2px);
}

canvas {
  min-height: 300px;
}

.v-data-table ::v-deep .v-data-table__wrapper {
  overflow-x: auto;
}

.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-2px);
}

.fill-height {
  height: 100%;
}
</style>
