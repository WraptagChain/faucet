import { ethers } from 'ethers';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import QRCodeDisplay from './QR';

declare global {
    interface Window {
        ethereum: any;
    }
}

const addNetwork = async (config: any) => {
    if(!config) {
        return;
    }
    if(window.ethereum == undefined) {
        window.open('https://metamask.io/download', '_blank');
    }

    await window?.ethereum?.request({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId: `0x${config.CHAINID?.toString(16)}`,
            chainName: config.NAME,
            nativeCurrency: {
                name: config.NAME,
                symbol: config.TOKEN,
                decimals: 18
            },
            rpcUrls: [config.RPC],
            blockExplorerUrls: config.EXPLORER ? [config.EXPLORER] : null
        }]
    }).catch((error: any) => {
        console.log(error)
    });      
}

export default function AddNetwork(props: any) {
    console.log(props.config)
    const [showQR, setShowQR] = useState(false)
    const addNetworkKeyring = () => {
        if (isMobile) {
            window.location.href = `https://keyring.app/add-chain?name=${props.config.NAME}&chainid=${props.config.CHAINID}&rpc=${props.config.RPC}&symbol=${props.config.TOKEN}&decimal=${18}&explorer=${props.config.EXPLORER}`
        } else {
            setShowQR((state: boolean) => !state)
        }
    }

    return (
        <div className='footer-buttons'>
            <div className='add-network-container'>
                <div className="add-network-wrapper" onClick={() => {addNetwork(props.config)}}>
                    <div className="add-network-sub-text">Google Extension Wallet</div>
                    <div className="add-network-button">
                        <img style={{width: "25px", height: "25px", marginRight: "5px"}} src="/memtamask.png"/>
                        Metamask
                    </div>
                </div>

                <div className="add-network-wrapper" onClick={() => addNetworkKeyring()}>
                    <div className="add-network-sub-text">Mobile Wallet</div>
                    <div className="add-network-button">
                        <img style={{width: "22px", height: "22px", marginRight: "5px"}} src="/keyring.png"/>
                        Keyring Pro
                    </div>
                </div>
            </div>

            {showQR && <div className='add-keyring-qr' style={{ marginTop: 20 }}>
                <QRCodeDisplay size={250} value={`https://keyring.app/add-chain?name=${props.config.NAME}&chainid=${props.config.CHAINID}&rpc=${props.config.RPC}&symbol=${props.config.TOKEN}&decimal=${18}&explorer=${props.config.EXPLORER}`} />
            </div>}
        </div>
    )
}