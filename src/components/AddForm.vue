<template>

  <div class="col-lg-12">
    <div class="col-lg-2 offset-lg-5">
      <h2>Add a book</h2>
    </div>
  </div>

  <form class="row  col-lg-8 offset-lg-2" id="mainAddForm" >

    <div class="col-lg-6">
      <div class="form-group col-lg-10 offset-lg-1">
        <label for="newTile">Title</label>
        <input type="text" class="form-control" id="newTitle" placeholder="new title" v-model="new_title">
      </div>

      <div class="form-group col-lg-10 offset-lg-1">
        <label for="newAuthor">Author</label>
        <input type="text" class="form-control" id="newAuthor" placeholder="new author" v-model="new_author">
      </div>

      <div class="form-group col-lg-10 offset-lg-1">
        <label for="newDate">Date</label>
        <input type="date" class="form-control" id="newDate" placeholder="new date" v-model="new_date">
      </div>

      <div class="form-group col-lg-10 offset-lg-1">
        <label for="newTag">Tag</label>
        <input type="text" class="form-control" id="newTag" placeholder="new tag" v-model="new_tag">
      </div>
    </div>

    <div class="col-lg-6">
      <div class="form-group col-lg-10 offset-lg-1">
        <label for="newSummary">Summary</label>
        <textarea type="textarea" class="form-control" id="newSummary" placeholder="new summary"
                  v-model="new_summary"></textarea>
      </div>

      <div class="form-group col-lg-10 offset-lg-1" style="opacity: .5">
        <label for="newImg">Image</label>
        <input type="file" accept="image/png" class="form-control" id="newImg" placeholder="Pick a picture" disabled>
      </div>


      <div class="form-group col-lg-10 offset-lg-1">
        <input type="range" id="newRating" class="form-control" name="newRating" min="0" max="10" v-model="new_rating">
        <!--      <input type="range" class="form-control" id="newRating" placeholder="new rate" v-model="new_rating">-->

        <label for="newRating"> {{ this.new_rating }}</label>

      </div>
    </div>


    <div id="actions" class="col-lg-8 offset-lg-2">
      <button class="btn btn-primary col-lg-2 offset-lg-3" v-on:click="add_item">Submit</button>
      <button type="reset" class="btn btn-primary col-lg-2 offset-lg-2" v-on:click="add_item">Reset</button>
    </div>


    <!--      <input type="number" class="form-control" id="newRating" placeholder="new title" v-model="new_rating">-->
    <!--      <input type="range" id="newRating" name="newRating"-->
    <!--             min="0" max="11"  v-model="new_rating">-->


  </form>


</template>

<script>
export default {
  name: "AddForm",
  data() {
    return {
      new_item: {},
      new_title: '',
      new_author: '',
      new_summary: '',
      new_img: '',
      new_date: '',
      new_rating: 5,
      new_tag: ''
    }
  },
  methods: {
    add_item() {

      // POST request using fetch with error handling
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: this.new_title,
          author: this.new_author,
          summary: this.new_summary,
          img: this.new_img,
          date: this.new_date,
          rating: this.new_rating,
          tag: this.new_tag,
        })
      };
      fetch('http://127.0.0.117:8080/book', requestOptions)
          .then(async response => {
            const data = await response.json();
            console.log(data)
            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            if (response.status !== 201) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
    },
  }
}
</script>

<style scoped>

.form-group {
  margin-top: 3%;
}

#actions {
  margin-top: 4%;
}

#mainAddForm{
  padding-bottom: 10%;
  border: 1px solid #3357B7;
  box-shadow: rgba(51,87,183, 0.55) 0px 5px 15px;
  margin-top: 2%; margin-bottom: 10%;
  height: 400px;


}


</style>