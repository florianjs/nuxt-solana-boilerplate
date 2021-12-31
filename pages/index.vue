<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-800">
    <div v-if="loading" class="text-white items-center justify-center flex">
      <svg
        class="animate-spin h-7 w-7 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <button
      v-if="phantomWallet"
      @click="connectPhantom"
      class="bg-indigo-600 text-white font-bold rounded px-4 py-2 shadow-md uppercase"
    >
      Connect Wallet
    </button>

    <div v-if="!loading && !phantomWallet">
      You need to download a Walet first.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: null,
      phantomWallet: null,
      publicWalletAddress: '',
    }
  },
  async fetch() {
    console.log('Fetch is called')
    this.loading = true
    setTimeout(() => {
      try {
        const { solana } = window

        if (solana) {
          this.solana = solana

          if (solana.isPhantom) {
            this.phantomWallet = true
          }
        } else {
          this.phantomWallet = false
          console.log('No Phantom founded.')
        }
      } catch (error) {
        console.error(error)
      }
      this.loading = false
    }, 2000)
  },
  fetchOnServer: false,

  methods: {
    async connectPhantom() {
      const response = await solana.connect()
      this.publicWalletAddress = response.publicKey.toString()
      console.log('Connected with Public Key:', response.publicKey.toString())
    },
  },
}
</script>

<style>
.gradient {
  background: linear-gradient(45deg, #00ffa3, #03e1ff, #dc1fff);
  background-size: 600% 100%;
  animation: gradient 5s linear infinite;
  animation-direction: alternate;
}

.gradient-card {
  background: linear-gradient(45deg, #00ffa3, #03e1ff, #dc1fff);
  background-size: 600% 100%;
  animation: gradient-card 5s linear infinite;
  animation-direction: alternate;
}

.gradient-text:hover {
  background: linear-gradient(45deg, #00ffa3, #03e1ff, #dc1fff);
  background-size: 600% 100%;
  animation: gradient 1s linear infinite;
  animation-direction: alternate;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@keyframes gradient {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
}
@keyframes gradient {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
}
@keyframes gradient-card {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
}
</style>
