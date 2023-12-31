<script setup lang="ts">
definePageMeta({
  middleware: ["guest"],
});
const messageFromApi = ref("Waiting for response from API...");
async function fetchHello() {
  const response = await fetch("//localhost:8000/api/hello");
  const data = await response.json();
  messageFromApi.value = data.message;
  console.log(data.message);
}
onMounted(() => {
  fetchHello();
});
</script>
<template>
  <div>
    <h1 class="text-5xl text-center text-header-color">
      Welcome to Wheel Wallet!
    </h1>

    <section class="p-6 mx-auto mt-8 max-w-2xl rounded-lg shadow-md">
      <p class="mb-4">
        Hey there, fellow road enthusiasts! Ready to embark on a journey of
        hassle-free car management? Look no further than Wheel Wallet - the
        coolest ride companion you never knew you needed!
      </p>

      <h2 class="mb-2 text-xl text-header-color">What's Under the Hood:</h2>
      <p class="mb-4">
        At Wheel Wallet, we believe in making car management as smooth as your
        favorite road trip playlist. Add your beloved vehicles, track expenses
        with a breeze, and even plan for that extra pit stop for a coffee fix –
        because your car deserves to be treated like royalty!
      </p>

      <h2 class="mb-2 text-xl text-header-color">Expense Tracking Made Fun:</h2>
      <p class="mb-4">
        No more head-scratching over mystery expenses! With Wheel Wallet,
        effortlessly keep tabs on every penny spent on your four-wheeled
        companions. It's like having a personal financial GPS for your car!
      </p>

      <h2 class="mb-2 text-xl text-header-color">Share the Joy (and Cars):</h2>
      <p class="mb-4">
        Got a co-pilot in mind? Wheel Wallet lets you share the love (and cars!)
        with a co-owner. Whether it's splitting gas bills or deciding who's turn
        it is to take the wheel, it's a breeze with our easy-sharing feature.
      </p>

      <h2 class="mb-2 text-xl text-header-color">
        Why So Serious? We're Just Cars, After All:
      </h2>
      <p class="mb-4">
        We get it. Cars are serious business, but managing them doesn't have to
        be. We've sprinkled a dash of humor into Wheel Wallet to make your
        car-related tasks a little more entertaining. Because who said car
        management can't be fun?
      </p>

      <h2 class="mb-2 text-xl text-header-color">Join the Ride:</h2>
      <p class="mb-4">
        Ready to hit the digital highway with Wheel Wallet? Sign up now and let
        the good times roll – and expenses take a backseat!
      </p>
      <p class="mb-4">
        Gear up, rev your engines, and let's make car management as enjoyable as
        cruising with the windows down. Welcome to Wheel Wallet, where every car
        has its own VIP parking spot in the digital garage!
      </p>
    </section>

    <footer class="mt-8 text-sm text-center text-gray-600">
      &copy; 2023 Wheel Wallet. All rights reserved.
    </footer>
  </div>
</template>
