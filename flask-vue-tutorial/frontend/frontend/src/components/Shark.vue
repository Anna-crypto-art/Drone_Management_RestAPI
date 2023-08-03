<!-- html -->
<template>
  <div>
    <!-- <button type="button" class="btn btn-primary">{{ msg }}</button> -->
    <p>{{ msg }}</p>
  </div>
</template>

<!-- java script the message is rendered into the DOM through the template -->
<script>
import axios from "axios";
export default {
  name: "Shark-shark",
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    getResponse() {
      const path = "http://localhost:5000/link"; // path to Flask
      axios
        .get(path)
        .then((res) => {
          console.log(res.data);
          this.msg = res.data; // response from flask!
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.getResponse();
  },
};
</script>
