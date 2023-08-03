<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <!-- bootswatch CDN -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/sketchy/bootstrap.min.css" integrity="sha384-RxqHG2ilm4r6aFRpGmBbGTjsqwfqHOKy1ArsMhHusnRO47jcGqpIQqlQK/kmGy9R" crossorigin="anonymous">
      <div class="row">
           <div class="col-sm-12">
              <p>Drones Library 🛩️</p>
              <hr><br>

               <!-- Alert Message -->
               <button type="button" class="btn btn-success btn-sm">Add drone</button>
               <br><br>
               <table class="table table-hover">
                  <!-- Table Head -->
                  <thead>
                    <tr>
                        <!-- Table header cells -->
                        <th scope="col">Sensor</th>
                        <th scope="col">Owner name</th>
                        <th scope="col">Worked?</th>
                        <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                        <tr v-for="drone, index in drones" :key= "index">                        
                          <td>{{ drone.sensor }}</td>
                          <td>MI</td>
                          <td>RE</td>
                          <td>MI</td>
                          <td>
                            <div class="btn-group" role="group">
                              <button type="button" class="btn btn-info btn-sm">Update</button>
                              <button type="button" class="btn btn-danger btn-sm">Delete</button>
                            </div>
                          </td>
                          
                      </tr>
                  </tbody>
               </table>
           </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
    data() {
      return {
        drones:[],
      };
    },

    methods: {
      getDrones() {
        const path = 'http://localhost:5000/drones';
        axios.get(path)
        .then((res) => {
          this.drones = res.data.drones;
        })
        .catch((err) => {
          console.error(err);
        });
      },
    },
    created() {
      this.getDrones();
    }
}
</script>