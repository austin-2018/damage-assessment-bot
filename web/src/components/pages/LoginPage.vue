<template>
    <div>This is the login page</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Inject } from "vue-property-decorator";
import AuthService from "@/services/AuthService";

@Component
export default class LoginPage extends Vue {

  @Inject()
  private authService!: AuthService;
}
</script>