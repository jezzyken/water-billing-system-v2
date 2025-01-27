<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="700"
    class="billing-dialog"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-title class="text-h6 d-flex align-center pa-4">
        <span class="billing-title"
          >{{ update ? "Update" : "Create New" }} Billing</span
        >
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pt-4">
        <v-container v-if="!isLoading" class="px-2 px-sm-4">
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                v-model="items.month"
                :items="months"
                label="Present Date"
                outlined
                dense
                required
                :disabled="update"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="3">
              <v-select
                v-model="items.year"
                :items="years"
                label="Year"
                outlined
                dense
                required
                :disabled="update"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="4">
              <v-menu
                ref="dateMenu"
                v-model="dateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="290px"
                :nudge-right="40"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formattedBillingDate"
                    label="Billing Date"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                    :disabled="update"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="items.billingDate"
                  @input="dateMenu = false"
                  scrollable
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="4" md="2">
              <v-text-field
                v-model="items.previousRead"
                label="Previous Read"
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="3">
              <v-text-field
                v-model="items.presentRead"
                label="Present Read"
                outlined
                dense
                type="number"
                :rules="[
                  (v) =>
                    v >= items.previousRead ||
                    'Present read must be greater than previous read',
                ]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="3">
              <v-text-field
                v-model="consumption"
                label="Consumption"
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                v-model="items.readType"
                :items="readTypes"
                label="Read Type"
                outlined
                dense
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="items.meterDescription"
                :items="meterDescriptions"
                label="Meter Description"
                outlined
                dense
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="items.notes"
                label="Notes"
                outlined
                auto-grow
                rows="3"
                row-height="15"
                class="billing-notes"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <v-skeleton-loader
          v-else
          type="article"
          class="mx-auto"
        ></v-skeleton-loader>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false" class="px-4"> Cancel </v-btn>
        <v-btn color="primary" @click="onAddItem" class="px-6">
          {{ buttonLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/api";
import moment from "moment";

export default {
  name: "ConsumerBillingDialog",

  props: {
    value: Boolean,
    billingData: {
      type: Object,
      default: () => ({}),
    },
    update: Boolean,
  },

  data() {
    return {
      dialog: this.value,
      dateMenu: false,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      readTypes: ["Actual"],
      meterDescriptions: ["Water"],
      years: [],
      items: {
        readType: "Actual",
        meterDescription: "Water",
        billingDate: null,
        previousRead: 0,
        presentRead: 0,
        month: "",
        year: null,
      },
      billing: {},
      isLoading: false,
    };
  },

  computed: {
    consumption() {
      const value = this.items.presentRead - this.items.previousRead;
      return value >= 0 ? value : 0;
    },
    buttonLabel() {
      return this.update ? "Update" : "Save";
    },
    formattedBillingDate() {
      return this.items.billingDate
        ? moment(this.items.billingDate).format("YYYY-MM-DD")
        : "";
    },
  },

  methods: {
    async onAddItem() {
      try {
        const presentDate = moment(
          `${this.items.month} ${this.items.year}`,
          "MMMM YYYY"
        ).format("YYYY-MM-DD");

        const previousDate = moment(
          `${this.items.month} ${this.items.year}`,
          "MMMM YYYY"
        )
          .subtract(1, "month")
          .format("YYYY-MM-DD");

        const data = {
          ...this.items,
          consumerId: this.$route.params.id,
          previousDate,
          presentDate,
          billingDate: moment(this.items.billingDate).format("YYYY-MM-DD"),
        };

        if (this.update) {
          await api.put(`/billing/${this.billingData._id}`, data);
        } else {
          await api.post("/billing", data);
        }

        this.dialog = false;
        this.$emit("update:billings");
      } catch (error) {
        console.error("Error saving billing:", error);
      }
    },

    async getItem() {
      this.isLoading = true;
      try {
        const response = await api.get(
          `/billing/consumer/latest/${this.$route.params.id}`
        );
        this.billing = response.data;

        console.log(response);

        this.items = {
          readType: "Actual",
          meterDescription: "Water",
          billingDate: null,
          previousRead: this.billing.presentRead || 0,
          presentRead: 0,
          month: moment().format("MMMM"),
          year: moment().year(),
          notes: "",
        };
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error("Error fetching billing:", error);
        }
        this.clearForm();
      } finally {
        this.isLoading = false;
      }
    },

    getPreviousMonthAndYear(month, year) {
      return moment(`${month} ${year}`, "MMMM YYYY")
        .subtract(1, "month")
        .toDate();
    },

    clearForm() {
      this.items = {
        readType: "Actual",
        meterDescription: "Water",
        billingDate: null,
        previousRead: 0,
        presentRead: 0,
        month: "",
        year: null,
      };
    },

    initializeYears() {
      const currentYear = new Date().getFullYear();
      const startYear = 2000;
      for (let year = currentYear; year >= startYear; year--) {
        this.years.push(year);
      }
    },
  },

  watch: {
    value(val) {
      this.dialog = val;
      if (val) {
        if (this.update) {
          if (this.billingData && Object.keys(this.billingData).length) {
            this.items = {
              readType: this.billingData.readType || "Actual",
              meterDescription: this.billingData.meterDescription || "Water",
              billingDate: this.billingData.billingDate,
              previousRead: this.billingData.previousRead,
              presentRead: this.billingData.presentRead,
              month: moment(this.billingData.presentDate).format("MMMM"),
              year: parseInt(
                moment(this.billingData.presentDate).format("YYYY")
              ),
              notes: this.billingData.notes || "",
            };
          }
        } else {
          this.getItem();
        }
      }
    },
    dialog(val) {
      this.$emit("input", val);
      if (!val) {
        this.clearForm();
      }
    },
  },

  created() {
    this.initializeYears();
  },
};
</script>

<style scoped>
.billing-dialog
  ::v-deep
  .v-text-field.v-text-field--enclosed
  .v-text-field__details {
  margin-bottom: 0;
}

.billing-title {
  font-size: 1.25rem;
  line-height: 1.4;
}

.billing-notes ::v-deep .v-text-field__slot textarea {
  line-height: 1.5;
}

@media (max-width: 600px) {
  .billing-dialog {
    margin: 0;
  }

  .v-dialog {
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100%;
    max-width: none !important;
    border-radius: 0;
  }

  .v-card {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .v-card__text {
    flex: 1;
    overflow-y: auto;
  }

  .v-text-field {
    margin-bottom: 8px;
  }

  .v-btn {
    min-width: 90px;
    height: 40px;
  }

  .billing-title {
    font-size: 1.1rem;
  }

  .v-card-title {
    padding: 12px !important;
  }

  .v-card-actions {
    padding: 12px !important;
  }
}

/* Tablet Optimizations */
@media (min-width: 601px) and (max-width: 960px) {
  .billing-dialog {
    margin: 24px;
  }
}

/* Touch Device Optimizations */
@media (hover: none) {
  .v-btn {
    min-height: 44px;
  }

  .v-text-field ::v-deep .v-input__slot {
    min-height: 44px;
  }
}
</style>
