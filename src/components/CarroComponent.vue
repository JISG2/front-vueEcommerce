<template>
  <v-container>
     <v-layout row wrap>
        <v-flex xs12 mb4 sm4 pa-3 v-for='(element,i) in elements' :key='i' :element='element'>
                    <v-card class="elevation-4">
            <v-img v-bind:src=element.img height="200px"></v-img>
            <v-card-title primary-title>
              <div row>
                <div>
                  <div class="headline">{{element.nombre}}</div>
                </div>
                
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn color="success"  @click="orden(element.id,i)">Ordenar</v-btn>
              <v-btn color="error" @click="removePizza(i)">Eliminar</v-btn>
            </v-card-actions>
         </v-card>

        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {

    data (){
      return {
      elements: [],
      //carrito:[],
      element: {
        id: null,
        img: null,
        nombre: null
      }
      }

      
    },
    created () {
      this.getElements()
    },
    methods: {
      getElements () {
        this.elements = JSON.parse(localStorage.getItem('carro'));
      },
    removePizza(x) {
      this.elements.splice(x, 1);
      this.saveCarrito();
    },
    saveCarrito() {
      const parsed = JSON.stringify(this.elements);
      localStorage.setItem('carro', parsed);
      //this.elements = JSON.parse(localStorage.getItem('carro'));

    },
    orden(idPizza,i){
      
      this.$router.push({name:'order',params: {id: idPizza}})
      this.removePizza(i);
    }

    }

  }
</script>

<style>
  .v-expansion-panel{
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
  }
 
</style>
