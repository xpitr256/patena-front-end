<template>
  <div class="footer">
    <div class="container p-5">
      <div class="row">
        <div class="col-4">
          <img src="../assets/uba.png" alt="UBA" width="225" />
          <p class="mt-1 mr-4">{{ $t("views.footer.uba") }}</p>
        </div>

        <div class="col-2">
          <h5>{{ $t("views.footer.navigation") }}</h5>
          <ul>
            <li>
              <router-link to="/about">
                {{ $t("views.components.navBar.menu.about") }}
              </router-link>
            </li>
            <li>
              <router-link to="/design">
                {{ $t("views.components.navBar.menu.design") }}
              </router-link>
            </li>
            <li>
              <router-link to="/results">
                {{ $t("views.components.navBar.menu.results") }}
              </router-link>
            </li>
            <li>
              <router-link to="/contact">
                {{ $t("views.components.navBar.menu.contact") }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="col-2">
          <h5>{{ $t("views.footer.usefulLinks") }}</h5>
          <ul>
            <li>
              <a href="http://www.laboratoriofisiologiaproteinas.tk/" target="_blank">
                {{ $t("views.footer.ourLab") }}
              </a>
            </li>
            <li>
              <a href="https://en.wikipedia.org/wiki/BLAST_(biotechnology)" target="_blank">
                {{ $t("views.footer.blast") }}
              </a>
            </li>
          </ul>
        </div>

        <div class="col-4">
          <h5 class="ml-4">{{ $t("views.footer.contactInfo") }}</h5>
          <p class="ml-4">
            Departamento de Química Biológica IQUIBICEN<br />
            Facultad de Ciencias Exactas y Naturales<br />
            Ciudad Universitaria, Pabellón II 4º Piso <br />
            CP: C1428EGA
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.footer {
  height: 200px;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -5px 7px -5px rgba(0, 0, 0, 0.18);
  background: linear-gradient(to bottom, #f0f0f0, white);
  color: darkgray;
}
a {
  color: #8c8c8c;
}
h5 {
  margin-bottom: 1em;
  font-weight: bold;
  color: gray;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  margin: 20px 0 20px 0;
  border-bottom: 1px solid #f0f0f0;
}
</style>
