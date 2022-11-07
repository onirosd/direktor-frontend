<template>
  <div class="flex flex-col">
    <span class="text-2xl sm:text-xl mb-8">Configura la frecuencia con la que se enviará el reporte del proyecto</span>
    <div class="w-[672px] sm:w-full">
      <div class="flex sm:flex-col justify-between items-center">
        <span class="text-base sm:mr-0 sm:mb-2 sm:w-full">Días de programación</span>
        <Select
          :indexVal="1"
          :typeVal="'text'"
          :placeHolder="'Selecciona'"
          :selType="'pro_days'"
          :class="'w-[352px] sm:w-full'"
          :options="[{value: 1, name: 'Lunes a viernes'}, {value: 2, name: 'Lunes a sábado'}]"
        />
      </div>
      <div class="flex mb-4 sm:mb-8">
          <input
            type="checkbox"
            name="quality_date"
            id="quality_date"
            value="quality_date"
            class="w-6 h-6 border border-[#8A9CC9] rounded mr-4 accent-orange"
          />
          <div>
            <label for="quality_date" class="text-sm leading-6 mb-1">Fecha de calidad</label>
            <div class="flex">
              <span class="mr-1 font-medium text-xs leading-5 text-[#8A9CC9]">
                *Opción válida para <span class="font-semibold text-[#002B6B]">PREMIUM</span>
              </span>
              <img src="../assets/images/icons/premium.svg" alt="">
            </div>
          </div>
      </div>
      <div>
        <div v-for="(report, index) in reports" :key="index">
          <div class="flex sm:flex-col justify-between items-center sm:mb-4">
            <span class="text-base sm:mr-0 sm:w-full sm:mb-2">Reporte a programar</span>
            <Select
              :indexVal="index"
              :typeVal="'text'"
              :placeHolder="'Reporte'"
              :selType="'report'"
              :class="'w-[352px] sm:w-full'"
              @selReport="selReport"
              :options="[{value: 1, name: 'Reporte de análisis de restricciones'}, {value: 2, name: 'Reporte de avance gráfico'}]"
            />
          </div>
          <div class="flex sm:flex-col justify-between items-center">
            <div class="flex sm:mb-2 sm:w-full">
              <img src="../assets/images/icons/toggle-on.svg" alt="" class="self-start mr-4">
              <span class="text-base sm:mr-0">Envío de reporte masivo</span>
            </div>
            <Select
              :indexVal="index"
              :typeVal="'text'"
              :placeHolder="'Frecuencia'"
              :selType="'frequent'"
              :class="'w-[352px] sm:w-full ' + ((report.reportSchedule !== '') ? 'hidden' : '')"
              :options="[{value: 1, name: 'Reporte de análisis de restricciones'}, {value: 2, name: 'Reporte de avance gráfico'}]"
            />
          </div>
          <div class="mt-6" :class="report.reportSchedule === '' ? 'hidden' : ''">
            <div v-for="(user, childIndex) in users" :key="childIndex">
              <div class="flex sm:flex-col justify-between mb-6 items-center" :class="report.applyAllStatus && childIndex > 0 ? 'hidden' : ''">
                <span class="text-base sm:mb-2 sm:w-full">{{ user }}</span>
                <Select
                  :indexVal="childIndex"
                  :typeVal="'text'"
                  :placeHolder="'Frecuencia'"
                  :selType="'frequency'"
                  :class="'w-[352px] sm:w-full'"
                  :options="[{value: 'daily', name: 'Diario'}, {value: 'interday', name: 'Interdiario'}, {value: 'fortnightly', name: 'Quincenal'}]"
                />
              </div>
              <div class="flex mb-6" v-if="childIndex === 0">
                <input
                  type="checkbox"
                  :name="'apply_all_' + index"
                  :id="'apply_all_' + index"
                  :value="'apply_all_' + index"
                  @input="applyAll(index)"
                  class="w-6 h-6 border border-[#8A9CC9] rounded mr-4 accent-orange"
                />
                <label :for="'apply_all_' + index" class="text-sm leading-6">Aplicar frecuencia para todos los usuarios de este reporte</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="font-medium text-xs leading-5" :class="paraStatus !== true ? 'hidden' : ''">*Para enviar reporte por participante, debes desactivar el envío masivo y tener una cuenta PREMIUM </span>
      <div class="flex cursor-pointer mt-8 mb-8" @click="addReport">
        <img
          src="../assets/images/icons/tooltip-person-add-active.svg"
          class="mr-2"
          alt=""
        />
        <span class="text-base leading-4 text-orange">Agregar nuevo reporte</span>
      </div>
    </div>
  </div>
</template>

<script>
import Select from "./Select.vue";
export default {
  name: 'third-step-component',
  components: {
    Select,
  },
  data: function() {
    return {
      paraStatus: true,
      users: [
        'lizeth@gmail.com',
        'andrea@gmail.com'
      ],
      reports: [
        {
          reportSchedule: '',
          applyAllStatus: false,
        },
      ],
    };
  },
  methods: {
    addReport: function() {
      var temp = {
        reportSchedule: '',
        applyAllStatus: false,
      };
      this.reports.push(temp);
    },
    selReport: function(payload) {
      this.reports[payload.indexVal].reportSchedule = payload.value;
      this.paraStatus = false;
      // console.log(this.reports);
    },
    applyAll: function(indexVal) {
      this.reports[indexVal].applyAllStatus = !this.reports[indexVal].applyAllStatus;
      console.log(this.reports);
    }
  }
}
</script>