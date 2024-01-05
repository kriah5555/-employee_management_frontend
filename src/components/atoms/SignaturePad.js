import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import CustomButton from './CustomButton';

export default function SignaturePad({ sendSignatureData, sign, setSign, signData }) {

    const signatureRef = useRef(null);
    const [signatureData, setSignatureData] = useState(signData)

    const clearSignature = () => {
        signatureRef.current.clear();
    };

    const saveSignature = () => {
        const signature_data = signatureRef.current.toDataURL();
        // Do something with the signature data, like sending it to a server or storing it in the state.
        console.log('Signature Data:', signature_data);
        setSignatureData(signature_data)
        sendSignatureData(signature_data)
    };

    return (
        <div className=''>
            {sign && <div>
                <SignatureCanvas
                    ref={signatureRef}
                    canvasProps={{ width: 750, height: 200, className: 'signature-canvas' }}
                />
                <div className=''>
                    <CustomButton buttonName={'Clear'} CustomStyle="float-right mt-2" ActionFunction={clearSignature}></CustomButton>
                    <CustomButton buttonName={'Save'} CustomStyle="float-right mt-2" ActionFunction={saveSignature}></CustomButton>
                </div>
            </div>}
            {!sign && <div>
                { signatureData && <img src={signatureData} alt="Signature" /> }
                <div className=''>
                    <CustomButton buttonName={'Update'} CustomStyle="float-right mt-2" ActionFunction={() => setSign(true)}></CustomButton>
                </div>
            </div>}
        </div>
    );
};
