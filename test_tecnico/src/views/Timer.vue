<template>
  <div class="Timer">
    <div class="container has-text-centered">
      <p class="title mb-3">Temporizador</p>
      <p class="subtitle mb-6 mt-3">Introduzca el tiempo en segundos</p>
    </div>
    <div>
      <div class="container has-text-centered custom-width">
        <b-numberinput type="is-success" v-model="duracion" v-if="setTimerVisible" min="1"
          @keyup.enter="actualizarDuracion"></b-numberinput>
      </div>
      <div class="container has-text-centered mt-2">
        <b-field label="Tiempo">
          <b-button @click="actualizarDuracion" v-if="setTimerVisible" class="mt-2 custom-color" rounded>Fijar
            tiempo</b-button>
        </b-field>
      </div>
    </div>
    <div id="controles" v-if="controlVisible" class="container has-text-centered ">
      <p class="is-size-1">{{ tiempoFormateado }}</p>
      <b-button class="mr-2 is-success rounded" @click="iniciar" :disabled="!enPausa">Iniciar</b-button>
      <b-button class="mr-2 is-danger rounded" @click="pausar" :disabled="enPausa">Pausar</b-button>
      <b-button class="mr-2 is-info rounded" @click="limpiar">Limpiar</b-button>
      <b-button class="mr-2 is-info rounded" @click="nuevoTimer">Nuevo timer</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "timer",
  data() {
    return {
      duracion: 1,
      tiempo: 1,
      enPausa: true,
      controlVisible: false,
      setTimerVisible: true,
    };
  },
  computed: {
    tiempoFormateado() {
      const horas = Math.floor(this.tiempo / 3600);
      const minutos = Math.floor((this.tiempo % 3600) / 60);
      const segundos = this.tiempo % 60;
      return `${this.pad(horas)}:${this.pad(minutos)}:${this.pad(segundos)}`;
    },
  },
  methods: {
    iniciar() {
      this.enPausa = false;
      this.contador();
    },
    pausar() {
      this.enPausa = true;
    },
    limpiar() {
      this.enPausa = true;
      this.tiempo = this.duracion;
    },
    contador() {
      if (!this.enPausa && this.tiempo > 0) {
        setTimeout(() => {
          this.tiempo--;
          this.contador();
        }, 1000);
      }
    },
    pad(valor) {
      return valor.toString().padStart(2, '0');
    },
    actualizarDuracion() {
      this.tiempo = this.duracion;
      this.enPausa = true;
      this.controlVisible = true;
      this.setTimerVisible = false;
    },
    nuevoTimer() {
      this.setTimerVisible = true;
      this.controlVisible = false;
      this.duracion = 1;
    }
  },
};
</script>
<style>
.custom-width {
  max-width: 50%;
}

.custom-color {
  color: aliceblue;
}</style>