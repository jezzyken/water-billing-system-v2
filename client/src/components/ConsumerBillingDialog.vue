<template>
  <v-dialog v-model="dialog" persistent max-width="700">
    <v-card>
      <v-card-title class="text-h6">
        Create New Billing
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pt-4">
        <v-container v-if="!isLoading">
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="items.month"
                :items="months"
                label="Present Date"
                outlined
                required
                :disabled="update"
              ></v-select>
            </v-col>

            <v-col cols="3">
              <v-select
                v-model="items.year"
                :items="years"
                label="Year"
                outlined
                required
                :disabled="update"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3">
              <v-menu
                ref="dateMenu"
                v-model="dateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formattedBillingDate"
                    label="Billing Date"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    :disabled="update"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="items.billingDate"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="items.previousRead"
                label="Previous Read"
                outlined
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="items.presentRead"
                label="Present Read"
                outlined
                type="number"
              ></v-text-field>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="consumption"
                label="Consumption"
                outlined
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="items.readType"
                :items="readTypes"
                label="Read Type"
                outlined
              ></v-select>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="items.meterDescription"
                :items="meterDescriptions"
                label="Meter Description"
                outlined
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="items.notes"
                label="Notes"
                outlined
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="onAddItem">{{ buttonLabel }}</v-btn>
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
