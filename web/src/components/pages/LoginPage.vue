<template>
    <div>
      <h1>Log in</h1>
      <form>
        <label>
          Username:
          <input type="text" v-model="userEmail"/>
          <template v-if="attemptedLogin && !isValid">Username is invalid</template>
        </label>
        <p>{{userEmail}}</p>
        <button @click="logIn">Submit</button>
      </form>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Inject } from "vue-property-decorator";
import AuthService from "@/services/AuthService";

@Component
export default class LoginPage extends Vue {

  public userEmail = "";
  public attemptedLogin = false;

  get isValid() {
    return !!this.userEmail;
  }

  public logIn() {
    this.attemptedLogin = true;
    if (this.isValid) {
      alert(this.userEmail);
    }
  }

  @Inject()
  private authService!: AuthService;
}
</script>