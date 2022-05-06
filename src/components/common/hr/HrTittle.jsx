import React from 'react'
import styled from '@emotion/styled'

const HrStyled = styled.hr`
  width: 1rem;
  height: 1rem;
  color: #2471A3;
  background-color: #2471A3;
  border: 1px solid #2471A3;
  margin-right: 0.8rem;
`;

const DivT = styled.div`
   display: flex;
   justify-content: flex-start;
`;

const HrTittle = () => {
  return (
     <DivT >
          <HrStyled />
     </DivT>
  )
}

export default HrTittle