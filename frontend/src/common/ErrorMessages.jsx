import React  from 'react'
import styled from 'styled-components';
const ErrorMessages =(props)=> {
    const { name , validationKey,errors } = props;
    return (
        <FormErrorMessages>
                 <> {errors[`${name}`] && <p style={{color:'red !important'}}>{errors[`${name}`].message}</p>}</>
        </FormErrorMessages>
    )
}


export default  ErrorMessages;

export const FormErrorMessages = styled.span`
  color:red
`;