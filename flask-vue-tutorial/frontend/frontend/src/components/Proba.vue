<template>
    <div class="jumbotron vertical-center">
      <div class="container">
        <!-- bootswatch CDN -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/sketchy/bootstrap.min.css" integrity="sha384-RxqHG2ilm4r6aFRpGmBbGTjsqwfqHOKy1ArsMhHusnRO47jcGqpIQqlQK/kmGy9R" crossorigin="anonymous">
        <div class="row">
             <div class="col-sm-12">
                <h1 class="text-center bg-primary text-white" style="border-radius:10px;">Drones Library 🛩️</h1>
                <hr><br>
  
                 <!-- Alert Message -->
                 <button type="button" class="btn btn-success btn-sm" v-b-modal.drone-modal>Add drone</button>
                 <br><br>
                 <table class="table table-hover">
                    <!-- Table Head -->
                    <thead>
                      <tr>
                          <!-- Table header cells -->
                          <th scope="col">Model</th>
                          <th scope="col">Serial number</th>
                          <th scope="col">Diagonal length</th>
                          <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                          <tr v-for="drone, index in drones" :key= "index">                        
                            <td>{{ drone.model }}</td>
                            <td>{{ drone.serial_number }}</td>
                            <td>{{ drone.diagonal_length }}</td>
                            
                            <td>
                              <div class="btn-group" role="group">
                                <button type="button" class="btn btn-info btn-sm">Update</button>
                                <button type="button" class="btn btn-danger btn-sm">Delete</button>
                              </div>
                            </td>
                            
                        </tr>
                    </tbody>
                 </table>
                 <footer class="bg-primary text-white text-center" style="border-radius:10px;">Copyright &copy;. All Rights Reserved 2023.
                </footer>
             </div>
        </div>
        <!-- First Modal -->
        <b-modal ref="addDroneModal"
                      id="drone-modal"
                      title="Add a new drone" hide-backdrop hide-footer>
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  
        <b-form-group id = "form-model-group"
                        label="Model:"
                        label-for="form-Model-input">
        <b-form-input id="form-Model-input"
                            type="text"
                            v-model="addDroneForm.model"
                            required
                            placeholder = "Enter Drone"></b-form-input>
       </b-form-group>
  
                          <b-form-group id = "form-serial_number-group"
                        label="Serial_number:"
                        label-for="form-serial_number-input">
        <b-form-input id="form-serial_number-input"
                            type="text"
                            v-model="addDroneForm.serial_number"
                            required
                            placeholder = "Enter serial number"></b-form-input>
       
        
                          </b-form-group>
                    <!-- Checkbox -->
                    <!-- <b-form-group id="form-played-group">
                      <b-form-checkbox-group v-model="addDroneForm.diagonal_length" id="form-checks">
                        <b-form-checkbox value="true"> Is there diagonal length?</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group> -->
  
                    <b-form-group id = "form-diagonal_length-group"
                        label="Diagonal_length:"
                        label-for="form-diagonal_length-input">
        <b-form-input id="form-diagonal_length-input"
                            type="text"
                            v-model="addDroneForm.diagonal_length"
                            required
                            placeholder = "Enter diagonal length"></b-form-input>
       
        
                          </b-form-group>
  
  
  
          <!-- buttons: submit and reset -->
            <b-button type="submit" variant="outline-info">Submit</b-button>
            <b-button type="reset" variant="outline-danger">Reset</b-button>
  
  
  
  
        </b-form>    
  
  
        </b-modal>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  export default {
      data() {
        return {
          drones:[],
          addDroneForm: {
            model: "",
            serial_number: "",
            diagonal_length: 0,
          }
        };
      },
  
      methods: {
        // GET Function
        getDrones() {
          const path = 'http://localhost:5000/drones';
          axios.get(path)
          .then((res) => {
            this.drones = res.data;
            // console.log(this.drones);
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
          });
        },
        // POST Function
        addDrone(payload) {        // payload - whatever you will enter and submit
          const path = 'http://localhost:5000/drones';
          axios.post(path, payload)
          .then((res) => {
            this.getDrones();
          })
          .catch((err) => {
            console.error(err);
            this.getDrones();
          })
        },
  
        initForm() {
          this.addDroneForm.model = "";
          this.addDroneForm.serial_number = "";
          this.addDroneForm.diagonal_length = 0;
  
        },
  
  
        onSubmit(e) {
          e.preventDefault();
          this.$refs.addDroneModal.hide();
          // let diagonal_length = false;
          // if (this.addDroneForm.diagonal_length[0]) diagonal_length = true;
          const payload = {
              model: this.addDroneForm.model,
              serial_number: this.addDroneForm.serial_number,
              diagonal_length: this.addDroneForm.diagonal_length,
          };
          this.addDrone(payload);
          this.initForm;
        },
        onReset(e) {
          e.preventDefault(),
          this.$ref.addDroneModal.hide();
          this.initForm();
        }
      },
      created() {
        this.getDrones();
      }
  }
  </script>