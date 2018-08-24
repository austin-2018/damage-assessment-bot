<template>
  <div>
    {{msg}}!!
    <div>
      <a href='https://www.facebook.com/v3.1/dialog/oauth?
                  client_id=228491981184194&
                  redirect_uri=https://maxtestfacebookapp.azurewebsites.net&
                  state="{st=state123abc,ds=123456789}"&
                  scope=groups_access_member_info'>
        Sign in to Facebook
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Inject } from "vue-property-decorator";
import ConfigService from "@/services/ConfigService";

@Component
export default class TestComponent extends Vue {

  msg: string = "hello from the frontend";
  
  @Inject()
  private configService!: ConfigService;

  // Hooks
  async mounted() {
      const configData = await this.configService.getConfigData();
      this.msg = configData.msg;
  }
}
</script>

<style lang="scss">
</style>
