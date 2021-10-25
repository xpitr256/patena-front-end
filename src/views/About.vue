<template>
  <div class="container wrapper mb-4">
    <div class="jumbotron mt-4">
      <h1 class="display-4">{{ $t("views.about.title") }}</h1>
      <p class="lead">{{ $t("views.about.description") }}</p>
    </div>
    <div class="row">
      <div class="col-4">
        <ul class="list-group">
          <li class="list-group-item list-group-item-secondary"><h5>Ignacio E. Sánchez</h5></li>
          <li class="list-group-item list-group-item-light">Investigador que co-organiza cursos en Biología
            sintética y es "Profesor Adjunto" en la UADE, para la materia Biología de Sistemas en la Licenciatura en bioinformática. También fue "Jefe de trabajos prácticos" en las materias "Química Biológica I" y "Química Biológica IIB" del Departamento de Química Biológica (FCEyN, Universidad de Buenos Aires)
          </li>
        </ul>
      </div>
        <div class="col-4">
            <ul class="list-group">
          <li class="list-group-item list-group-item-secondary"><h5>Diego U. Ferreiro</h5></li>
          <li class="list-group-item list-group-item-light">Profesor Adjunto en el Departamento de Química Biológica (FCEyN, Universidad de Buenos Aires), en la materia "Bioquímica Avanzada". También fue "Jefe de trabajos prácticos" en el Departamento de Fisiología y Biología Molecular y Celular (FCEyN, Universidad de Buenos Aires).</li>
            </ul>
        </div>
        <div class="col-4">
            <ul class="list-group">
          <li class="list-group-item list-group-item-secondary"><h5>Ignacio Eguinoa</h5></li>
          <li class="list-group-item list-group-item-light">Analista programador egresado de la Universidad Nacional de
            La Plata. Uno de los principales colabores del proyecto Patena con su tesis titulada "Implementación de una
            herramienta bioinformática para el
            diseño de secuencias linker" </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about"
};
</script>

<style scoped>
    #centrador{
        position: relative;

    }

    #imagen{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
</style>

