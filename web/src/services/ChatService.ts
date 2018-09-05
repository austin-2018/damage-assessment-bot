import axios from "axios";
import { Component } from "vue-property-decorator";
import Vue from "vue";

export default function ChatService() {

    let urlParams = new URLSearchParams(window.location.search);
    let accessToken = urlParams.get("access_token");

    if (accessToken) {
        axios.post("api/userSignIn", {

        });
    }
}