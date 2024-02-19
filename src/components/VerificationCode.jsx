import React, { useState } from "react";
import { Box, Input, styled } from "@mui/material";

const VerificationInput = styled(Input)(({ theme }) => ({
  width: '50px',
  height: '50px',
  marginRight: theme.spacing(2),
  fontSize: '2rem',
  textAlign: 'center',
}));

const VerificationCode = ({ onCodeFilled }) => {
  const [code, setCode] = useState(new Array(4).fill(''));
  const inputRefs = Array.from({ length: 4 }, () => React.createRef());

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;

    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);

    if (slot < 3 && num) {
      inputRefs[slot + 1].current.focus();
    }

    if (slot === 3) {
      e.target.blur();
      if (newCode.every((num) => num)) {
        onCodeFilled(newCode.join(''));
      }
    }
  };

  const handleKeyUp = (e, slot) => {
    if (e.key === "Backspace" && !code[slot] && slot > 0) {
      inputRefs[slot - 1].current.focus();
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {code.map((num, index) => (
        <VerificationInput
          key={index}
          value={num}
          inputProps={{ maxLength: 1, inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={(e) => processInput(e, index)}
          onKeyUp={(e) => handleKeyUp(e, index)}
          ref={inputRefs[index]}
        />
      ))}
    </Box>
  );
};

export default VerificationCode;
