<template>
      <router-view></router-view>
</template>


<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import { Component, Inject } from "vue-property-decorator";
import TestComponent from "@/TestComponent.vue";
import LoginPage from "@/components/pages/LoginPage.vue";
import AuthService from "@/services/AuthService";
import ChatRegistrationPage from "@/components/pages/ChatRegistrationPage.vue";

@Component({
    router: new VueRouter({
        routes: [
            { path: '/', component: TestComponent },
            { path: '/login', component: LoginPage },
            { path: '/register', component: ChatRegistrationPage }
        ]
    })
})
export default class RootComponent extends Vue {
    
    @Inject()
    private authService!: AuthService;

    private beforeMount() {
        if (!this.authService.hasActiveSession) {
            this.$router.replace(`/login`);
        }
    }

    private errorCaptured(error: Error) {
        alert(error.message);
    }
}
</script>