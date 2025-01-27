<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      :mini-variant.sync="mini"
      width="240"
      mini-variant-width="64"
      :temporary="$vuetify.breakpoint.mobile"
      color="#a52a2a"
      dark
    >
      <v-list dense class="drawer-list">
        <div class="user-profile pa-4">
          <div class="text-center">
            <v-avatar size="64" class="elevation-2">
              <v-img
                :src="currentUser?.image || defaultAvatar"
                @error="handleImageError"
                class="grey darken-2"
              >
                <template v-slot:placeholder>
                  <v-icon large color="grey lighten-2">mdi-account</v-icon>
                </template>
              </v-img>
            </v-avatar>
          </div>

          <div v-if="!mini" class="user-details text-center">
            <h3 class="text-subtitle-1 font-weight-medium mb-1">
              {{ currentUser.fullName }}
            </h3>
            <p class="text-caption mb-2 white--text">
              {{ currentUser.email }}
            </p>
            <div class="role-info">
              <v-chip
                small
                class="mb-1"
                color="white"
                text-color="white"
                outlined
              >
                {{ currentUser.role }}
              </v-chip>
            </div>
          </div>
        </div>
        <v-divider class="mb-2"></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon class="white--text">mdi-home-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content v-if="!mini">
            <v-list-item-title class="white--text">Basac WBS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <template v-for="item in filteredMenuItems">
          <template
            v-if="!item.show || (item.show === 'isAdmin' ? isAdmin : true)"
          >
            <v-list-item
              v-if="!item.children"
              :key="item.title"
              :to="item.to"
              link
              class="drawer-item white--text"
              :class="{ 'active-item': $route.path === item.to }"
            >
              <v-list-item-icon>
                <v-icon class="white--text">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content v-if="!mini">
                <v-list-item-title class="white--text">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-group
              v-else
              :key="item.title"
              :prepend-icon="item.icon"
              class="drawer-item"
              :value="isGroupActive(item)"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title class="white--text">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="child in item.children"
                :key="child.title"
                :to="child.to"
                link
                class="drawer-sub-item white--text"
                :class="{ 'active-item': $route.path === child.to }"
              >
                <v-list-item-icon>
                  <v-icon class="white--text">{{ child.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content v-if="!mini">
                  <v-list-item-title class="white--text">{{
                    child.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="white" elevation="1">
      <v-app-bar-nav-icon
        @click.stop="toggleDrawer"
        color="#a52a2a"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="brown--text text--darken-4">
        {{ capitalizedRouteName }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="#a52a2a">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in accountMenu"
            :key="item.title"
            @click="handleAction(item.action)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DashboardLayout",
  data: () => ({
    defaultAvatar: require("@/assets/default-avatar.png"),
    drawer: true,
    mini: false,
    menuItems: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        to: "/admin/dashboard",
      },
      {
        title: "Accounts",
        icon: "mdi-file-document-multiple",
        defaultOpen: true,
        children: [
          {
            title: "Memberships",
            icon: "mdi-file-document",
            to: "/admin/memberships",
          },
          {
            title: "Consumers",
            icon: "mdi-file-send",
            to: "/admin/consumers",
          },
          {
            title: "Users",
            icon: "mdi-file-send",
            to: "/admin/users",
          },
        ],
      },
      {
        title: "Billings",
        icon: "mdi-clipboard-text-outline",
        to: "/admin/billings",
      },
      {
        title: "Collections",
        icon: "mdi-clipboard-text-outline",
        to: "/admin/collections",
      },
      {
        title: "Expenses",
        icon: "mdi-clipboard-text-outline",
        to: "/admin/expenses",
      },
      {
        title: "Admin",
        icon: "mdi-account-group",
        show: "isAdmin",
        children: [
          {
            title: "Users",
            icon: "mdi-account-multiple",
            to: "/admin/users",
          },
          {
            title: "Roles",
            icon: "mdi-shield-account",
            to: "/admin/user-roles",
          },
        ],
      },
      // { title: "Settings", icon: "mdi-cog", to: "/admin/settings" },
      { title: "Reports", icon: "mdi-chart-box", to: "/admin/reports" },
    ],
    accountMenu: [
      // {
      //   title: "Profile",
      //   icon: "mdi-account",
      //   action: "goToProfile",
      // },
      {
        title: "Logout",
        icon: "mdi-logout",
        action: "logout",
      },
    ],
  }),

  async created() {
    if (!this.currentUser && this.getToken) {
      await this.restoreSession();
    }
    if (this.currentUser) {
      this.loadUserData();
    }
  },

  computed: {
    ...mapGetters("users", ["getCurrentUser", "isAdmin"]),
    capitalizedRouteName() {
      return (
        this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1)
      );
    },

    currentUser() {
      return this.getCurrentUser;
    },

    fullName() {
      return this.currentUser
        ? `${this.currentUser.fname} ${this.currentUser.lname}`
        : "";
    },

    isAdmin() {
      const userData = JSON.parse(localStorage.getItem("user"));
      return userData?.role?.name === "Admin";
    },
    filteredMenuItems() {
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      const userRole = userData?.role;

      if (userRole === "meter reader") {
        return [
          {
            title: "Consumers",
            icon: "mdi-file-send",
            to: "/admin/consumers",
          },
        ];
      }

      return this.menuItems.filter((item) => {
        if (item.show === "isAdmin" && !this.isAdmin) {
          return false;
        }

        if (item.title === "Dashboard" && userRole === "Staff") {
          return false;
        }

        return true;
      });
    },
  },

  methods: {
    ...mapActions("users", ["logout"]),
    ...mapActions("users", ["getUserById", "restoreSession"]),

    handleImageError(event) {
      event.target.src = this.defaultAvatar;
    },

    async loadUserData() {
      const userId = this.currentUser?.id;
      console.log(this.currentUser);
      if (userId) {
        try {
          await this.getUserById(userId);
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    },

    isGroupActive(item) {
      if (!item.children) return false;
      return (
        item.defaultOpen ||
        item.children.some((child) => this.$route.path === child.to)
      );
    },

    toggleDrawer() {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = !this.drawer;
      } else {
        this.mini = !this.mini;
        this.drawer = true;
      }
    },

    goToProfile() {
      this.$router.push({ name: "Profile" });
    },

    handleAction(action) {
      if (this[action]) {
        this[action]();
        this.$router.push("/login");
      }
    },
  },

  watch: {
    $route() {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = false;
      }
    },
  },
};
</script>

<style>
.drawer-list {
  color: white !important;
}

.drawer-list .v-list-item__icon .v-icon {
  color: white !important;
}

.v-list-group__header.v-list-item--active:before {
  opacity: 0.12;
  background-color: white !important;
}

.v-list-group__header .v-list-group__header__prepend-icon.v-icon {
  color: white !important;
}

.v-list-group__header .v-list-group__header__append-icon.v-icon {
  color: white !important;
}

.active-item {
  background-color: rgba(255, 255, 255, 0.12) !important;
  color: white !important;
}

.active-item .v-icon {
  color: white !important;
}

.v-list-group--active > .v-list-group__header {
  background-color: rgba(255, 255, 255, 0.08) !important;
}

.drawer-sub-item.active-item {
  background-color: rgba(255, 255, 255, 0.12) !important;
  color: white !important;
  margin-left: 8px !important;
  border-radius: 0 4px 4px 0 !important;
}

.drawer-item:hover,
.drawer-sub-item:hover {
  background-color: rgba(255, 255, 255, 0.04) !important;
}

.v-list-item,
.v-icon,
.v-list-item__title {
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out !important;
}

.user-details {
  line-height: 1.4;
}

.role-info {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.v-chip {
  font-size: 11px !important;
}
</style>
