<template>
    <div>
        <h1 style="text-aling:center">Carro de compras</h1>
        <CarroComponent/>
    </div>
</template>


<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import CarroComponent from '@/components/CarroComponent.vue'
@Component({
components: {
    CarroComponent,
  },
})

export default class Order extends Vue{}
</script>

<style lang="">

</style>