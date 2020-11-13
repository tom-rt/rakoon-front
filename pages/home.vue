<template>
  <div class="flex justify-center">
    <div
      class="mt-4 flex flex-col w-auto h-full flex-wrap content-start items-center"
    >
      <div class="text-6xl">Bienvenue sur Rakoon !</div>
      <div>
        Rakoon est un bureau distant partagé entre amis et famille, n'hésite pas
        à y ajouter tout contenu que tu souhaites partager.
      </div>
      <div class="mt-4 font-black underline">Les règles a respecter sont:</div>
      <div class="mt-2 ml-8">- Pas de données personelles sensibles</div>
      <div class="mt-2 ml-8">
        - Pas de données confidentielles (tout est accessible a tout le monde)
      </div>
      <div class="mt-2 ml-8">- Pas de contenu gore / illicite</div>
      <div class="mt-2 ml-8">- Compte strictement personnel</div>
      <div class="mt-4">
        Si vous avez des suggestions, ou rencontrez des difficultés, ou
        souhaitez créer un compte, vous pouvez me contacter via Telegram:
        @TomAirT
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const req = await context.app.$axios.get(
      `/user/${context.store.state.userId}`
    );
    return {
      userData: req.data,
    };
  },
  middleware: "authenticated",
};
</script>

<style>
</style>