import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QrScanner = (props) => {
  const [data, setData] = useState('');

  useEffect(() => {
    console.info(data);
    props.passData(data);
  }, [data]);

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            setData(result?.text);
          }

          // if (error) {
          //   console.info(error);
          // }
        }}
        style={{ width: '100%' }}
      />
    </>
  );
};

export default QrScanner;