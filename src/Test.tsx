import { useEffect, useRef, useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
  useSignMessage,
} from "wagmi";

export const YourApp = () => {
  const {
    connect,
    connectors,
    error,
    isLoading,
    pendingConnector,
    connectAsync,
  } = useConnect();

  const [loading, setLoading] = useState(false);

  const { address, connector, isConnected } = useAccount();
  const { chain } = useNetwork();
  // @ts-ignore
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  console.log("%c chain ===>", "color: #90ee90", chain);

  const handleConnect = async (cn: any) => {
    await connectAsync({ connector: cn });
    console.log("successfully connected");

    // const chainId = chain?.id;
    // if (!address || !chainId) return;

    // setLoading(true);

    // console.log("getNonce");
    // const nonce = "sjbfdsbfyfbsdhfvdsvfbhsbdfhsdfbhsdbfsbfh";
    // console.log("nonce is fetched");

    // const signature = await signMessageAsync({
    //   message: nonce,
    // });

    // console.log({ signature });

    // console.log("Verify Signature");

    // console.log("Signature is verified");

    // setLoading(false);
  };

  const signIn = async () => {
    if (chain?.id && address) {
      try {
        setLoading(true);

        console.log("getNonce");
        const nonce = "sjbfdsbfyfbsdhfvdsvfbhsbdfhsdfbhsdbfsbfh";
        console.log("nonce is fetched");

        signMessageAsync({
          message: nonce,
        }).then((signature) => {
          console.log({ signature });

          console.log("Verify Signature");

          console.log("Signature is verified");

          setLoading(false);
        });
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };

  console.log("%c isConnected ===>", "color: #90ee90", isConnected);

  console.log("%c ensAvatar ===>", "color: #90ee90", ensAvatar);

  if (isConnected) {
    return (
      <div>
        <ConnectButton />
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }

  return <ConnectButton />;
};
