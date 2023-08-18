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
              <b-alert variant="success" v-if="showMessage" show>{{ message }}</b-alert>

               <button type="button" class="btn btn-success btn-sm" v-b-modal.drone-modal>Add drone</button>
               <br><br>
               <table class="table table-hover">
                  <!-- Table Head -->
                  <thead>
                    <tr>
                        <!-- Table header cells -->
                        <th scope="col">Brand id</th>
                        <th scope="col">Brand name</th>
                        <th scope="col">Owner name</th>
                        <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                        <tr v-for="drone, index in drones" :key= "index">                        
                          <td>{{ drone.brand_id }}</td>
                          <td>{{ drone.brand_name }}</td>
                          <td>{{ drone.owner_name }}</td>
                          <td>
                            <div class="btn-group" role="group">
                              <button type="button" class="btn btn-info btn-sm" v-b-modal.drone-update-modal
                              @click="editDrone(drone)">Update</button>
                              <button type="button" class="btn btn-danger btn-sm"
                              @click="deleteDrone(drone)">Delete</button>
                            </div>
                          </td>
                          
                      </tr>
                  </tbody>
               </table>
               <footer class="bg-primary text-white text-center" style="border-radius:10px;">Copyright &copy;. All Rights Reserved 2023.
              </footer>
           </div>
      </div>
      <!-- Start of Modal 1 -->
      <b-modal ref="addDroneModal"
                    id="drone-modal"
                    title="Add a new drone" hide-backdrop hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">


         <!-- form group for brand_id entry -->
      <b-form-group id = "form-brand_id-group"
                      label="brand_id:"
                      label-for="form-brand_id-input">
      <b-form-input id="form-brand_id-input"
                          type="text"
                          v-model="addDroneForm.brand_id"
                          required
                          placeholder = "Enter Drone id"></b-form-input>
     </b-form-group>



        <!-- form group for brand_name entry -->
      <b-form-group id = "form-brand_name-group"
                      label="brand_name:"
                      label-for="form-brand_name-input">
      <b-form-input id="form-brand_name-input"
                          type="text"
                          v-model="addDroneForm.brand_name"
                          required
                          placeholder = "Enter Drone brand"></b-form-input>
     </b-form-group>

     <!-- form group for owner_name entry -->
                        <b-form-group id = "form-owner_name-group"
                      label="owner_name:"
                      label-for="form-owner_name-input">
      <b-form-input id="form-owner_name-input"
                          type="text"
                          v-model="addDroneForm.owner_name"
                          required
                          placeholder = "Enter owner name"></b-form-input>
                        </b-form-group>


        <!-- buttons: submit and reset -->
          <b-button type="submit" variant="outline-info">Submit</b-button>
          <b-button type="reset" variant="outline-danger">Reset</b-button>




      </b-form>    


      </b-modal>
      <!-- End of Modal 1 -->

      <!-- Start of Modal 2 -->
      <b-modal ref="editDroneModal"
                    id="drone-update-modal"
                    title="Update" hide-backdrop hide-footer>
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100"> 


        <b-form-group id = "form-brand_id-edit-group"
                      label="brand_id:"
                      label-for="form-brand_id-edit-input">
      <b-form-input id="form-brand_id-edit-input"
                          type="text"
                          v-model="editForm.brand_id"
                          required
                          placeholder = "Enter Drone id"></b-form-input>
     </b-form-group>


        <b-form-group id = "form-brand_name-edit-group"
                      label="brand_name:"
                      label-for="form-brand_name-edit-input">
      <b-form-input id="form-brand_name-edit-input"
                          type="text"
                          v-model="editForm.brand_name"
                          required
                          placeholder = "Enter Drone brand"></b-form-input>
     </b-form-group>

     <b-form-group id = "form-owner_name-edit-group"
                      label="owner_name:"
                      label-for="form-owner_name-edit-input">
      <b-form-input id="form-owner_name-edit-input"
                          type="text"
                          v-model="editForm.owner_name"
                          required
                          placeholder = "Enter Drone brand"></b-form-input>
     </b-form-group>

     <b-button-group>
     <b-button type="submit" variant="outline-info">Update</b-button>
     <b-button type="reset" variant="outline-danger">Cancel</b-button>
      </b-button-group>
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
          brand_id: null,
          brand_name: "",
          owner_name: "",
        },
        editForm: {
          brand_id: null,
          brand_name:"",
          owner_name:"",
        },
        showMessage: false,
      };
    },


    message : "",

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
          this.message = "Game Added !";              // we want to return this message alert
          this.showMessage = true;   // to show actual message
        })
        .catch((err) => {
          console.error(err);
          this.getDrones();
        })
      },

      initForm() {
        this.addDroneForm.brand_id = null;
        this.addDroneForm.brand_name = "";
        this.addDroneForm.owner_name = "";
        this.editForm.brand_id = null;
        this.editForm.brand_name = "";
        this.editForm.owner_name = "";
      },

      // This is for Modal 1 - to submit new drone
      onSubmit(e) {
        e.preventDefault();
        this.$refs.addDroneModal.hide();
        // let diagonal_length = false;
        // if (this.addDroneForm.diagonal_length[0]) diagonal_length = true;
        const payload = {
            brand_id: this.addDroneForm.brand_id,
            brand_name: this.addDroneForm.brand_name,
            owner_name: this.addDroneForm.owner_name,
        };
        this.addDrone(payload);
        this.initForm;
      },
      onReset(e) {
        e.preventDefault(),
        this.$refs.addDroneModal.hide();
        this.initForm();
      },

      // This is for Modal 2 = to submit updated drone
      onSubmitUpdate(e) {
        e.preventDefault();
        this.$refs.editDroneModal.hide();
        const payload = {
            brand_id: this.editForm.brand_id,
            brand_name: this.editForm.brand_name,
            owner_name: this.editForm.owner_name,
        };
        this.updateDrone(payload, this.editForm.brand_id)
      },
      // Handle cancel button click
      onResetUpdate(e) {
        e.preventDefault();
        this.$refs.editDroneModal.hide();
        this.initForm();
        this.getDrones();
      },

      // Update Individual Drone
      updateDrone(payload, brand_id) {
        const path = `http://localhost:5000/drones/${brand_id}`;
        axios.put(path, payload)
        .then(() => {
          this.getDrones();
          this.message = "Game Updated!"
          this.showMessage = true;
        })
        .catch((err) => {
          console.error(err);
          this.getDrones();
        });
      },
      // Delete Individual Drone
      removeDrone(brand_id) {
        const path = `http://localhost:5000/drones/${brand_id}`
        axios.delete(path)
        .then(() => {
          this.getDrones();
          this.message = "Drone Removed!"
          this.showMessage = true;
        })
        .catch((err) => {
          console.error(err);
          this.getDrones();
        });
      },

      // Handle update button
      editDrone(drone) {
        this.editForm = drone
      },
      // Handle delete button
      deleteDrone(drone) {
        this.removeDrone(drone.brand_id)
      }


    },
    created() {
      this.getDrones();
    }
}
</script>