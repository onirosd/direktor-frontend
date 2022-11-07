<template>
  <div class="flex flex-col">
    <span class="text-2xl mb-8">Crea tu primer proyecto</span>
    <div class="flex justify-between sm:flex-col">
      <div class="flex flex-col w-[48%] sm:w-full">
        <input
          type="text"
          placeholder="Nombre del proyecto*"
          v-model="projectName"
          class="h-[52px] w-full mb-4 border border-[#8A9CC9] rounded px-4"
        />
        <input
          type="text"
          placeholder="Empresa*"
          v-model="business"
          class="h-[52px] w-full mb-4 border border-[#8A9CC9] rounded px-4"
        />
        <input
          type="text"
          placeholder="Plazo"
          v-model="term"
          class="h-[52px] w-full mb-4 border border-[#8A9CC9] rounded px-4"
        />
        <div class="flex relative mb-4">
          <input
            type="text"
            placeholder="Área techada"
            v-model="coveredArea"
            class="h-[52px] w-full border border-[#8A9CC9] rounded pl-4 pr-[116px]"
          />
          <div
            class="flex absolute right-0 h-full justify-between items-center border-l border-[#8A9CC9] px-4"
          >
            <span class="font-normal text-base text-[#8A9CC9]">m2</span>
            <img
              src="../assets/images/icons/ic_arrow-down.svg"
              @click="handleClick('coveredArea')"
              class="transition"
              :class="coveredAreaStatus === true ? 'rotate-180' : ''"
              alt=""
            />
          </div>
        </div>
        <div class="flex relative mb-4">
          <input
            type="text"
            placeholder="Tipo de proyecto*"
            v-model="projectType"
            class="h-[52px] w-full border border-[#8A9CC9] rounded px-4"
          />
          <img
            src="../assets/images/icons/ic_arrow-down.svg"
            @click="handleClick('projectType')"
            :class="projectTypeStatus === true ? 'rotate-180' : ''"
            alt=""
            class="absolute top-1/2 -translate-y-1/2 right-4 transition"
          />
        </div>
        <div class="flex relative mb-4">
          <input
            type="text"
            placeholder="Distrito*"
            v-model="district"
            class="h-[52px] w-full border border-[#8A9CC9] rounded px-4"
          />
          <img
            src="../assets/images/icons/ic_arrow-down.svg"
            @click="handleClick('district')"
            :class="districtStatus === true ? 'rotate-180' : ''"
            alt=""
            class="absolute top-1/2 -translate-y-1/2 right-4 transition"
          />
        </div>
      </div>
      <div class="flex flex-col w-[48%] sm:w-full">
        <v-date-picker v-model="startDate" mode="date">
          <template v-slot="{ inputValue, inputEvents }">
            <input
              class="h-[52px] w-full mb-4 border border-[#8A9CC9] rounded px-4"
              placeholder="Fecha de inicio*"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </v-date-picker>
        <input
          type="text"
          placeholder="Monto referencial"
          v-model="referenceAmount"
          class="h-[52px] w-full mb-4 border border-[#8A9CC9] rounded px-4"
        />
        <input
          type="text"
          placeholder="Área techada"
          v-model="area"
          class="h-[52px] w-full mb-4 border border-[#8A9CC9] rounded px-4"
        />
        <input
          type="text"
          placeholder="Área construída"
          v-model="builtArea"
          class="h-[52px] w-full mb-4 border border-[#8A9CC9] rounded px-4"
        />
        <input
          type="text"
          placeholder="País*"
          v-model="country"
          class="h-[52px] w-full mb-4 border border-[#8A9CC9] rounded px-4"
        />
        <input
          type="text"
          placeholder="Dirección"
          v-model="address"
          class="h-[52px] w-full mb-4 border border-[#8A9CC9] rounded px-4"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "first-step-component",
  components: {
    
  },
  data: function () {
    return {
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
          key: 'today',
          // highlight: '##002B6B',
          highlight: true,
          dates: new Date(),
        },
      ]
    };
  },
  methods: {
    handleClick: function(param) {
      if (param === 'coveredArea') this.coveredAreaStatus = !this.coveredAreaStatus;
      else if (param === 'projectType') this.projectTypeStatus = !this.projectTypeStatus;
      else if (param === 'district') this.districtStatus = !this.districtStatus;
    },
  }
};
</script>
