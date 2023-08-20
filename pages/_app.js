import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, zora, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Provider } from "react-redux";
import { store } from "@/Redux/app/store";
import  { AppWrapper } from "@/hooks/AppContext";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora, sepolia],
  [alchemyProvider({ apiKey: '5ShvcS43c_Wrsfk_jTMZOU0sXXBKaVXP' }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Coffer App",
  projectId: "1a7e15dc71f5d3b03fb155264c5d3a74",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
      </RainbowKitProvider>
    </WagmiConfig>

    </Provider>
  );
}
