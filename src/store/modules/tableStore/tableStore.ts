import { defineStore } from "pinia";
import { ref } from "vue";

export const useTableStore = defineStore("useTableStore", () => {
  const data = [
    {
      id: "1",
      date: "1",
      name: "name1",
      address: "No.1518,  Jinshajiang Road, Putuo District",
    },
    {
      id: "2",
      date: "2",
      name: "test2",
      address: "No.1518,  Jinshajiang Road, Putuo District",
    },
  ];
  const tableData = ref(data);

  const tableTitle = ref([
    {
      label: "Date",
      prop: "date",
    },
    {
      label: "Name",
      prop: "name",
    },
    {
      label: "Address",
      prop: "address",
    },
  ]);
  const resetData = [
    {
      id: "1",
      date: "1",
      name: "name1",
      address: "No.1518,  Jinshajiang Road, Putuo District",
    },
    {
      id: "2",
      date: "2",
      name: "test2",
      address: "No.1518,  Jinshajiang Road, Putuo District",
    },
  ];
  return {
    resetData,
    tableData,
    tableTitle,
  };
});
