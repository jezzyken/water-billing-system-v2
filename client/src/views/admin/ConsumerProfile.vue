<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>

    <!-- Consumer Profile Card -->
    <v-card class="mb-6 profile-card" elevation="2">
      <v-card-title
        class="text-subtitle-1 text-uppercase font-weight-bold primary white--text py-4"
      >
        <v-icon left color="white">mdi-account</v-icon>
        Consumer Profile
      </v-card-title>

      <v-card-text class="py-4">
        <v-row>
          <v-col cols="12" sm="6">
            <div class="profile-field">
              <div class="text-subtitle-2 grey--text">Full Name</div>
              <div class="text-body-1 font-weight-medium">
                {{ consumerInfo.fullName }}
              </div>
            </div>

            <div class="profile-field mt-4">
              <div class="text-subtitle-2 grey--text">Address</div>
              <div class="text-body-1">{{ consumerInfo.fullAddress }}</div>
            </div>
          </v-col>

          <v-col cols="12" sm="6">
            <div class="profile-field">
              <div class="text-subtitle-2 grey--text">Contact Number</div>
              <div class="text-body-1">{{ consumerInfo.contactNo }}</div>
            </div>

            <div class="profile-field mt-4">
              <div class="text-subtitle-2 grey--text">Account Status</div>
              <v-chip
                :color="consumer.isActive ? 'success' : 'error'"
                label
                small
                class="mt-1"
              >
                <v-icon left small>
                  {{
                    consumer.isActive ? "mdi-check-circle" : "mdi-alert-circle"
                  }}
                </v-icon>
                {{ consumer.isActive ? "Active" : "Inactive" }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Summary Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="4">
        <v-card class="summary-card" height="100%">
          <v-card-text>
            <div class="d-flex flex-column justify-center align-center">
              <div class="text-overline mb-2">Total Consumption</div>
              <v-icon color="primary" size="36" class="mb-2">mdi-water</v-icon>
              <div class="text-h4 primary--text font-weight-bold">
                {{ totalConsumption }} m³
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card class="summary-card" height="100%">
          <v-card-text>
            <div class="d-flex flex-column justify-center align-center">
              <div class="text-overline mb-2">Outstanding Balance</div>
              <v-icon
                :color="outstandingBalance > 0 ? 'error' : 'success'"
                size="36"
                class="mb-2"
              >
                {{
                  outstandingBalance > 0 ? "mdi-cash-remove" : "mdi-cash-check"
                }}
              </v-icon>
              <div
                class="text-h4 font-weight-bold"
                :class="outstandingBalance > 0 ? 'red--text' : 'success--text'"
              >
                ₱{{ outstandingBalance.toFixed(2) }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card class="summary-card" height="100%">
          <v-card-text>
            <div class="d-flex flex-column justify-center align-center">
              <div class="text-overline mb-2">Last Payment</div>
              <v-icon color="primary" size="36" class="mb-2"
                >mdi-receipt</v-icon
              >
              <div class="text-h4 primary--text font-weight-bold">
                ₱{{ lastPayment ? lastPayment.totalBill.toFixed(2) : "0.00" }}
              </div>
              <div class="text-caption grey--text text--darken-1 mt-1">
                {{ formatLastPaymentDate() }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card elevation="2">
      <v-tabs v-model="tab" fixed-tabs background-color="primary" dark>
        <v-tab class="px-6">
          <v-icon left>mdi-file-document</v-icon>
          Consumption Records
        </v-tab>
        <v-tab class="px-6">
          <v-icon left>mdi-cash</v-icon>
          Payment History
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="pa-2">
        <!-- Consumption Records Tab -->
        <v-tab-item>
          <v-card flat>
            <v-card-title>
              <div class="text-h6">Billing Records</div>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="filter"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                outlined
                dense
                class="mx-4"
              ></v-text-field>
              <v-responsive class="d-flex">
                <v-btn
                  color="primary"
                  @click="onShowDialog"
                  :disabled="!consumer.isActive"
                  class="hidden-sm-and-down"
                >
                  <v-icon left>mdi-plus</v-icon>
                  Create Billing
                </v-btn>

                <v-btn
                  color="primary"
                  @click="onShowDialog"
                  :disabled="!consumer.isActive"
                  class="hidden-md-and-up fab-button"
                  fab
                  fixed
                  bottom
                  right
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-responsive>
            </v-card-title>

            <v-data-table
              :headers="billingHeaders"
              :items="consumers"
              :search="filter"
              :items-per-page="10"
              :loading="loading"
              loading-text="Loading billing records..."
            >
              <template v-slot:[`item.billingDate`]="{ item }">
                {{ formatDate(item.billingDate) }}
              </template>

              <template v-slot:[`item.consumption`]="{ item }">
                {{ item.consumption }} m³
              </template>

              <template v-slot:[`item.status`]="{ item }">
                <v-chip
                  :color="getStatusColor(item.status)"
                  small
                  label
                  text-color="white"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      small
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                      @click="onViewItem(item)"
                      class="mr-2"
                    >
                      <v-icon small>mdi-eye</v-icon>
                    </v-btn>
                  </template>
                  <span>View Details</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      small
                      color="error"
                      v-bind="attrs"
                      v-on="on"
                      @click="confirmDelete(item)"
                      :disabled="item.status === 'Paid'"
                    >
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Delete Record</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>

        <!-- Payment History Tab -->
        <v-tab-item>
          <v-card flat>
            <v-card-title>
              <div class="text-h6">Payment History</div>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="collectionFilter"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                outlined
                dense
              ></v-text-field>
            </v-card-title>

            <v-data-table
              :headers="collectionHeaders"
              :items="collections"
              :search="collectionFilter"
              :items-per-page="10"
              :loading="loading"
              loading-text="Loading payment history..."
            >
              <template v-slot:[`item.paymentDate`]="{ item }">
                {{ formatDateTime(item.paymentDate) }}
              </template>

              <template v-slot:[`item.totalBill`]="{ item }">
                ₱{{ formatAmount(item.totalBill) }}
              </template>

              <template v-slot:[`item.amountPaid`]="{ item }">
                ₱{{ formatAmount(item.amountPaid) }}
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <!-- Billing Dialog -->
    <consumer-billing-dialog
      ref="billing"
      v-model="showDialog"
      @update:billings="fetch"
      :billing-data="item"
      :update="update"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    />

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Delete Billing Record</v-card-title>
        <v-card-text>
          Are you sure you want to delete this billing record? This action
          cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="showDeleteDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="error" text @click="deleteRecord">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Error Snackbar -->
    <v-snackbar v-model="showError" color="error" timeout="3000">
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showError = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import api from "@/services/api";
import ConsumerBillingDialog from "@/components/ConsumerBillingDialog.vue";
import moment from "moment";

export default {
  name: "ConsumerView",

  components: {
    ConsumerBillingDialog,
  },

  data() {
    return {
      tab: 0,
      consumers: [],
      collections: [],
      filter: "",
      collectionFilter: "",
      showDialog: false,
      showDeleteDialog: false,
      showError: false,
      errorMessage: "",
      item: {},
      itemToDelete: null,
      update: false,
      consumer: {},
      loading: false,
      billingHeaders: [
        { text: "Billing Date", value: "billingDate" },
        { text: "Previous Read", value: "previousRead" },
        { text: "Present Read", value: "presentRead" },
        { text: "Consumption", value: "consumption" },
        { text: "Payment Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      collectionHeaders: [
        { text: "Payment Date", value: "paymentDate" },
        { text: "Total Bill", value: "totalBill" },
        { text: "Amount Paid", value: "amountPaid" },
        { text: "Payment Method", value: "paymentMethod" },
        { text: "Collection Type", value: "collectionType" },
      ],
    };
  },

  computed: {
    consumerInfo() {
      const fullName =
        `${this.consumer.firstName} ${this.consumer.middleName} ${this.consumer.lastName}`.toUpperCase();
      const fullAddress = `${this.consumer.purok} ${this.consumer.address}`;
      return {
        ...this.consumer,
        fullName,
        fullAddress,
      };
    },

    totalConsumption() {
      return this.consumers.reduce(
        (sum, billing) => sum + billing.consumption,
        0
      );
    },

    outstandingBalance() {
      return this.consumers
        .filter((billing) => billing.status !== "Paid")
        .reduce((sum, billing) => sum + billing.presentBill, 0);
    },

    lastPayment() {
      return this.collections.length > 0 ? this.collections[0] : null;
    },
  },

  methods: {
    async fetch() {
      this.loading = true;
      try {
        const consumerId = this.$route.params.id;

        const [consumerResponse, billingsResponse, collectionsResponse] =
          await Promise.all([
            api.get(`/consumer/${consumerId}`),
            api.get(`/billing/consumer/all/${consumerId}`),
            api.get(`/collection/consumer/${consumerId}`),
          ]);

        this.consumer = consumerResponse.data;
        this.consumers = billingsResponse.data;
        this.collections = Array.isArray(collectionsResponse.data)
          ? collectionsResponse.data
          : [];
      } catch (error) {
        console.error("Error fetching data:", error);
        this.errorMessage = "Failed to load consumer data. Please try again.";
        this.showError = true;
      } finally {
        this.loading = false;
      }
    },

    formatLastPaymentDate() {
      if (!this.lastPayment) return "No payments yet";
      return moment(this.lastPayment.paymentDate).format("MMM DD, YYYY");
    },

    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },

    formatDateTime(date) {
      return moment(date).format("YYYY-MM-DD hh:mm A");
    },

    formatAmount(amount) {
      return parseFloat(amount).toFixed(2);
    },

    getStatusColor(status) {
      return status === "Paid" ? "success" : "error";
    },

    onViewItem(item) {
      this.item = JSON.parse(JSON.stringify(item));
      this.update = true;
      this.showDialog = true;
    },

    onShowDialog() {
      this.item = {};
      this.update = false;
      this.showDialog = true;
      this.$refs.billing.getItem();
    },

    confirmDelete(item) {
      this.itemToDelete = item;
      this.showDeleteDialog = true;
    },

    async deleteRecord() {
      try {
        if (this.itemToDelete) {
          await api.delete(`/billing/${this.itemToDelete.id}`);
          await this.fetch();
          this.showDeleteDialog = false;
        }
      } catch (error) {
        console.error("Error deleting record:", error);
        this.errorMessage =
          "Failed to delete billing record. Please try again.";
        this.showError = true;
      }
    },
  },

  created() {
    this.fetch();
  },
};
</script>

<style scoped>
.profile-card {
  border-radius: 8px;
  overflow: hidden;
}

.profile-field {
  padding: 8px 0;
}

.summary-card {
  border-radius: 8px;
  transition: transform 0.2s;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.v-card {
  border-radius: 8px;
}

.v-data-table {
  border-radius: 8px;
}

.text-h4 {
  font-weight: 600;
  line-height: 1.2;
}

.text-overline {
  color: rgba(0, 0, 0, 0.6);
  letter-spacing: 2px;
}

.v-btn {
  text-transform: none;
  letter-spacing: 0.5px;
}

.v-tab {
  text-transform: none;
  letter-spacing: 0.5px;
}

.v-chip {
  font-weight: 500;
}

.v-data-table ::v-deep .v-data-table__wrapper {
  border-radius: 8px;
}

.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0;
}

.fab-button {
  z-index: 4;
  margin-bottom: 16px;
  margin-right: 16px;
}

.v-btn.fab-button {
  transition: transform 0.2s;
}

.v-btn.fab-button:active {
  transform: scale(0.95);
}
</style>
