<template>
  <div>
    <div
      class="h-full flex justify-center sm:items-start"
      v-if="projectLength === 0 && status === 0"
    >
      <div
        class="flex flex-col items-center w-[480px] sm:w-full mt-24 sm:mt-4 h-[312px] sm:h-[292px] p-16 sm:p-10 justify-center shadow-tooltip rounded-2xl bg-white cursor-pointer"
        :class="{ 'z-30': hint === 1 }"
        @click="nextStatus"
      >
        <img
          src="../../assets/images/icons/computer.svg"
          class="mb-8 sm:mb-6"
          alt=""
        />
        <span class="text-[28px] leading-9 text-center"
          >Crea tu primer proyecto</span
        >
      </div>
      <Hint
        :header="'Aquí crea tu primer proyecto'"
        :paragraph="'Dale click y podrás crear tu proyecto en menos de 5 minutos.'"
        :next="'Siguiente'"
        :icon="true"
        :bubbleCss="'before:bottom-full before:border-[9px] before:left-1/2 before:-translate-x-1/2 before:border-transparent	before:border-b-white before:-mb-[1px]'"
        :positionCss="'top-[520px] sm:top-[416px] left-1/2 sm:-translate-x-1/2'"
        v-if="hint === 1 && projectLength === 0"
      />
      <Hint
        :header="'Encuentra todos tus proyectos'"
        :paragraph="'Cuando los crees, aquí podrás encontrarlos junto a todo su detalle'"
        :next="'Siguiente'"
        :icon="true"
        :bubbleCss="'before:right-full before:border-[9px] before:top-[37%] before:-translate-y-1/2 before:border-transparent	before:border-r-white'"
        :positionCss="'top-[128.5px] sm:top-[416px] left-[280px]'"
        v-if="hint === 2 && projectLength === 0"
      />
      <Hint
        :header="'Proyectos en ejecución'"
        :paragraph="'Revisa el análisis de restricciones y control de obras de tus proyectos.'"
        :next="'Finalizar'"
        :icon="false"
        :bubbleCss="'before:right-full before:border-[9px] before:top-[25%] before:-translate-y-1/2 before:border-transparent	before:border-r-white'"
        :positionCss="'top-[240.5px] sm:top-[416px] left-[280px]'"
        v-if="hint === 3 && projectLength === 0"
      />
      <Confirm
        :confirmHeader="''"
        :header="'Invitación a proyecto'"
        :paragraphs="[
          'El usuario lizeth.marzano@gmail.com, te ha invitado a ser parte del proyecto BLANCO',
        ]"
        :buttons="['Rechazar Proyecto', 'Aceptar Proyecto']"
        v-if="hint === 4 && projectLength === 0"
        @closeModal="closeModal"
        @confirmStatus="confirmStatus"
      />
    </div>
    <Success
      :header="successHeader"
      :buttonStr="'Ver proyecto'"
      v-if="modalName === 'success'"
      @closeModal="closeModal"
    />
    <div class="flex flex-col" v-if="projectLength === 0 && status > 0 && status < 4">
      <ProjectBar :step="status" />
      <Breadcrumb :paths="['Inicio', 'Crear Proyecto']" :settingFlag="false" :class="'mt-16'" />
      <FirstStep :class="status === 1 ? '' : 'hidden'" />
      <SecondStep :class="status === 2 ? '' : 'hidden'" />
      <ThirdStep :class="status === 3 ? '' : 'hidden'" />
      <FooterStep :buttons="['Cancelar', 'Crear proyecto']" :flag="footerFlag" :text="'*Campos obligatorios'" @cancel="cancel" @next="nextStatus" />
    </div>
    <div class="flex flex-col" v-if="projectLength > 0 || status > 3">
      <Breadcrumb :paths="['Inicio', 'Tus Proyectos']" :settingFlag="false" />
      <Indicator
        :header="'Tus proyectos'"
        :paragraph="'Acá podrás visualizar tus proyectos creados y los datos más importantes. Podrás editarlo.'"
        :buttonText="'Crear proyecto'"
      />
      <div class="mb-8 border sm:border-0 border-[#D0D9F1] rounded-lg">
        <DataTable
          :tableType="'common'"
          :cols="headerCols"
          :rows="projectRows"
          class="sm:hidden"
        >
          <template v-slot="row">
            <ProjectTableRow :row="row" @openModal="openModal" />
          </template>
        </DataTable>
        <div class="sm:flex flex-col justify-center hidden">
          <SquareBox v-for="(row, index) in projectRows" :key="index">
            <div class="flex mb-4 mt-2">
              <span class="text-base">{{ row.projectName }}</span>
            </div>
            <div class="flex mb-2">
              <span class="text-xs leading-5 mr-1"
                >Fecha de inicio:
                <span class="font-medium">12/12/21</span></span
              >
            </div>
            <div class="flex flex-col mb-2 text-xs leading-5">
              <span>Equipo:</span>
              <span
                class="font-medium"
                v-for="(equipment, index) in row.equipments"
                :key="index"
              >
                {{ equipment }}
              </span>
            </div>
            <div class="flex mb-2">
              <span class="text-xs leading-5 mr-1"
                >Plazo: <span class="font-medium">5 años</span></span
              >
            </div>
            <div class="flex mb-4">
              <span class="text-xs leading-5 mr-1"
                >Área techada: <span class="font-medium">4000m2</span></span
              >
            </div>
            <div class="flex mb-2 justify-end text-orange text-sm leading-4">
              <span class="mr-4 cursor-pointer">Editar</span>
              <span class="mr-4">|</span>
              <span class="cursor-pointer">Ver</span>
            </div>
          </SquareBox>
        </div>
      </div>
      <AdvertisingBig :width="928" :height="100" />
      <Advertising />
    </div>
  </div>
</template>

<script>
import Hint from "@/components/Hint.vue";
import Confirm from "@/components/Confirm.vue";
import Success from "@/components/Success.vue";
import Breadcrumb from "@/components/Layout/Breadcrumb.vue";
import Indicator from "@/components/Layout/Indicator.vue";
import AdvertisingBig from "@/components/Layout/AdvertisingBig.vue";
import Advertising from "@/components/Layout/Advertising.vue";
import DataTable from "@/components/DataTable.vue";
import SquareBox from "@/components/SquareBox.vue";
import ProjectTableRow from "@/components/ProjectTableRow.vue";
import ProjectBar from "@/components/ProjectBar.vue";
import FirstStep from "@/components/FirstStep.vue";
import FooterStep from "@/components/FooterStep.vue";
import SecondStep from "@/components/SecondStep.vue";
import ThirdStep from "@/components/ThirdStep.vue";
export default {
  name: "project-view",
  components: {
    Hint,
    Confirm,
    Success,
    Breadcrumb,
    Indicator,
    AdvertisingBig,
    Advertising,
    DataTable,
    SquareBox,
    ProjectTableRow,
    ProjectBar,
    FirstStep,
    FooterStep,
    SecondStep,
    ThirdStep
},
  data: function () {
    return {
      modalName: "",
      footerFlag: true,
      status: 0,
      headerCols: {
        project_name: "Nombre del proyecto",
        data: "Datos",
        type: "Tipo ",
        equipment: "Equipo",
        action: "Acciones",
      },
    };
  },
  methods: {
    openModal: function (param) {
      this.modalName = param;
    },
    closeModal: function () {
      if (this.modalName === "") this.$store.commit("increaseHint");
      else this.modalName = "";
    },
    confirmStatus: function (payload) {
      if (!payload.param) {
        this.$store.commit("copyRestriction");
        this.successHeader = "¡Proyecto agregado con éxito!";
        this.openModal("success");
      } else {
        this.closeModal();
      }
    },
    nextStatus: function() {
      this.status ++;
      this.status > 1 && (this.footerFlag = false);
    },
    cancel: function() {
      this.status = 0;
    },
  },
  computed: {
    hint: function () {
      return this.$store.state.hint;
    },
    projectLength: function () {
      return this.$store.state.project_rows.length;
    },
    projectRows: function () {
      return this.$store.state.project_rows;
    },
  },
};
</script>
