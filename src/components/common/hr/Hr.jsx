import React from 'react'
import styled from '@emotion/styled'

const HrStyled = styled.hr`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  width: 95%;
  color: #F4F6F6;
  background-color: #F4F6F6;
  border: 1px solid #F4F6F6;
`;

const Hr = () => {
  return (
    <div>
         <HrStyled />
    </div>
  )
}

export default Hr