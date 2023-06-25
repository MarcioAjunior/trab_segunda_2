import { useEffect, useState } from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";

const KEY = process.env.REACT_APP_STRIPE;

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

const Success = styled.span`
  color: green;
`;

const AddProducts = () => {

  const token = "Bearer " + useSelector(state=>state.user.currentUser.accessToken);

  const cart = useSelector((state) => state.cart);

  const [orders, setOrders] = useState([]);
  

  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/");
  }

  useEffect(() => {
    
    const getOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders', {headers : {
          'token' : token
        }});
        setOrders(res.data.orders);
        console.log(res.data.orders);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Listagem de pedidos</Title>
        <Form>

        { orders.reverse().map((item) => (
            <ContainerPedido key={item.id}>
                <ItemPedido>
                  Numero do pedido : {item.id}
                </ItemPedido>
                <ItemPedido>
                  Usuario do pedido : {item.usuario.nome} 
                </ItemPedido>
                <ItemPedido>
                  Status : {item.status == 'PENDENTE' ? (<Error>{item.status}</Error>) : (<Success>{item.status}</Success>)}
                </ItemPedido>
                <ItemPedido>
                  Itens : {item.itens?.map((item) => (
                      <ItemPedido>
                        {item.nome},
                    </ItemPedido>
                  ))}
                </ItemPedido>
                <ItemPedido>
                  Valor do pedido : {item.vlr_total}
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
