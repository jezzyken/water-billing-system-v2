<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex align-center py-3 px-4">
        <h2 class="text-h5 font-weight-bold mb-0">Collections</h2>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :items="consumer"
          :headers="headers"
          :search="search"
          :items-per-page="15"
          :footer-props="{
            'items-per-page-options': [15, 20, 25, 50, -1],
            'items-per-page-text': 'Rows per page',
          }"
          :class="{ 'stripe-rows': true }"
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

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              small
              color="primary"
              class="mr-2"
              icon
              @click="onViewItem(item)"
            >
              <v-icon small>mdi-eye</v-icon>
            </v-btn>
            <v-btn small color="error" icon>
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
import moment from "moment";

export default {
  name: "CollectionsPage",

  data() {
    return {
      consumer: [],
      search: "",
      headers: [
        {
          text: "Payment Date",
          align: "left",
          value: "paymentDate",
        },
        {
          text: "Consumer",
          align: "left",
          value: "name",
        },
        {
          text: "Total Bill",
          align: "left",
          value: "totalBill",
        },
        {
          text: "Payment Method",
          align: "left",
          value: "paymentMethod",
        },
        {
          text: "Collection Type",
          align: "left",
          value: "collectionType",
        },
        {
          text: "Actions",
          align: "right",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },

  methods: {
    async fetch() {
      try {
        const response = await api.get("/collection");
        this.consumer = response.data.map((item) => ({
          ...item,
          name: `${item.consumerId.firstName} ${item.consumerId.middleName} ${item.consumerId.lastName}`,
          paymentDate: moment(item.paymentDate).format("YYYY-MM-DD hh:mm a"),
        }));
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    },

    onViewItem(item) {
      console.log(item);
    },
  },

  created() {
    this.fetch();
  },
};
</script>

<style>
.stripe-rows >>> tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 200, 0, 0.05);
}
</style>
