<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 mb12 sm12 >
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
                          <v-chip color="orange" text-color="white">{{element.nombrePizza}}<!-- <v-icon right>fas fa-utensils</v-icon> --></v-chip>
                          <v-flex mb3 xs3 sm3>
                          <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Seleccione el tamaño de la pizza" required></v-select>
                          </v-flex>
                          <v-chip label color="pink" text-color="white" v-if="select=='Chica'">Precio: ${{element.precioBase+70}}<v-icon right>fas fa-dollar-sign</v-icon></v-chip>
                          <v-chip label color="pink" text-color="white" v-if="select=='Mediana'">Precio: ${{element.precioBase+100}}</v-chip>
                          <v-chip label color="pink" text-color="white" v-if="select=='Grande'">Precio: ${{element.precioBase+140}}</v-chip>
                          <br>
                          <v-btn color="primary" @click="e1 = 2"  :disabled="!valid">Continue</v-btn>
                          <v-btn flat color="error" to="/">Cancelar</v-btn>
                      </v-form> 
                  </v-stepper-content>
              
                  <v-stepper-content step="2">
                    <v-flex mb6 xs6 sm6>
                      <v-form ref="form" v-model="valid" lazy-validation>
                          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Nombre" required></v-text-field>      
                          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                          <v-text-field v-model="number"  label="Número de teléfono" required></v-text-field>
                          <v-text-field v-model="direccion" label="Dirección" required></v-text-field>
                          <v-text-field v-model="referencias"  label="Referencias de la casa" required></v-text-field>                           
                          <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
                          <v-btn flat color="error" to="/">Cancelar</v-btn>
                      </v-form>
                    </v-flex>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                      <v-card >
                          <v-flex mb12 xs12 sm12> <v-img v-bind:src=element.imagen height="350px"></v-img> </v-flex>
                          <v-card-title primary-title>
                          <div>
                              <h3 class="headline mb-0">Resumen de pedido</h3>
                              <div> 
                                  <h4>{{element.nombrePizza}}</h4>
                                  <p>Total a pagar: </p>
                                    <v-chip label color="blue"  text-color="white" v-if="select=='Chica'">{{element.precioBase+70}}</v-chip>
                                    <v-chip label color="blue" text-color="white" v-if="select=='Mediana'">{{element.precioBase+100}}</v-chip>
                                    <v-chip label color="blue" text-color="white" v-if="select=='Grande'">{{element.precioBase+140}}</v-chip>

                                  <p>Dirección: {{this.direccion}} </p>
                                  <p>Nombre de cliente: {{name}}</p>
                                  <br>
                                  <v-flex mb12 xs12 sm12><div ref="card" style="height:25px"></div></v-flex>        
                              </div>
                          </div>
                          </v-card-title>
                          
                      </v-card>
                      <v-btn color="primary" @click="purchase()">Pagar</v-btn>
                      <v-btn flat color="error" to="/">Cancelar</v-btn>
                  </v-stepper-content>
              </v-stepper-items>
          </v-stepper>
        </v-flex>
      </v-layout> 
    </v-container>
</template>

<script >
  let stripe = Stripe(`pk_test_A3HPbgLUn9WGCzVBx9WGq9zu00Yfdl0ge0`),
    elements = stripe.elements(),
    card = undefined;
export default {
      mounted: function () {
    card = elements.create('card',{hidePostalCode: true});
    card.mount(this.$refs.card);
    
    },
   props: ['id'],
    data: () => ({
      date: '',
      element: {
        id: null,
        nombrePizza: null,
        descripcion: null,
        imagen: '',
        precioBase: null
      },
      valid: true,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],number:'',direccion:'',referencias:'',totalPago:null,
      select: null,
      items: [
        'Chica',
        'Mediana',
        'Grande'
      ],
      tokenPago:'',
      checkbox: false,
      e1: 0
    }),
    created (){
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
      },
     async purchase () {
       let token;
      await  stripe.createToken(card).then(function(result) {
         token = result.token.id;
          if (result.error) {
            self.hasCardErrors = true;
            self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
            return;
          }
          
        });
        console.log(token)
        this.tokenPago = token
        this.submit()        
      },
      submit (){
        let pago;
        this.date = new Date()
        this.date =new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getHours(),this.date.getMinutes(),this.date.getSeconds(),this.date.getDate()).toISOString().split('T')[0]
        if(this.select === 'Chica'){
          pago = this.element.precioBase+70
        }
        if(this.select === 'Mediana'){
          pago = this.element.precioBase+100
        }
        if(this.select === 'Grande'){
          pago = this.element.precioBase+140
        }
        this.$axios.post(`http://127.0.0.1:3333/api/v1/ordenes`,{
          nombre: this.name,
          correo: this.email,
          direccion: this.direccion,
          telefono: this.number,
          tokenPago: this.tokenPago,
          fecha: this.date,
          cantidadPizzas: 1,
          totalPago: pago

        }).then((reponse)=>{
          console.log(reponse)
        }).catch( (e) => {
          console.log(e)
        })
      }
    }
  }
</script>

<style lang="">

</style>
