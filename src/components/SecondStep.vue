<template>
  <div class="flex flex-col">
    <span class="text-2xl mb-8"
      >Asigna los miembros de tu primer proyecto
    </span>
    <div class="flex justify-between sm:flex-col mb-8">
      <div class="flex flex-col w-[32%] sm:w-full sm:mb-8">
        <span class="text-sm leading-6 mb-4"
          >Ingresa el correo del miembro</span
        >
        <input
          type="text"
          v-for="(user, index) in users"
          :key="index"
          placeholder="Correo electrónico"
          class="h-[52px] w-full mb-4 border border-[#8A9CC9] rounded px-4"
        />
      </div>
      <div class="flex flex-col w-[32%] sm:w-full sm:mb-8">
        <span class="text-sm leading-6 mb-4">Selecciona el rol</span>
        <Select
          v-for="(user, index) in users"
          :key="index"
          :indexVal="index"
          :typeVal="'text'"
          :placeHolder="'Selecciona*'"
          :selType="'role'"
          :options="[{value: 'editor', name: 'Editor'}, {value: 'visualizer', name: 'Visualizador'},]"
        />
      </div>
      <div class="flex flex-col w-[32%] sm:w-full">
        <span class="text-sm leading-6 mb-4"
          >Selecciona área al que pertenece</span
        >
        <Select
          v-for="(user, index) in users"
          :key="index"
          :indexVal="index"
          :typeVal="'text'"
          :placeHolder="'Selecciona*'"
          :selType="'area'"
          :options="[]"
        />
      </div>
    </div>
    <div class="flex cursor-pointer mb-8" @click="addUser">
      <img
        src="../assets/images/icons/tooltip-person-add-active.svg"
        class="mr-2"
        alt=""
      />
      <span class="text-base leading-4 text-orange">Agregar miembro</span>
    </div>
  </div>
</template>

<script>
import Select from "./Select.vue";
export default {
  name: "second-step-component",
  components: {
    Select,
  },
  data: function () {
    return {
      users: [],
      coveredAreaStatus: false,
      projectTypeStatus: false,
      districtStatus: false,
      projectName: "",
      business: "",
      term: "",
      coveredArea: "",
      projectType: "",
      district: "",
      startDate: "",
      referenceAmount: "",
      area: "",
      builtArea: "",
      country: "",
      address: "",
      attributes: [
        {
          key: "today",
          // highlight: '##002B6B',
          highlight: true,
          dates: new Date(),
        },
      ],
    };
  },
  methods: {
    handleClick: function (param) {
      if (param === "coveredArea")
        this.coveredAreaStatus = !this.coveredAreaStatus;
      else if (param === "projectType")
        this.projectTypeStatus = !this.projectTypeStatus;
      else if (param === "district") this.districtStatus = !this.districtStatus;
    },
    addUser: function () {
      var temp = {
        email: "",
        role: "",
        area: "",
      };
      this.users.push(temp);
    },
  },
};
</script>
