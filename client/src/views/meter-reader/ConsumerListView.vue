<template>
  <v-container fluid>
    <!-- Search Bar -->
    <v-card elevation="2" class="mb-4">
      <v-card-text>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search consumers..."
          hide-details
          dense
          outlined
          rounded
          clearable
        ></v-text-field>
      </v-card-text>
    </v-card>

    <!-- Consumer List -->
    <v-row>
      <v-col 
        v-for="consumer in filteredConsumers" 
        :key="consumer._id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="profile-card" elevation="2">
          <v-card-title class="text-subtitle-1 text-uppercase font-weight-bold primary white--text py-4">
            <v-icon left color="white">mdi-account</v-icon>
            {{ consumer.firstName }} {{ consumer.lastName }}
          </v-card-title>

          <v-card-text class="py-4">
            <div class="profile-field">
              <div class="text-subtitle-2 grey--text">Account No.</div>
              <div class="text-body-1">{{ consumer.accountNo }}</div>
            </div>

            <div class="profile-field mt-2">
              <div class="text-subtitle-2 grey--text">Address</div>
              <div class="text-body-1">{{ consumer.address }}, Purok {{ consumer.purok }}</div>
            </div>

            <div class="profile-field mt-2">
              <div class="text-subtitle-2 grey--text">Contact Number</div>
              <div class="text-body-1">{{ consumer.contactNo || 'No contact number' }}</div>
            </div>

            <div class="profile-field mt-2">
              <div class="text-subtitle-2 grey--text">Status</div>
              <v-chip
                :color="consumer.isActive ? 'success' : 'error'"
                label
                small
                class="mt-1"
              >
                <v-icon left small>
                  {{ consumer.isActive ? "mdi-check-circle" : "mdi-alert-circle" }}
                </v-icon>
                {{ consumer.isActive ? "Active" : "Inactive" }}
              </v-chip>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onShowDialog(consumer)"
              :disabled="!consumer.isActive"
            >
              <v-icon left>mdi-plus</v-icon>
              Add Reading
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Billing Dialog -->
    <consumer-billing-dialog
      ref="billing"
      v-model="showDialog"
      @update:billings="fetchConsumers"
      :billing-data="selectedBilling"
      :update="false"
    />

    <!-- Loading Overlay -->
    <v-overlay :value="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>

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

export default {
  name: 'ConsumerListView',
  
  components: {
    ConsumerBillingDialog
  },

  data() {
    return {
      search: '',
      consumers: [],
      loading: false,
      showDialog: false,
      showError: false,
      errorMessage: '',
      selectedBilling: {},
      selectedConsumer: null
    }
  },

  computed: {
    filteredConsumers() {
      if (!this.search) return this.consumers;
      
      const searchTerm = this.search.toLowerCase();
      return this.consumers.filter(consumer => 
        consumer.firstName.toLowerCase().includes(searchTerm) ||
        consumer.lastName.toLowerCase().includes(searchTerm) ||
        consumer.accountNo.toLowerCase().includes(searchTerm) ||
        consumer.address.toLowerCase().includes(searchTerm)
      );
    }
  },

  methods: {
    async fetchConsumers() {
      this.loading = true;
      try {
        const response = await api.get('/consumer');
        this.consumers = response.data;
      } catch (error) {
        this.errorMessage = error.message || 'Failed to fetch consumers';
        this.showError = true;
      } finally {
        this.loading = false;
      }
    },

    onShowDialog(consumer) {
      this.selectedConsumer = consumer;
      this.selectedBilling = JSON.parse(JSON.stringify(consumer));
      this.showDialog = true;
      this.$nextTick(() => {
        if (this.$refs.billing) {
          this.$refs.billing.getItem();
        }
      });
    }
  },

  created() {
    this.fetchConsumers();
  }
}
</script>

<style scoped>
.profile-card {
  border-radius: 8px;
  overflow: hidden;
}

.profile-field {
  padding: 8px 0;
}

.v-card {
  border-radius: 8px;
}

.text-h4 {
  font-weight: 600;
  line-height: 1.2;
}

.v-btn {
  text-transform: none;
  letter-spacing: 0.5px;
}

.v-chip {
  font-weight: 500;
}
</style>