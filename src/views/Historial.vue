<template>
    <div>
        <h1>Historial</h1>
        <HistorialComponent/>
    </div>
</template>


<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import HistorialComponent from '@/components/HistorialComponent.vue'
@Component({
components: {
    HistorialComponent,
  },
})

export default class Order extends Vue{}
</script>

<style lang="">

</style>