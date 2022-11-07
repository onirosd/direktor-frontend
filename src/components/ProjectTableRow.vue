<template>
  <tr>
    <td>{{ row.projectName }}</td>
    <td>{{ row.data ? `Abierto` : `Cerrado` }}</td>
    <td>{{ row.data ? `Abierto` : `Cerrado` }}</td>
    <td>
      <span class="flex flex-col">
        <span v-for="(equipment, index) in row.equipments" :key="index">{{
          equipment
        }}</span>
      </span>
    </td>
    <td>
      <span class="flex flex-col text-xs text-orange">
        <span class="cursor-pointer">Editar</span>
        <span class="cursor-pointer">Ver</span>
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: "project-table-row-component",
  props: {
    row: Object,
  },
  methods: {
    handleClick: function () {
    },
  },
};
</script>
