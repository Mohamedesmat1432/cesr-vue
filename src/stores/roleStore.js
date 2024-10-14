import { defineStore } from "pinia";
import { header } from "@/header";
import { useToast } from "vue-toastification";
import { trans } from "@/i18n/translate";

export const useRoleStore = defineStore("roleStore", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    toast: useToast(),
    roles: [],
    permissions: [],
    selectedPermissions: [],
    role: null,
    isVisible: false,
    errorMessage: trans("network_error"),
    currentPage: 1,
    lastPage: 1,
    perPage: 2,
    errors: {},
    loading: false,
  }),
  actions: {
    async all(page = 1) {
      try {
        this.loading = true;
        const res = await fetch(
          `/api/roles?page=${page}&per_page=${this.perPage}`,
          header("GET", this.token)
        );
        if (res.status === 500) {
          throw new Error(this.errorMessage);
        }

        const data = await res.json();

        if (res.status === 200) {
          this.roles = data.roles.data;
          this.currentPage = data.roles.current_page;
          this.lastPage = data.roles.last_page;
        }
      } catch (err) {
        console.log(err.message);
        this.toast.error(err.message);
      } finally {
        this.loading = false;
      }
    },
    async fetchPermissions() {
      try {
        this.loading = true;
        const res = await fetch(
          "/api/all-permissions",
          header("GET", this.token)
        );
        const data = await res.json();
        this.permissions = data.permissions;
      } catch (err) {
        console.log(err.message);
        this.toast.error(err.message);
      } finally {
        this.loading = false;
      }
    },
    async loadRoles() {
      await this.all(this.currentPage);
    },
    async prevPage() {
      if (this.currentPage > 1) {
        await this.all(this.currentPage - 1);
      }
    },
    async nextPage() {
      if (this.currentPage < this.lastPage) {
        await this.all(this.currentPage + 1);
      }
    },
    async create(formData) {
      try {
        this.loading = true;
        const res = await fetch(
          "/api/roles",
          header("POST", this.token, formData)
        );
        if (res.status === 500) {
          throw new Error(this.errorMessage);
        }

        const data = await res.json();

        if (res.status === 200) {
          this.router.push({ name: "roles" });
          this.toast.success(data.message);
          this.errors = {};
        } else {
          this.errors = data.errors;
        }
      } catch (err) {
        this.toast.error(err.message);
      } finally {
        this.loading = false;
      }
    },
    async show(role) {
      const res = await fetch(`/api/roles/${role}`, header("GET", this.token));
      const data = await res.json();
      this.role = data.role;
      this.selectedPermissions = data.permissions;
    },
    async update(role, formData) {
      try {
        this.loading = true;
        const res = await fetch(
          `/api/roles/${role}`,
          header("PATCH", this.token, formData)
        );
        if (res.status === 500) {
          throw new Error(this.errorMessage);
        }

        const data = await res.json();

        if (res.status === 200) {
          this.router.push({ name: "roles" });
          this.toast.success(data.message);
          this.errors = {};
          this.role = null;
        } else {
          this.errors = data.errors;
        }
      } catch (err) {
        this.toast.error(err.message);
      } finally {
        this.loading = false;
      }
    },
    /******************* Delete a post *******************/
    openConfirmDelete(role) {
      this.isVisible = true;
      this.role = role.id;
    },
    closeModal() {
      this.isVisible = false;
      this.role = null;
    },
    async deleteRole() {
      try {
        const res = await fetch(
          `/api/roles/${this.role}`,
          header("DELETE", this.token)
        );

        if (res.status === 500) {
          throw new Error(this.errorMessage);
        }

        const data = await res.json();

        if (res.status === 200) {
          this.toast.success(data.message);
          this.errors = {};
          this.loadRoles();
        } else {
          this.errors = data.errors;
        }
      } catch (err) {
        this.toast.error(err.message);
      } finally {
        this.closeModal();
      }
    },
  },
});
