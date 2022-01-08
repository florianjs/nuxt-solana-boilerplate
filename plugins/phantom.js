async function phantom() {
  while (!window.hasOwnProperty('solana')) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return false
  }

  const { solana } = window

  if (solana.isPhantom) {
    return solana
  } else {
  }
}

export default async ({ app }, inject) => {
  const wallet = await phantom()
  inject('phantom', wallet)
}
