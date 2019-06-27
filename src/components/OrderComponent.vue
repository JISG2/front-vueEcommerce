<template>
    <div>
        <v-stepper v-model="e1">
            <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Elige tu pizza</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">Llena tus datos</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Confirma tu pedido</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-chip color="orange" text-color="white">{{element.nombrePizza}}<v-icon right>fas fa-utensils</v-icon></v-chip>

                        <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Seleccione el tamaño de la pizza" required></v-select>
                    
                         <v-chip label color="pink" text-color="white" v-if="select=='Chica'">Precio: ${{element.precioBase+70}}<v-icon right>fas fa-dollar-sign</v-icon></v-chip>
                         <v-chip label color="pink" text-color="white" v-if="select=='Mediana'">Precio: ${{element.precioBase+100}}</v-chip>
                         <v-chip label color="pink" text-color="white" v-if="select=='Grande'">Precio: ${{element.precioBase+140}}</v-chip>
                         <br>
                        <v-btn color="primary" @click="e1 = 2"  :disabled="!valid">Continue</v-btn>
                        <v-btn flat color="error" to="/">Cancelar</v-btn>
                    </v-form> 
                </v-stepper-content>
            
                <v-stepper-content step="2">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Nombre" required></v-text-field>            
                        <!--<v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Seleccione el tamaño de la pizza" required></v-select>-->
                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                        <v-text-field v-model="number"  label="Número de teléfono" required></v-text-field>
                        <v-text-field v-model="direccion" label="Dirección" required></v-text-field>
                        <v-text-field v-model="referencias"  label="Referencias de la casa" required></v-text-field>                           
                        <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
                        <v-btn flat color="error" to="/">Cancelar</v-btn>
                    </v-form>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card>
                        <v-img src="https://www.dondeir.com/wp-content/uploads/2017/03/buffet-de-pizzas-en-cdmx-como-todo-que-puedas-por-149-pesos-3-1024x767.jpg" aspect-ratio="2.75"></v-img>
                        <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Resumen de pedido</h3>
                            <div> 
                                <h4>Pizza de peperoni</h4>
                                <p><label> Cantidad a pagar: $240.00</label></p>
                                <p>Dirección: Amelia Riveroll #42</p>
                                <p>Nombre de cliente: Jesús Israel Santiago Gutiérrez</p>
                                <p>Hora de entrega: 6:00 pm</p>
                            </div>
                        </div>
                        </v-card-title>
                    </v-card>
                    <v-btn color="primary" @click="e1 = 1">Confirmar pedido</v-btn>
                    <v-btn flat color="error" to="/">Cancelar</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
export default {
   props: ['id'],
    data: () => ({
      element: {
        id: null,
        nombrePizza: null,
        descripcion: null,
        imagen: null,
        precioBase: null
      },
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      number: '',
      direccion:'',
      referencias: '',
     
      select: null,
      items: [
        'Chica',
        'Mediana',
        'Grande'
      ],
      checkbox: false,
      e1: 0
    }),
    mounted () {
      this.getPizza()
    },
    methods: {
      getPizza(){
        this.$axios.get(`http://127.0.0.1:3333/api/v1/pizzas/${parseInt(this.$route.params.id)}`)
        .then((response) => {
          console.log(response.data)
          this.element.id = response.data.id
          this.element.nombrePizza =  response.data.nombrePizza
          this.element.descripcion = response.data.descripcion
          this.element.imagen = response.data.imagen
          this.element.precioBase = response.data.precioBase
        })
        .catch( (e) => {
          console.log(e)
        })
      }
    }
  }
</script>

<style lang="">

</style>
