<template>
  <div class="flex flex-col w-[450px] sm:w-full text-base">
    <span class="text-center sm:text-left text-[28px] leading-9 mb-10 sm:mb-8">¡Registrate gratis!</span>
    <input type="text" v-model="firstName" placeholder="Ingresa tu nombre" class="h-[52px] border border-[#8A9CC9] rounded px-4 mb-4">
    <input type="text" v-model="lastName" placeholder="Ingresa tu apellido" class="h-[52px] border border-[#8A9CC9] rounded px-4 mb-4">
    <input type="text" v-model="phoneNumber" placeholder="Número  de celular" class="h-[52px] border border-[#8A9CC9] rounded px-4 mb-4">
    <input type="text" v-model="companyName" placeholder="Nombre de la empresa" class="h-[52px] border border-[#8A9CC9] rounded px-4 mb-4">
    <input type="text" v-model="position" placeholder="Cargo" class="h-[52px] border border-[#8A9CC9] rounded px-4 mb-4">
    <input type="text" v-model="businessMail" placeholder="Correo empresarial" class="h-[52px] border border-[#8A9CC9] rounded px-4 mb-10 sm:mb-8">
    <div class="flex justify-between sm:flex-col sm:flex-col-reverse">
      <button class="border-2 border-[#EB5D00] rounded h-14 w-[212px] text-orange leading-4 sm:w-full">Atrás</button>
      <button class="bg-orange rounded h-14 w-[212px] text-white leading-4 sm:w-full sm:mb-4" @click="next">Siguiente</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'first-register-view',
  methods: {
    next: function () {
      this.$router.push('/register/second');
    }
  },
  computed: {
    firstName: {
      get: function() {
        return this.$store.state.registerData.firstName;
      },
      set: function(value) {
        this.$store.commit({
          type: 'updateRegisterData',
          attr: 'firstName',
          value: value
        });
      }
    },
    lastName: {
      get: function() {
        return this.$store.state.registerData.lastName;
      },
      set: function(value) {
        this.$store.commit({
          type: 'updateRegisterData',
          attr: 'lastName',
          value: value
        });
      }
    },
    phoneNumber: {
      get: function() {
        return this.$store.state.registerData.phoneNumber;
      },
      set: function(value) {
        this.$store.commit({
          type: 'updateRegisterData',
          attr: 'phoneNumber',
          value: value
        });
      }
    },
    companyName: {
      get: function() {
        return this.$store.state.registerData.companyName;
      },
      set: function(value) {
        this.$store.commit({
          type: 'updateRegisterData',
          attr: 'companyName',
          value: value
        });
      }
    },
    position: {
      get: function() {
        return this.$store.state.registerData.position;
      },
      set: function(value) {
        this.$store.commit({
          type: 'updateRegisterData',
          attr: 'position',
          value: value
        });
      }
    },
    businessMail: {
      get: function() {
        return this.$store.state.registerData.businessMail;
      },
      set: function(value) {
        this.$store.commit({
          type: 'updateRegisterData',
          attr: 'businessMail',
          value: value
        });
      }
    },
  }
}
</script>