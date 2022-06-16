import React from "react";
import QRCode from "react-qr-code";

interface QRCodeFix extends React.Component {}

export const QRCodeTemp = (QRCode as any) as {
  new (): QRCodeFix
}

const QRCodeDisplay = (props: any) => {
  return <QRCodeTemp {...props} />
}

export default QRCodeDisplay