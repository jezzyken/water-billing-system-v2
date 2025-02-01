<template>
  <v-dialog v-model="dialog" persistent max-width="900">
    <v-card>
      <v-card-title class="text-h6 py-3 px-4">
        Consumer
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4">
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="consumer.lastName"
                label="Last Name"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                v-model="consumer.firstName"
                label="First Name"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                v-model="consumer.middleName"
                label="Middle Name"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-select
                v-model="consumer.extension"
                :items="consumer.extensions"
                label="Name Extension"
                outlined
                dense
              ></v-select>
            </v-col>

            <v-col cols="8">
              <v-text-field
                v-model="consumer.contactNo"
                label="Contact No"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9">
              <v-text-field
                v-model="consumer.address"
                label="Complete Address"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="3">
              <v-select
                v-model="consumer.purok"
                :items="consumer.puroks"
                label="Purok"
                required
                outlined
                dense
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-switch
                v-model="consumer.isActive"
                label="Active Status"
                color="primary"
                inset
                dense
              ></v-switch>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="py-3 px-4">
        <v-spacer></v-spacer>
        <v-btn
          text
          color="grey darken-1"
          @click="closeDialog"
          :disabled="loading"
        >
          Cancel
        </v-btn>
        <v-btn color="primary" @click="handleSubmit" :loading="loading">
          {{ buttonLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/api";

export default {
  name: "ConsumerDialog",

  props: {
    value: Boolean,
    update: Boolean,
    consumerData: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      dialog: this.value,
      loading: false,
      valid: true,
      consumer: {
        lastName: "",
        firstName: "",
        middleName: "",
        address: "Sitio Basak Brgy. Malandag",
        puroks: [
          "Purok 1",
          "Purok 2",
          "Purok 3",
          "Purok 4",
          "Purok 5",
          "Purok 6",
        ],
        extensions: ["Jr", "Sr"],
        purok: "",
        extension: "",
        contactNo: "",
        isMember: true,
        isActive: true,
      },
    };
  },

  computed: {
    buttonLabel() {
      return this.update ? "Update" : "Save";
    },
  },

  methods: {
    async handleSubmit() {
      this.loading = true;
      try {
        const consumerData = {
          firstName: this.consumer.firstName,
          lastName: this.consumer.lastName,
          middleName: this.consumer.middleName,
          address: this.consumer.address,
          purok: this.consumer.purok,
          contactNo: this.consumer.contactNo,
          isActive: this.consumer.isActive,
          isMember: true,
          isNew: false
        };

        if (this.update) {
          await api.put(`/consumer/${this.consumerData._id}`, consumerData);
        } else {
          await api.post("/consumer", consumerData);
        }

        this.$emit("update:consumers");
        this.closeDialog();
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        this.loading = false;
      }
    },

    closeDialog() {
      this.dialog = false;
    },

    clearForm() {
      this.consumer = {
        lastName: "",
        firstName: "",
        middleName: "",
        address: "Sitio Basak Brgy. Malandag",
        puroks: [
          "Purok 1",
          "Purok 2",
          "Purok 3",
          "Purok 4",
          "Purok 5",
          "Purok 6",
        ],
        extensions: ["Jr", "Sr"],
        purok: "",
        extension: "",
        contactNo: "",
        isMember: true,
        isActive: true,
      };
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },
  },

  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
      if (!val) {
        this.clearForm();
      }
    },
    consumerData: {
      handler(newVal) {
        this.consumer = {
          lastName: newVal.lastName || "",
          firstName: newVal.firstName || "",
          middleName: newVal.middleName || "",
          address: newVal.address || "Sitio Basak Brgy. Malandag",
          puroks: [
            "Purok 1",
            "Purok 2",
            "Purok 3",
            "Purok 4",
            "Purok 5",
            "Purok 6",
          ],
          extensions: ["Jr", "Sr"],
          purok: newVal.purok || "",
          extension: newVal.extension || "",
          contactNo: newVal.contactNo || "",
          isMember: newVal.isMember !== undefined ? newVal.isMember : true,
          isActive: newVal.isActive !== undefined ? newVal.isActive : true,
        };
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 0 auto;
}
</style>
