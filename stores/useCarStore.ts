import { defineStore } from "pinia";

import { Car } from "~/types/CarType";

type CarCreateData = {
  model: string;
  status: string;
  owner_id: number;
};

export type CarFromCodeData = {
  code: string;
};

export const useCarStore = defineStore("car", () => {
  const cars = ref<Car[] | null>(null);
  const currentCar = ref<Car | null>(null);

  async function fetchCarsByUserID(userID: number) {
    const { data, error } = await useApiFetch(`/api/user/${userID}/cars`);
    cars.value = data.value as Car[];
  }

  async function fetchCurrentCarByCarID(carID: number) {
    const { data, error } = await useApiFetch(`/api/car/${carID}`);
    currentCar.value = data.value.car as Car;
  }

  async function createCar(carCreateData: CarCreateData) {
    const response = await useApiFetch("/api/car", {
      method: "post",
      body: carCreateData,
    });
    return response;
  }
  async function editCar(carEditData: CarCreateData, carID: number) {
    const response = await useApiFetch(`/api/car/${carID}/edit`, {
      method: "put",
      body: carEditData,
    });
    return response;
  }

  async function addCarFromCode(carFromCodeData: CarFromCodeData) {
    const response = await useApiFetch("/api/car/join", {
      method: "post",
      body: carFromCodeData,
    });
    return response;
  }

  const hasCars = computed(() => {
    if (cars.value && typeof cars.value.length !== "undefined") {
      return cars.value.length > 0;
    } else {
      return false;
    }
  });

  return {
    fetchCarsByUserID,
    cars,
    hasCars,
    createCar,
    editCar,
    fetchCurrentCarByCarID,
    currentCar,
    addCarFromCode,
  };
});
