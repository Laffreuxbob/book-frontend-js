<template>

  <tr v-show="show_in_table(item)">
    <td class="col-lg-4">
      <span v-show="!create_mode"> {{ item.title }}    </span>
      <span v-show="create_mode"> <input type="text" v-model="updated_title" :placeholder="item.title " class="col-lg-12"> </span>
    </td>
    <td class="col-lg-2">
      <span v-show="!create_mode"> {{ item.author }} </span>
      <span v-show="create_mode"> <input type="text" v-model="updated_author" :placeholder="item.author " class="col-lg-12"> </span>

    </td>
    <td class="col-lg-2">
      <span v-show="!create_mode"> {{ item.tag }} </span>
    </td>
    <td class="col-lg-1">
      <span v-show="!create_mode"> {{ item.rating }} </span>
    </td>

    <td class="col-lg-3" id="actions">

      <span>
        <button v-on:click="show_details()" class="btn btn-info col-lg-3 offset-lg-1 col-xs-12"> <i class="bi bi-plus-square-fill"></i>  </button>
        <button v-on:click="delete_item(item)" class="btn btn-danger col-lg-3 offset-lg-1 col-xs-12"> <i class="bi bi-trash-fill" style="color: black"></i> </button>
      </span>

      <span>
        <button v-on:click="update_item(item)" class="btn btn-warning col-lg-3 offset-lg-1 col-xs-12" v-show="!create_mode"> <i class="bi bi-pencil-fill"></i> </button>
        <button v-on:click="save_item(item)" class="btn btn-success col-lg-3 offset-lg-1 col-xs-12" v-show="create_mode"> <i class="bi bi-send"></i> </button>
<!--        <button v-on:click="debug()" class="btn btn-secondary col-lg-5 offset-lg-1 col-xs-12"> <i class="bi bi-gear-fill"></i> </button>-->
      </span>
    </td>
  </tr>

  <tr v-show="details">

      <td colspan="3">
        <span style="word-break: break-word;">
          {{ item.summary }}
        </span>
      </td>
<!--      <img src="../img/20000.jpg" alt="" style="width: 50px">-->
<!--    <div> {{ item }} </div>-->
<!--        <img :srcset="this.imgSource" v-bind:alt="item">-->
<!--      <img :src="require(`../img/${item.img}`)" v-bind:alt="item">-->
<!--    <img :src="this.img" style="width: 40px"/>-->
    <td  colspan="2" style="text-align: center;
  vertical-align: middle;">
      <ItemImg :img="item.img"/>

    </td>




  </tr>

</template>

<script>
import ItemImg from "@/components/ItemImg";
export default {
  name: "SingleItem",
  props: ['item', 'search'],
  emits: ["single_delete", "single_update"],
  components: {
    ItemImg
  },
  data () {
    return {
      create_mode: false,
      updated_title: '',
      updated_author: '',
      details: false,
      // img: require('@/assets/book_img/' + this.item.img)
    }
  },
  computed: {
    // iconUrl () {
    //   return require('../img')
    //   // The path could be '../assets/img.png', etc., which depends on where your vue file is
    // }
  },
  created () {

    // this.img = "../assets/book_img/" + this.item.img;
    // console.log(this.img)

  },
  methods: {
    debug() {
      console.log("test")
    },
    show_in_table(obj) {
       return obj.title.includes(this.search)
    },
    delete_item(obj){
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_to_delete: obj._id })
      };
      fetch('http://127.0.0.117:8080/book', requestOptions)
          .then(async response => {
            const data = await response
            console.log(data)
            console.log(data.body)

            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
          })
          .then(
              this.$emit('single_delete', obj)
          )
          .catch(error => {
            console.error('There was an error!', error);
          });
    },
    // show more than just title author
    show_details(){
      this.details = !this.details
    },
    // switch to "update an item form
    update_item() {
      this.create_mode = !this.create_mode
    },
    // update an item with new values in database
    save_item(obj) {
      this.create_mode = !this.create_mode;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_to_update: obj._id,
          updated_title: this.updated_title !== '' ? this.updated_title : obj.title,
          updated_author: this.updated_author !== '' ? this.updated_author : obj.author,
        })
      };
      fetch('http://127.0.0.117:8080/book', requestOptions)
          .then(
              async response => {
                if(response.status === 200) {
                  this.$emit('single_update')
                }
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
    },


    // loadimg(item) {
    //
    //
    // console.log(item.img)
    // return '../assets/book_img/20000.jpg'
    //   // img = "2000.png"
    //   // return('../assets/book_img/'+img)
    //   // return !img ? ('../assets/book_img/'+img) : "aa"
    //   // let images = require.('../assets/', false, /\.png$/)
    //   // return images('./' + pet + ".png")
    //   // console.log('../assets/book_img/'+img)
    //   // return require('../assets/book_img/'+img)
    // },


    // imgSource() {
    //     const baseName = "2000.png"
    //     return `${require(`@/assets/book_img/${this.baseName}_480.jpg`)} 480w, ${require(`@/assets/img/${this.baseName}_800.jpg`)} 800w`
    //
    // }
  }
}
</script>

<style scoped>
#actions:nth-child(1)  {
    margin-top: 10%;
}

.btn {

}
</style>