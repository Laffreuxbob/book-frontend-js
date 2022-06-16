<template>


  <div class="col-lg-10 offset-lg-1 row" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">

    <div class="col-lg-8" id="searchbar" style="border: 1px solid black; height: 50px">
      <label for="searchbar">Search :
        <input type="text" id="searchbar" name="searchbar" v-model="search">
      </label>
    </div>


<!--    <div class="col-lg-4 " style="border: 1px solid black">-->
<!--      <ul class="list-group">-->
<!--        <li v-on:click="this.current_author = item" class="list-group-item list-group-item-action"-->
<!--            v-for="item in authorList" v-bind:key="item">-->
<!--          {{ item }}-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->

<!--    <div class="col-lg-4 " id="author_menu">-->
<!--      <ul class="dropdown">-->
<!--        <li>Section1-->
<!--          <ul>-->
<!--            <li>Link</li>-->
<!--            <li>Link</li>-->
<!--            <li>Link</li>-->
<!--            <li>Link</li>-->
<!--            <li>Link</li>-->
<!--          </ul>-->
<!--        </li>-->
<!--      </ul>-->

<!--    </div>-->

<!--    <div class="col-lg-4 ">-->
<!--      <ul id="menu" class="col-lg-12">-->
<!--        <li><a href="#"> <button v-on:click="open_filter_menu">Filter</button></a>-->
<!--          <ul v-if="this.filter_list">-->
<!--            <li v-for="auth in authorList" v-bind:key="auth"><button v-on:click="cat_filter(auth)"> {{ auth }} </button></li>-->
<!--            <li ><a href="#" v-on:click="reset_filter"> all </a></li>-->
<!--          </ul>-->
<!--        </li>-->
<!--      </ul>-->

<!--    </div>-->

  </div>


  <div class="col-lg-10 offset-lg-1"
       style="border: 1px solid black; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; margin-top: 2%; margin-bottom: 10%;  height: 400px; overflow: auto">
    <table class="table" id="main_table">
      <thead style="position: sticky;top: 0; background-color: black; color: white;" class="thead-dark">
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Author</th>
        <th scope="col">Category</th>
        <th scope="col">Rating</th>
        <th scope="col" class="text-center">Actions</th>
      </tr>
      </thead>
      <tbody>
      <SingleItem v-for="item in items"
                  v-bind:key="item.title"
                  @single_delete="single_delete"
                  @single_update="single_update"
                  :item='item'
                  :search='search'/>
      </tbody>
    </table>
  </div>

</template>

<script>

import SingleItem from "@/components/Item";

export default {
  name: 'ItemList',
  components: {
    SingleItem
  },
  data() {
    return {
      items: [],
      search: '',
      authorList: [],
      current_author: '',
      filter_list: false,
    }
  },
  mounted() {
    fetch("http://127.0.0.117:8080/book")
        .then((response) => response.json())
        // server status test 200 ? good : bad
        .then((data) => {
          this.items = data;
        });
    fetch("http://127.0.0.117:8080/author")
        .then((response) => response.json())
        // server status test 200 ? good : bad
        .then((data) => {
          // for (const element of data) {
          //   console.log(element);
          // }
          this.authorList = data;
        });

  },
  methods: {
    debug(obj) {
      console.log(obj)
    },
    single_delete(obj) {
      this.items = this.items.reduce((previous, current) => (current._id !== obj._id && previous.push(current), previous), [])
    },
    single_update() {
      fetch("http://127.0.0.117:8080/book")
          .then((response) => response.json())
          .then((data) => {
            this.items = data;
          });
    },
    // open_filter_menu() {
    //   this.filter_list = !this.filter_list
    //   if(this.filter_list) {
    //     document.getElementById("main_table").setAttribute("class","col-lg-8")
    //     document.getElementById("main_table").style.zIndex = '1000';
    //
    //
    //   }else {
    //     document.getElementById("main_table").setAttribute("class","col-lg-12")
    //
    //   }
    // }
  }
}
</script>

<style scoped>
button {
  margin-left: 5%
}

::-webkit-scrollbar {
  display: none;
}

/*.dropdown {*/
/*  text-align: left;*/
/*  display: inline-block;*/
/*  margin: 0;*/
/*  padding: 0px 4px 0px 0px;*/
/*  list-style: none;*/
/*  z-index: 999;*/

/*}*/
/*.dropdown li {*/
/*  !*padding: 15px 20px;*!*/
/*  cursor: pointer;*/
/*  -webkit-transition: all 0.2s;*/
/*  -moz-transition: all 0.2s;*/
/*  -ms-transition: all 0.2s;*/
/*  -o-transition: all 0.2s;*/
/*  transition: all 0.2s;*/
/*}*/
/*.dropdown li:hover {*/
/*  background: #555;*/
/*  color: #fff;*/
/*}*/
/*.dropdown li ul {*/
/*  padding: 0;*/
/*  position: absolute;*/
/*  top: 18px;*/
/*  left: 0;*/

/*  -webkit-box-shadow: none;*/
/*  -moz-box-shadow: none;*/
/*  box-shadow: none;*/
/*  display: none;*/
/*  opacity: 0;*/
/*  visibility: hidden;*/
/*  -webkit-transiton: opacity 0.2s;*/
/*  -moz-transition: opacity 0.2s;*/
/*  -ms-transition: opacity 0.2s;*/
/*  -o-transition: opacity 0.2s;*/
/*  -transition: opacity 0.2s;*/
/*}*/
/*.dropdown li ul li {*/
/*  display: block;*/
/*  color: #000;*/
/*  padding-bottom: 5px;*/
/*}*/
/*.dropdown li ul li:hover {*/
/*  background: #666;*/
/*}*/
/*.dropdown li:hover ul {*/
/*  display: block;*/
/*  opacity: 1;*/
/*  visibility: visible;*/
/*}*/

/*//////////////////////////////////////////////////////*/
/* partie positionnement et déco */
/*#menu a {*/
/*  display: block;*/
/*  text-decoration: none;*/
/*}*/

/*table {*/
/*  display: block;*/
/*}*/

/*#menu:hover  table {*/
/*  display: none;*/
/*}*/


/*#menu > li,*/
/*#menu > li li {*/
/*  position: relative;*/
/*  display: inline-block;*/

/*}*/

/*#menu > li li {*/
/*  background: transparent none;*/
/*}*/

/*#menu > li li a {*/
/*  color: #444;*/
/*}*/

/*#menu > li li:hover {*/
/*  background-color: red;*/
/*}*/

/*#menu > li li:hover + #searchbar {*/
/*    background-color: red;*/
/*}*/

/*#menu > li:first-child {*/
/*  border-right: 1px solid #777;*/
/*  border-radius: 8px 0 0 8px;*/
/*}*/

/*#menu > li + li {*/
/*  border-left: 1px solid #aaa;*/
/*  border-right: 1px solid #777;*/
/*}*/

/*#menu > li:last-child {*/
/*  border-right: 0;*/
/*  border-left: 1px solid #aaa;*/
/*  border-radius: 0 8px 8px 0;*/
/*}*/

/*#menu > li:hover {*/
/*  background-color: #999;*/
/*  background-image: linear-gradient(#ccc, #aaa 50%, #999 50%, #bbb);*/
/*}*/

/*!* (presque) fin de la partie positionnement/déco *!*/
/*!* dans cette déclaration, on fixe le max-height *!*/
/*#menu ul {*/
/*  position: absolute;*/
/*  top: 2em;*/
/*  left: 0;*/
/*  max-height: 0em;*/

/*  overflow: hidden;*/
/*  transition: 1s max-height 0.3s;*/
/*  border-radius: 0 0 8px 8px;*/
/*}*/

/*!* ici on change la valeur de max-height au :hover *!*/
/*#menu > li:hover ul {*/
/*  !* à adapter, le minimum est le meilleur mais voyez large 😉 *!*/
/*  max-height: 13em;*/
/*}*/
</style>