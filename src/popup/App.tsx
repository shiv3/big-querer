import React from "react";
import styled from "@emotion/styled";
import ConvertTimeStampComponent from "../components/ConvertTimestamp";




export const App = () => {
  return (
    <AppContainer>
      {/*<TextAreaContainer></TextAreaContainer>*/}
      <ConvertTimeStampComponent/>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  width: 500px;
  height: 300px;
`

const TextAreaContainer = styled.textarea`
  width: 100%;
  height: 100%;
`;
