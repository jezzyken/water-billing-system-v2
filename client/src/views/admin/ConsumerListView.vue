<template>
  <v-container>
    <v-card elevation="2">
      <v-card-title class="d-flex align-center py-3 px-4">
        <h2 class="text-h5 font-weight-bold mb-0">Consumers Management</h2>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="onShowDialog"
          prepend-icon="mdi-plus"
          class="px-4"
        >
          Add New Consumer
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-data-table
        :headers="headers"
        :items="consumers"
        :loading="loading"
        :search="search"
        :items-per-page="15"
        :footer-props="{
          'items-per-page-options': [15, 20, 25, 50, -1],
          showFirstLastPage: true,
        }"
        class="elevation-0"
      >
        <template v-slot:top>
          <v-toolbar flat class="px-4 d-flex justify-end">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search consumers..."
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

        <template v-slot:[`item.select`]="{ item }">
          <v-btn small color="primary" @click="onSelectItem(item)">
            Select
          </v-btn>
        </template>

        <template v-slot:[`item.isActive`]="{ item }">
          <v-chip
            small
            :color="item.isActive ? 'success' : 'error'"
            text-color="white"
          >
            {{ item.isActive ? "Active" : "Inactive" }}
          </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                color="primary"
                @click="onViewItem(item)"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
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
                @click="confirmDelete(item._id)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete Consumer</span>
          </v-tooltip>
        </template>

        <template v-slot:no-data>
          <v-alert type="info" class="ma-4" text>No consumers found</v-alert>
        </template>
      </v-data-table>
    </v-card>

    <!-- Consumer Dialog Component -->
    <consumer-dialog
      ref="consumer"
      v-model="showDialog"
      @update:consumers="fetchConsumers"
      :consumer-data="selectedConsumer"
      :update="isEditing"
    />

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="py-3 px-4">
          <span class="text-h6">Delete Consumer</span>
        </v-card-title>

        <v-card-text class="pt-3">
          Are you sure you want to delete this consumer? This action cannot be
          undone.
        </v-card-text>

        <v-card-actions class="py-3 px-4">
          <v-spacer></v-spacer>
          <v-btn
            text
            color="grey darken-1"
            @click="showDeleteDialog = false"
            :disabled="loading"
          >
            Cancel
          </v-btn>
          <v-btn color="error" @click="handleDelete" :loading="loading">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      top
      right
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import api from "@/services/api";
import ConsumerDialog from "@/components/ConsumerDialog.vue";

export default {
  name: "ConsumersManagement",

  components: {
    ConsumerDialog,
  },

  data() {
    return {
      consumers: [],
      headers: [
        { text: "Select", value: "select", sortable: false },
        { text: "Account No", value: "accountNo" },
        { text: "Last Name", value: "lastName" },
        { text: "First Name", value: "firstName" },
        { text: "Middle Name", value: "middleName" },
        { text: "Address", value: "address" },
        { text: "Purok", value: "purok" },
        { text: "Contact No", value: "contactNo" },
        { text: "Status", value: "isActive" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      search: "",
      isFocused: false,
      loading: false,
      showDialog: false,
      showDeleteDialog: false,
      selectedConsumer: {},
      isEditing: false,
      selectedId: null,
      snackbar: {
        show: false,
        text: "",
        color: "",
      },
    };
  },

  methods: {
    showSnackbar(text, color = "success") {
      this.snackbar = {
        show: true,
        text,
        color,
      };
    },

    async fetchConsumers() {
      this.loading = true;
      try {
        const response = await api.get("/consumer");
        this.consumers = response.data;
      } catch (error) {
        this.showSnackbar(
          error.message || "Failed to fetch consumers",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },

    onViewItem(item) {
      this.selectedConsumer = {};
      this.$nextTick(() => {
        this.selectedConsumer = item;
        this.isEditing = true;
        this.showDialog = true;
      });
    },

    onSelectItem(item) {
      this.$router.push({
        path: `/admin/consumer/${item._id}/view`,
      });
    },

    onShowDialog() {
      this.selectedConsumer = {};
      this.isEditing = false;
      this.showDialog = true;
    },

    confirmDelete(id) {
      this.selectedId = id;
      this.showDeleteDialog = true;
    },

    async handleDelete() {
      this.loading = true;
      try {
        await api.delete(`/consumer/${this.selectedId}`);
        this.showSnackbar("Consumer deleted successfully");
        await this.fetchConsumers();
      } catch (error) {
        this.showSnackbar(
          error.message || "Failed to delete consumer",
          "error"
        );
      } finally {
        this.loading = false;
        this.showDeleteDialog = false;
      }
    },
  },

  created() {
    this.fetchConsumers();
  },
};
</script>

<style scoped>
.focused-field {
  transition: all 0.3s ease;
}

.focused-field:deep(.v-input__slot) {
  background: #f5f5f5;
}
</style>
