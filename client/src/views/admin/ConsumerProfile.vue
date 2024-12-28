<template>
  <div class="meter-reader-app">
    <!-- Top App Bar -->
    <v-app-bar fixed dense color="primary" dark>
      <v-toolbar-title class="text-subtitle-1">Meter Reading</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip small color="success" class="mr-2">
        <v-icon left small>mdi-account</v-icon>
        John Reader
      </v-chip>
    </v-app-bar>

    <!-- Main Content -->A
    <div class="content-wrapper">
      <!-- Search and Filter Section -->
      <div class="search-section mb-4">
        <v-text-field
          v-model="search"
          dense
          outlined
          clearable
          placeholder="Search consumer"
          prepend-inner-icon="mdi-magnify"
          class="mb-2"
        ></v-text-field>
        
        <v-select
          v-model="selectedPurok"
          :items="puroks"
          dense
          outlined
          label="Filter by Purok"
          clearable
        ></v-select>
      </div>

      <!-- Consumer List -->
      <div class="consumer-list">
        <v-card 
          v-for="consumer in filteredConsumers" 
          :key="consumer.id"
          class="mb-3 consumer-card"
          :class="{'already-billed': consumer.lastBilling?.status === 'Pending'}"
          @click="openBillingDialog(consumer)"
        >
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <div class="consumer-name">{{ consumer.name }}</div>
              <v-chip
                x-small
                :color="getBillingStatusColor(consumer.lastBilling?.status)"
                text-color="white"
                label
              >
                {{ consumer.lastBilling?.status || 'No Billing' }}
              </v-chip>
            </div>

            <div class="consumer-details">
              <div class="detail-item">
                <v-icon small color="grey">mdi-map-marker</v-icon>
                <span>{{ consumer.address }}</span>
              </div>
              <div class="detail-item">
                <v-icon small color="grey">mdi-counter</v-icon>
                <span>Last Reading: {{ consumer.lastBilling?.presentRead || 0 }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- New Billing Dialog -->
      <v-dialog v-model="showBillingDialog" fullscreen>
        <v-card>
          <v-toolbar dark color="primary" dense>
            <v-btn icon @click="showBillingDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>New Billing Entry</v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pt-4">
            <template v-if="selectedConsumer">
              <!-- Consumer Info -->
              <div class="billing-consumer-info mb-4">
                <div class="text-h6">{{ selectedConsumer.name }}</div>
                <div class="caption grey--text">{{ selectedConsumer.address }}</div>
              </div>

              <!-- Reading Form -->
              <v-form ref="form" v-model="valid">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="previousReading"
                      label="Previous Reading"
                      outlined
                      dense
                      disabled
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      v-model="newReading"
                      label="Present Reading"
                      outlined
                      dense
                      type="number"
                      :rules="readingRules"
                      @input="calculateConsumption"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="consumption"
                      label="Consumption (m³)"
                      outlined
                      dense
                      disabled
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      v-model="readingType"
                      :items="readingTypes"
                      label="Reading Type"
                      outlined
                      dense
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="notes"
                      label="Notes"
                      outlined
                      dense
                      rows="3"
                      placeholder="Add any remarks about the reading"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </template>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn
              text
              @click="showBillingDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="saveBilling"
            >
              Save Reading
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Success Snackbar -->
      <v-snackbar
        v-model="showSuccessSnackbar"
        color="success"
        timeout="3000"
      >
        Billing entry saved successfully
      </v-snackbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeterReaderPage',
  
  data: () => ({
    search: '',
    selectedPurok: null,
    showBillingDialog: false,
    showSuccessSnackbar: false,
    selectedConsumer: null,
    valid: false,
    previousReading: '',
    newReading: '',
    consumption: '',
    readingType: 'Actual',
    notes: '',
    readingTypes: ['Actual', 'Average', 'Estimated'],
    readingRules: [
      v => !!v || 'Reading is required',
      v => v >= 0 || 'Reading must be positive',
      v => v >= (parseFloat(this?.previousReading) || 0) || 'Reading must be greater than previous reading'
    ],

    // Static data
    puroks: ['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5'],
    consumers: [
      {
        id: 1,
        name: 'Juan Dela Cruz',
        address: 'Purok 1, Sample Address',
        lastBilling: {
          status: 'Paid',
          presentRead: 150
        }
      },
      {
        id: 2,
        name: 'Maria Santos',
        address: 'Purok 2, Sample Address',
        lastBilling: {
          status: 'Pending',
          presentRead: 200
        }
      },
      {
        id: 3,
        name: 'Pedro Garcia',
        address: 'Purok 1, Sample Address',
        lastBilling: {
          status: 'Paid',
          presentRead: 175
        }
      },
      // Add more static consumer data as needed
    ]
  }),

  computed: {
    filteredConsumers() {
      return this.consumers.filter(consumer => {
        const matchesSearch = !this.search || 
          consumer.name.toLowerCase().includes(this.search.toLowerCase()) ||
          consumer.address.toLowerCase().includes(this.search.toLowerCase());
        
        const matchesPurok = !this.selectedPurok || 
          consumer.address.includes(this.selectedPurok);

        return matchesSearch && matchesPurok;
      });
    }
  },

  methods: {
    getBillingStatusColor(status) {
      switch(status) {
        case 'Paid':
          return 'success';
        case 'Pending':
          return 'warning';
        default:
          return 'grey';
      }
    },

    openBillingDialog(consumer) {
      this.selectedConsumer = consumer;
      this.previousReading = consumer.lastBilling?.presentRead || 0;
      this.newReading = '';
      this.consumption = '';
      this.readingType = 'Actual';
      this.notes = '';
      this.showBillingDialog = true;
    },

    calculateConsumption() {
      if (this.newReading && this.previousReading) {
        const consumption = parseFloat(this.newReading) - parseFloat(this.previousReading);
        this.consumption = consumption >= 0 ? consumption : 0;
      } else {
        this.consumption = '';
      }
    },

    async saveBilling() {
      if (this.$refs.form.validate()) {
        // Simulate API call
        console.log('Saving billing:', {
          consumerId: this.selectedConsumer.id,
          previousReading: this.previousReading,
          presentReading: this.newReading,
          consumption: this.consumption,
          readingType: this.readingType,
          notes: this.notes,
          date: new Date()
        });

        // Show success message
        this.showSuccessSnackbar = true;
        this.showBillingDialog = false;

        // Update consumer's last billing in the list
        const consumerIndex = this.consumers.findIndex(c => c.id === this.selectedConsumer.id);
        if (consumerIndex !== -1) {
          this.consumers[consumerIndex].lastBilling = {
            status: 'Pending',
            presentRead: parseFloat(this.newReading)
          };
        }
      }
    }
  }
};
</script>

<style scoped>
.meter-reader-app {
  padding-top: 56px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.content-wrapper {
  padding: 16px;
}

.search-section {
  position: sticky;
  top: 56px;
  z-index: 1;
  background-color: #f5f5f5;
  padding-top: 8px;
}

.consumer-card {
  border-radius: 8px;
}

.consumer-card.already-billed {
  opacity: 0.7;
}

.consumer-name {
  font-weight: 500;
  font-size: 1rem;
}

.consumer-details {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.billing-consumer-info {
  border-left: 4px solid var(--v-primary-base);
  padding-left: 12px;
}

@media (max-width: 320px) {
  .content-wrapper {
    padding: 12px;
  }
}
</style>