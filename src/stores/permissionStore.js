import { defineStore } from "pinia";
import { header } from "@/header";
import { useToast } from "vue-toastification";
import { trans } from "@/i18n/translate";

export const usePermissionStore = defineStore("permissionStore", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    toast: useToast(),
    permissions: [],
    permission: null,
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
          `/api/permissions?page=${page}&per_page=${this.perPage}`,
          header("GET", this.token)
        );
        if (res.status === 500) {
          throw new Error(this.errorMessage);
        }

        const data = await res.json();

        if (res.status === 200) {
          this.permissions = data.permissions.data;
          this.currentPage = data.permissions.current_page;
          this.lastPage = data.permissions.last_page;
        }
      } catch (err) {
        console.log(err.message);
        this.toast.error(err.message);
      } finally {
        this.loading = false;
      }
    },
    async loadPermissions() {
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
          "/api/permissions",
          header("POST", this.token, formData)
        );

        if (res.status === 500) {
          throw new Error(this.errorMessage);
        }

        const data = await res.json();

        if (res.status === 200) {
          this.toast.success(data.message);
          this.router.push({ name: "permissions" });
          this.errors = {};
          this.loadPermissions();
        } else {
          this.errors = data.errors;
        }
      } catch (err) {
        this.toast.error(err.message);
      } finally {
        this.loading = false;
      }
    },
    async show(permission) {
      const res = await fetch(
        `/api/permissions/${permission}`,
        header("GET", this.token)
      );

      const data = await res.json();

      this.permission = data.permission;
    },
    async update(permission, formData) {
      try {
        this.loading = true;

        const res = await fetch(
          `/api/permissions/${permission}`,
          header("PATCH", this.token, formData)
        );

        if (res.status === 500) {
          throw new Error(this.errorMessage);
        }

        const data = await res.json();

        if (res.status === 200) {
          this.toast.success(data.message);
          this.router.push({ name: "permissions" });
          this.errors = {};
          this.loadPermissions();
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
    openConfirmDelete(permission) {
      this.isVisible = true;
      this.permission = permission.id;
    },
    closeModal() {
      this.isVisible = false;
      this.permission = null;
    },
    async deletePermission() {
      try {
        const res = await fetch(
          `/api/permissions/${this.permission}`,
          header("DELETE", this.token)
        );

        if (res.status === 500) {
          throw new Error(this.errorMessage);
        }

        const data = await res.json();

        if (res.status === 200) {
          this.toast.success(data.message);
          this.errors = {};
          this.loadPermissions();
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
