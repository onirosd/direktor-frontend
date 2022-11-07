import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    hint: 1,
    menu: false,
    count: 1,
    project_rows: [],
    restriction_rows: [
      {
        id: 1,
        data: true,
        projectName: "Proyecto Blanco",
        restriction: {
          delayed: 20,
          notDelayed: 55,
        },
        equipments: ["Lizeth Marzano"],
        users: [
          "lizeth.marzano-1@gmail.com",
          "sandra-gomez-1@gmail.com",
          "carla-gomez-1@gmail.com",
        ],
      },
      {
        id: 2,
        data: false,
        projectName: "Proyecto Negro",
        restriction: {
          delayed: 60,
          notDelayed: 40,
        },
        equipments: ["Lizeth Marzano", "Sandra Gomez"],
        users: [
          "lizeth.marzano-2@gmail.com",
          "sandra-gomez-2@gmail.com",
          "carla-gomez-2@gmail.com",
        ],
      },
    ],
    whiteproject_rows: [
      {
        id: 1,
        name: "Frente 1",
        isOpen: false,
        info: [
          {
            id: 1,
            name: "Fase 1",
            notDelayed: 55,
            delayed: 20,
            tableData: [],
            hideCols: [],
          },
          {
            id: 2,
            name: "Fase 2",
            notDelayed: 55,
            delayed: 20,
            tableData: [
              {
                exercise: "Lorem ipsum dolor sit amet, consectetu...",
                restriction: "Lorem ipsum dolor sit amet, consectetu...",
                date_required: "23/07/2020",
                responsible: "Lizeth Marzano",
                responsible_area: "Arquitectura",
                applicant: "Lizeth Marzano",
              },
            ],
            hideCols: [],
          },
        ],
      },
      {
        id: 2,
        name: "Frente 2",
        isOpen: false,
        info: [
          {
            id: 1,
            name: "Fase 2-1",
            notDelayed: 55,
            delayed: 20,
            tableData: [
              {
                exercise: "Lorem ipsum dolor sit amet, consectetu...",
                restriction: "Lorem ipsum dolor sit amet, consectetu...",
                date_required: "23/07/2020",
                responsible: "Lizeth Marzano",
                responsible_area: "Arquitectura",
                applicant: "Lizeth Marzano",
              },
            ],
            hideCols: [],
          },
          {
            id: 2,
            name: "Fase 2-2",
            notDelayed: 55,
            delayed: 20,
            tableData: [],
            hideCols: [],
          },
        ],
      },
      {
        id: 3,
        name: "Frente 3",
        isOpen: false,
        info: [],
      },
    ],
    registerData: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      companyName: '',
      position: '',
      businessMail: '',
      plan: 'free',
      payType: '',
      cardInfo: {
        cardHolder: '',
        cardNumber: '',
        expireDate: '',
        cvc: '',
      }
    }
  },
  getters: {
    users: (state) => (id) => {
      const row = state.restriction_rows.find((row) => row.id === id);
      if (typeof row === "undefined") return [];
      return row.users;
    },
    data: (state) => (id) => {
      const row = state.restriction_rows.find((row) => row.id === id);
      if (typeof row === "undefined") return false;
      return row.data;
    },
    tableData: (state) => (payload) => {
      const row = state.whiteproject_rows.find((row) => row.id === payload.id);
      if (typeof row === "undefined") return [];
      const item = row.info.find((item) => item.id === payload.phaseId);
      if (typeof item === "undefined") return [];
      return item.tableData;
    },
    getWhiteprojectRows: (state) => {
      return state.whiteproject_rows;
    },
    hideCols: (state) => (payload) => {
      const row = state.whiteproject_rows.find((row) => row.id === payload.id);
      if (typeof row === "undefined") return [];
      const item = row.info.find((item) => item.id === payload.phaseId);
      if (typeof item === "undefined") return [];
      return item.hideCols;
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    increaseHint(state) {
      state.hint++;
      state.menu = true;
      state.hint >= 4 && (state.menu = false);
    },
    copyRestriction(state) {
      state.project_rows = [...state.restriction_rows];
    },
    toggleMenu(state) {
      state.menu = !state.menu;
    },
    toggleData(state, payload) {
      state.restriction_rows.find((row) => row.id === payload.id).data =
        !state.restriction_rows.find((row) => row.id === payload.id).data;
    },
    addUser(state, payload) {
      state.restriction_rows
        .find((row) => row.id === payload.id)
        .users.push(payload.email);
      return "ok";
    },
    editUser(state, payload) {
      state.restriction_rows.find((row) => row.id === payload.id).users =
        payload.users;
    },
    deleteUser(state, payload) {
      const users = state.restriction_rows.find(
        (row) => row.id === payload.id
      ).users;
      var ind;
      for (var i = 0; i < users.length; i++) {
        if (users[i] === payload.email) {
          ind = i;
        }
      }
      users.splice(ind, 1);
    },
    setFilterColumn(state, payload) {
      var tempAry = ['date_required', 'responsible', 'responsible_area', 'condition', 'applicant'];
      var ind = tempAry.indexOf(payload.filterId);
      if (ind > -1) {
        tempAry.splice(ind, 1);
        const rows = state.whiteproject_rows;
        for (var i = 0; i < rows.length; i ++) {
          for (var j = 0; j < rows[i].info.length; j ++) {
            // console.log(rows[i].info[j])
            rows[i].info[j]['hideCols'] = tempAry;
          }
        }
      }
    },
    setHideCols(state, payload) {
      state.whiteproject_rows
        .find((row) => row.id === payload.frontId)
        .info.find((item) => item.id === payload.phaseId).hideCols =
        payload.hideCols;
    },
    addFront(state, payload) {
      const id = Math.round(Math.random() * 10000);
      if (payload.frontId === '') {
        const temp = {
          id: id,
          name: payload.frontName,
          isOpen: false,
          info: [],
        };
        state.whiteproject_rows.push(temp);
      } else {
        const row = state.whiteproject_rows.find((row) => row.id === payload.frontId);
        const temp = {
          id: id,
          name: payload.phaseName,
          notDelayed: 0,
          delayed: 0,
          tableData: [
            {
              exercise: "Lorem ipsum dolor sit amet, consectetu...",
              restriction: "Lorem ipsum dolor sit amet, consectetu...",
              date_required: "23/07/2020",
              responsible: "Lizeth Marzano",
              responsible_area: "Arquitectura",
              applicant: "Lizeth Marzano",
            },
          ],
          hideCols: [],
        };
        row.info.push(temp);
      }
    },
    deleteFront(state, payload) {
      if (payload.phaseLen === 0 || payload.phaseId === 'all') {
        const rowIndex = state.whiteproject_rows.findIndex((row) => row.id === payload.frontId);
        state.whiteproject_rows.splice(rowIndex, 1);
      } else {
        const row = state.whiteproject_rows.find((row) => row.id === payload.frontId);
        const itemIndex = row.info.findIndex((item) => item.id === payload.phaseId);
        row.info.splice(itemIndex, 1);
      }
    },
    addScrollTableRow(state, payload) {
      const row = state.whiteproject_rows.find((row) => row.id === payload.frontId).info.find((item) => item.id === payload.phaseId);
      const temp = {
        exercise: payload.exercise,
        restriction: "",
        date_required: "",
        responsible: "",
        responsible_area: "",
        applicant: "",
      };
      row.tableData.push(temp);
    },
    delScrollTableRow(state, payload) {
      const rows = state.whiteproject_rows.find((row) => row.id === payload.frontId).info.find((item) => item.id === payload.phaseId).tableData;
      var ind = '';
      for (var i = 0; i < rows.length; i ++) {
        if (rows[i]['exercise'] === payload.exercise) {
          ind = i;
        }
      }
      if (ind !== '')
        rows.splice(ind, 1);
    },
    duplicateScrollTableRow(state, payload) {
      const rows = state.whiteproject_rows.find((row) => row.id === payload.frontId).info.find((item) => item.id === payload.phaseId).tableData;
      var ind = '';
      for (var i = 0; i < rows.length; i ++) {
        if (rows[i]['exercise'] === payload.exercise) {
          ind = i;
        }
      }
      if (ind !== '')
        rows.push(rows[ind]);
    },
    updateRegisterData(state, payload) {
      state.registerData[payload.attr] = payload.value;
    },
    updateRegisterDataCardInfo(state, payload) {
      state.registerData.cardInfo[payload.attr] = payload.value;
    }
  },
});

export default store;
