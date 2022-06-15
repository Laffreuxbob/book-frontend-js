<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand">Books</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <router-link to="/"> Home</router-link>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">
            <router-link to="/list"> List</router-link>
          </a>
        </li>

                <li class="nav-item">
                  <a class="nav-link" href="#"> <router-link to="/add"> Add </router-link></a>
                </li>


        <!--        <li class="nav-item">-->
        <!--&lt;!&ndash;          <a class="nav-link" href="#"> Stats </a>&ndash;&gt;-->
        <!--          <router-link to="/Stats"> Stats </router-link>-->
        <!--        </li>-->

        <!--        <li class="nav-item dropdown">-->
        <!--          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
        <!--            Language-->
        <!--          </a>-->
        <!--          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">-->
        <!--            <a class="dropdown-item" href="#">English</a>-->
        <!--            <a class="dropdown-item" href="#">Francais</a>-->
        <!--          </div>-->
        <!--        </li>-->
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

</style>