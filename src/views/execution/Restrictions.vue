<template>
  <div>
    <Breadcrumb :paths="['Inicio', 'Análisis de restricciones']" :settingFlag="true" />
    <Indicator
      :header="'Análisis de restricciones'"
      :paragraph="'Acá podrás visualizar las restricciones de tus proyectos y entrar al detalle de cada uno'"
      :buttonText="'Ver indicadores'"
    />
    <div class="mb-8 border border-[#D0D9F1] rounded-lg">
      <DataTable
        :tableType="'common'"
        :cols="headerCols"
        :rows="rows"
        class="sm:hidden"
      >
        <template v-slot="row">
          <RestrictionTableRow
            :row="row"
            :users="users"
            @openModal="openModal"
          />
        </template>
      </DataTable>
      <div class="sm:flex flex-col justify-center md:hidden">
        <SquareBox v-for="(row, index) in rows" :key="index">
          <div class="flex justify-between items-center mb-4 mt-2">
            <span class="text-base">{{ row.projectName }}</span>
            <button
              class="h-8 border-2 border-[#EB5D00] rounded px-4 text-xs text-orange"
            >
              Ingresar
            </button>
          </div>
          <div class="flex mb-2">
            <span class="text-xs leading-5 mr-1"
              >Estado: {{ row.data ? "Abierto" : "Cerrado" }}</span
            >
            <img
              src="../../assets/images/icons/edit.svg"
              @click="openModal({ param: 'editStatus', id: row.id })"
              alt=""
            />
          </div>
          <div class="flex mb-2">
            <span class="text-xs leading-5 mr-1"
              >No retrasadas: {{ row.notDelayed }}</span
            >
          </div>
          <div class="flex mb-2">
            <span class="text-xs leading-5 mr-1"
              >Retrasadas: {{ row.delayed }}</span
            >
          </div>
          <div class="flex mb-2">
            <span class="text-xs leading-5 mr-1"
              >Equipo: {{ row.equipment }}</span
            >
          </div>
          <div class="flex mb-4">
            <span class="text-xs leading-5 mr-1">Acciones usuario:</span>
          </div>
          <div class="flex mb-2 justify-between">
            <div class="flex" @click="openModal({ param: 'add', id: row.id })">
              <img
                src="../../assets/images/icons/tooltip-person-add-active.svg"
                class="mr-1"
                alt=""
              />
              <span class="text-xs text-orange">Agregar</span>
            </div>
            <div class="flex" @click="openModal({ param: 'edit', id: row.id })">
              <img
                src="../../assets/images/icons/tooltip-edit-active.svg"
                class="mr-1"
                alt=""
              />
              <span class="text-xs text-orange">Editar</span>
            </div>
            <div
              class="flex"
              @click="openModal({ param: 'delete', id: row.id })"
            >
              <img
                src="../../assets/images/icons/tooltip-delete-active.svg"
                class="mr-1"
                alt=""
              />
              <span class="text-xs text-orange">Eliminar</span>
            </div>
          </div>
        </SquareBox>
      </div>
    </div>
    <AdvertisingBig :width="928" :height="100" />
    <Advertising />
    <AddPerson
      v-if="modalName === 'add'"
      @closeModal="closeModal"
      @addUser="addUser"
    />
    <EditPerson
      :users="users"
      v-if="modalName === 'edit'"
      @closeModal="closeModal"
      @editUser="editUser"
    />
    <DeletePerson
      :users="users"
      v-if="modalName === 'delete'"
      @closeModal="closeModal"
      @deleteUser="deleteUser"
    />
    <Success
      :header="successHeader"
      :buttonStr="'Entendido'"
      v-if="modalName === 'success'"
      @closeModal="closeModal"
    />
    <Confirm
      :confirmHeader="'Eliminar usuario'"
      :header="confirmAskingHeader"
      :paragraphs="confirmPagraphs"
      :buttons="confirmButtons"
      :val="confirmVal"
      v-if="modalName === 'confirm'"
      @closeModal="closeModal"
      @confirmStatus="confirmStatus"
    />
    <EditStatus
      v-if="modalName === 'editStatus'"
      :data="data"
      @closeModal="closeModal"
      @editStatusSave="editStatusSave"
    />
  </div>
</template>

<script>
import Breadcrumb from "@/components/Layout/Breadcrumb.vue";
import Indicator from "@/components/Layout/Indicator.vue";
import Advertising from "@/components/Layout/Advertising.vue";
import DataTable from "@/components/DataTable.vue";
import AdvertisingBig from "@/components/Layout/AdvertisingBig.vue";
import RestrictionTableRow from "@/components/RestrictionTableRow.vue";
import SquareBox from "@/components/SquareBox.vue";
import AddPerson from "@/components/AddPerson.vue";
import EditPerson from "@/components/EditPerson.vue";
import DeletePerson from "@/components/DeletePerson.vue";
import Success from "@/components/Success.vue";
import Confirm from "@/components/Confirm.vue";
import EditStatus from "@/components/EditStatus.vue";

export default {
  name: "restrictions-view",
  components: {
    Breadcrumb,
    Indicator,
    Advertising,
    DataTable,
    AdvertisingBig,
    RestrictionTableRow,
    SquareBox,
    AddPerson,
    EditPerson,
    DeletePerson,
    Success,
    Confirm,
    EditStatus,
  },
  data: function () {
    return {
      rowId: '',
      successHeader: "",
      modalName: "",
      confirmVal: "",
      confirmType: '',
      confirmHeader: "",
      confirmAskingHeader: "",
      confirmPagraphs: [],
      confirmButtons: [],
      headerCols: {
        analysis: "Análisis de restricciones",
        data: "Datos",
        project_name: "Nombre del proyecto",
        restriction: "Restricciones",
        equipment: "Equipo",
        action: "Acciones",
      },
    };
  },
  methods: {
    openModal: function (param) {
      if (typeof param !== "string") {
        this.rowId = param.id;
        param = param.param;
      }
      this.modalName = param;
    },
    closeModal: function () {
      this.modalName = "";
    },
    addUser: function(payload) {
      this.$store.commit({
        type: 'addUser',
        id: this.rowId,
        email: payload.email
      });
      this.closeModal();
    },
    editUser: function (payload) {
      this.$store.commit({
        type: 'editUser',
        id: this.rowId,
        users: payload.users
      });
      this.successHeader = "¡Cambios guardados con éxito!";
      this.openModal("success");
    },
    deleteUser: function(payload) {
      this.confirmHeader = "Eliminar usuario";
      this.confirmVal = payload.param;
      this.confirmAskingHeader = "¿Seguro que deseas eliminar al usuario "+ this.confirmVal +"?";
      this.confirmPagraphs = ['Si lo eliminas y luego lo necesitas tendrás que volver a agregarlo,'];
      this.confirmButtons = ['Sí, eliminar', 'No, mantener'];
      this.confirmType = 'deleteUser';
      this.openModal("confirm");
    },
    confirmStatus: function(payload) {
      if (!payload.param) {
        this.$store.commit({
          type: this.confirmType,
          id: this.rowId,
          email: this.confirmVal
        });
        this.successHeader = "¡Usuario eliminado con éxito!";
        this.openModal('success');
      } else {
        this.closeModal();
      }
    },
    editStatusSave: function() {
      this.$store.commit({
        type: 'toggleData',
        id: this.rowId
      });
      this.successHeader = "¡Estado cambiado con éxito!";
      this.openModal('success');
    }
  },
  computed: {
    rows: function() {
      return this.$store.state.restriction_rows;
    },
    users: function() {
      return this.$store.getters.users(this.rowId);
    },
    data: function() {
      return this.$store.getters.data(this.rowId);
    }
  },
};
</script>
