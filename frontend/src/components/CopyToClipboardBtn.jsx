import React from 'react';
import Button from '@mui/material/Button';

const CopyToClipboardBtn = (props) => {
  const copyText = () => navigator.clipboard.writeText(props.value)

  return <Button onClick={copyText}>Copy</Button>
}

export default CopyToClipboardBtn
