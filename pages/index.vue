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
      v-if="phantomWallet && !publicWalletAddress"
      @click="connectPhantom"
      class="bg-indigo-600 text-white font-bold rounded px-4 py-2 shadow-md uppercase"
    >
      Connect Wallet
    </button>
    <div
      v-if="publicWalletAddress"
      class="text-gray-50 flex flex-col items-center space-y-8"
    >
      <p class="text-center">
        Welcome to the Solana network, <br />
        <strong>{{ publicWalletAddress }}</strong>
      </p>
      <div class="w-3/4 rounded-lg overflow-hidden flex shadow-xl">
        <img src="/images/welcome.gif" alt="welcome gif" class="object-cover" />
      </div>
    </div>
    <a
      href="https://phantom.app/"
      target="_blank"
      v-if="!loading && !phantomWallet"
      class="text-gray-50 underline"
    >
      You need to download a Wallet first.
    </a>
    <div
      class="absolute bottom-8 flex flex-col space-y-4 lg:space-y-0 lg:flex-row items-center lg:space-x-8 justify-center"
    >
      <a
        href="https://twitter.com/icesofty"
        target="_blank"
        class="flex items-center justify-center text-gray-50 space-x-4"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="text-blue-500"
          fill="currentColor"
        >
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
          />
        </svg>
        <p>Made by this guy</p></a
      >
      <a
        href="https://github.com/Icesofty/nuxt-solana-boilerplate"
        target="_blank"
        class="flex items-center justify-center text-gray-50 space-x-4"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
        <p>This project is OpenSource</p>
      </a>
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
  async created() {
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

  methods: {
    async connectPhantom() {
      const response = await solana.connect()
      this.publicWalletAddress = response.publicKey.toString()
      console.log('Connected with Public Key:', response.publicKey.toString())
    },
  },
}
</script>
