<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex align-center py-3 px-4">
        <h2 class="text-h5 font-weight-bold mb-0">Expenses</h2>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="openDialog"
          prepend-icon="mdi-plus"
          class="px-4"
        >
          Add Expense
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :items="expenses"
          :headers="headers"
          :search="search"
          :loading="loading"
          :items-per-page="10"
        >
          <template v-slot:top>
            <v-toolbar flat class="px-4 d-flex justify-end">
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Search expenses..."
                hide-details
                dense
                outlined
                rounded
                class="mt-6"
                clearable
                @click:clear="search = ''"
                :class="{ 'focused-field': isFocused }"
                @focus="isFocused = true"
                @blur="isFocused = false"
              ></v-text-field>
            </v-toolbar>
          </template>

          <template v-slot:[`item.date`]="{ item }">
            {{ formatDate(item.date) }}
          </template>

          <template v-slot:[`item.amount`]="{ item }">
            ₱{{ item.amount.toFixed(2) }}
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              small
              color="primary"
              class="mr-2"
              icon
              @click="openDialog(item)"
            >
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <v-btn small color="error" icon @click="confirmDelete(item)">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Expense Form Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ formTitle }}
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-menu
                  ref="dateMenu"
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.date"
                      label="Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.date"
                    @input="dateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model.number="editedItem.amount"
                  label="Amount"
                  type="number"
                  prefix="₱"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="editedItem.expenseType"
                  :items="expenseTypes"
                  label="Expense Type"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.description"
                  label="Description"
                  rows="3"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="saveExpense" :loading="saving">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title>Delete Expense</v-card-title>
        <v-card-text>
          Are you sure you want to delete this expense?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" @click="deleteExpense" :loading="deleting">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
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
import moment from "moment";

export default {
  name: "ExpensesPage",

  data: () => ({
    search: "",
    loading: false,
    saving: false,
    deleting: false,
    dialog: false,
    deleteDialog: false,
    dateMenu: false,
    expenses: [],
    headers: [
      { text: "Date", value: "date" },
      { text: "Amount", value: "amount" },
      { text: "Type", value: "expenseType" },
      { text: "Description", value: "description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    expenseTypes: ["Salary", "Utilities", "Supplies", "Maintenance", "Other"],
    editedItem: {
      date: new Date().toISOString().substr(0, 10),
      amount: 0,
      expenseType: "",
      description: "",
    },
    defaultItem: {
      date: new Date().toISOString().substr(0, 10),
      amount: 0,
      expenseType: "",
      description: "",
    },
    snackbar: {
      show: false,
      text: "",
      color: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedItem._id ? "Edit Expense" : "New Expense";
    },
  },

  methods: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },

    showSnackbar(text, color = "success") {
      this.snackbar = {
        show: true,
        text,
        color,
      };
    },

    async fetchExpenses() {
      this.loading = true;
      try {
        const response = await api.get("/expense");
        this.expenses = response.data;
      } catch (error) {
        this.showSnackbar(
          error.response?.data?.message || "Failed to fetch expenses",
          "error"
        );
      }
      this.loading = false;
    },

    openDialog(item = null) {
      this.editedItem = item ? { ...item } : { ...this.defaultItem };
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
      });
    },

    async saveExpense() {
      this.saving = true;
      try {
        if (this.editedItem._id) {
          await api.put(`/expense/${this.editedItem._id}`, this.editedItem);
          this.showSnackbar("Expense updated successfully");
        } else {
          await api.post("/expense", this.editedItem);
          this.showSnackbar("Expense added successfully");
        }
        this.closeDialog();
        this.fetchExpenses();
      } catch (error) {
        this.showSnackbar(
          error.response?.data?.message || "Failed to save expense",
          "error"
        );
      }
      this.saving = false;
    },

    confirmDelete(item) {
      this.editedItem = { ...item };
      this.deleteDialog = true;
    },

    async deleteExpense() {
      this.deleting = true;
      try {
        await api.delete(`/expense/${this.editedItem._id}`);
        this.showSnackbar("Expense deleted successfully");
        this.deleteDialog = false;
        this.fetchExpenses();
      } catch (error) {
        this.showSnackbar(
          error.response?.data?.message || "Failed to delete expense",
          "error"
        );
      }
      this.deleting = false;
    },
  },

  created() {
    this.fetchExpenses();
  },
};
</script>
