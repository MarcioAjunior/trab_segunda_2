import { useState } from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: gray;
  background-size: cover;
  display: flex;
  align-items: top;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 85%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #545454;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link_a = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const ItemPedido = styled.span`
  margin: 2px 10px;
`;

const ContainerPedido = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const AddProducts = () => {

  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/");
  }

  return (
    <Container>
      <Wrapper>
        <Title>Listagem de pedidos</Title>
        <Form>

        { [1,2,3,4,5,6,7,8,9,10,11,12,13].map((item) => (
            <ContainerPedido>
                <ItemPedido>
                  Numero do pedido : {item}
                </ItemPedido>
                <ItemPedido>
                  Usuario do pedido : {item}
                </ItemPedido>
                <ItemPedido>
                  Status : {item}
                </ItemPedido>
                <ItemPedido>
                  Itens : {item}
                </ItemPedido>
            </ContainerPedido>
            )) }
          <Button onClick={handleClick}>
            VOLTAR
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default AddProducts;
