<template>
    <div class="flex flex-col w-[450px] sm:w-full text-base">
      <span class="text-center sm:text-left text-[28px] leading-9 mb-10 sm:mb-8"> Iniciar Sesión</span>
      <span class="text-center sm:text-left text-[16px] leading-9 mb-10 sm:mb-8"> Indicanos tu correo y contraseña</span>
      <input type="text" v-model="user" placeholder="Ingresa tu correo" class="h-[52px] border border-[#8A9CC9] rounded px-4 mb-4">
      <input type="text" v-model="pass" placeholder="Ingresa tu contraseña" class="h-[52px] border border-[#8A9CC9] rounded px-4 mb-4">
      <div class="flex justify-between sm:flex-col sm:flex-col-reverse">
        <!-- <button class="border-2 border-[#EB5D00] rounded h-14 w-[212px] text-orange leading-4 sm:w-full">Atrás</button> -->
        <button class="bg-orange rounded h-14 w-[212px] text-white leading-4 sm:w-full sm:mb-4" @click="next">Ingresar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'login-view',
    methods: {
      next: function () {
        this.$router.push('/register/second');
      }
    },
    computed: {
      user: {
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
      pass: {
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
      }
      
    }
  }
  </script>