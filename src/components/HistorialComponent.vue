<template>
  <div>
    <v-data-table :headers="headers" :items="elements" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.nombre }}</td>
        <td class="text-xs-left">{{ props.item.pizza }}</td>
        <td class="text-xs-left">{{ props.item.correo }}</td>
        <td class="text-xs-left">{{ props.item.direccion }}</td>
        <td class="text-xs-left">{{ props.item.telefono }}</td>
        <td class="text-xs-left">{{ props.item.totalPago }}</td>
        <td class="text-xs-left">{{ props.item.fecha }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script >
  export default {
   data: ()=>({
     elements: [],
      headers: [
        {
          text: 'Ordenes de pizzas',
          align: 'left',
          sortable: false,
          value: 'nombre'
        },
         { text: 'Pizza', value: 'pizza' },
        { text: 'Correo', value: 'correo' },
        { text: 'Dirección', value: 'direccion' },
        { text: 'Teléfono', value: 'telefono' },
        { text: 'Total de pago', value: 'totalPago' },
        { text: 'Fecha', value: 'fecha' }
      ],
    }),
    created () {
      this.getElements()
    },
    methods: {
      getElements () {
      this.$axios.get(`https://api-pizza-adonis.herokuapp.com/api/v1/ordenes`)
      .then(response => {
        console.log(response.data)
        this.elements = response.data
      })
      .catch( e => {
        console.log(e)
      })
    },
    }
  }


</script>