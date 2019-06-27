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
                        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Especialidad" required></v-text-field>            
                        <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Seleccione el tamaño de la pizza" required></v-select>
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
                                  <div ref="card"></div>
                    </v-card>
                    <v-btn color="primary" @click="purchase()">Pagar</v-btn>
                    <v-btn flat color="error" to="/">Cancelar</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script >
  let stripe = Stripe(`pk_test_l5Lgd9sjHUXFMGNkxltOGpvr00CXjGXixV`),
    elements = stripe.elements(),
    card = undefined;
export default {
      mounted: function () {
    card = elements.create('card',{hidePostalCode: true});
    card.mount(this.$refs.card);
    
    },
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
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],number:'',direccion:'',referencias:'',
      select: null,
      items: [
        'Chica - $120.00',
        'Mediana - $180.00',
        'Grande - $220.00',
        'Mega - $280.00'
      ],
      checkbox: false,
      e1: 0
    }),
    methods: {
      getPizza(){
        this.$axios.get(`http://127.0.0.1:3333/api/v1/pizzas`)
        .then((response) => {
          //console.log(response.data)
          this.elements = response.data
        })
        .catch( (e) => {
          console.log(e)
        })
      }
      ,
            purchase () {
        stripe.createToken(card).then(function(result) {
          console.log("resultado: ",result)
          if (result.error) {
            self.hasCardErrors = true;
            self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
            return;
          }
        });
    }
    }
  }
</script>

<style lang="">

</style>
