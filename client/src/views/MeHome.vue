<script setup>
import { reactive } from "vue";
// import Currency from "@/api/currency.js";
import { NIcon } from "naive-ui";
import { AttachMoneyFilled, EuroFilled } from "@vicons/material";

const courses = reactive({
  dollar: null,
  euro: null,
});

// onMounted(() => {
//   Promise.all([Currency.get(), Currency.get("EUR")])
//     .then(([dollar, euro]) => {
//       courses.dollar = dollar.data.data.RUB.toFixed(2);
//       courses.euro = euro.data.data.RUB.toFixed(2);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });
</script>

<template>
  <div>
    <div>
      <n-icon size="40">
        <attach-money-filled />
      </n-icon>
      {{ courses.dollar }}
    </div>
    <div>
      <n-icon size="40">
        <euro-filled />
      </n-icon>
      {{ courses.euro }}
    </div>
  </div>
</template>
