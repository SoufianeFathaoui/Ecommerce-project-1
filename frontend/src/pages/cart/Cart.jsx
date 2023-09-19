import {
  Box,
  Button,
  Paper,
  styled,
  IconButton,
  Badge,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import "./Cart.css";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct, increaseQuantity , decreaseQuantity } from "Redux/cartSlice";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
}));

const Cart = () => {
  // @ts-ignore
  const {selectedProducts} = useSelector((state) => state.cart);
  // const { selectedProducts } = useSelector((state) => state.carttt);
  const dispatch = useDispatch()
  console.log(selectedProducts)
  return (
    <Box>
      {selectedProducts.map((item) => {
        return(
          <Paper key={item.id} dir="rtl" className="item-container">
        <div className="img-title-parent">
          <img src={item.imageLink} alt="" />
          <p className="product-name">T-shirt</p>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton 
          onClick={() => {
            dispatch(increaseQuantity(item))
          }}
          sx={{ color: "#1976d2", ml: "10px" }}>
            <Add />
          </IconButton>

          <StyledBadge badgeContent={item.Quantity} color="secondary" />

          <IconButton 
          onClick={() => {
            dispatch(decreaseQuantity(item))
          }}
          sx={{ color: "#1976d2", mr: "10px" }}>
            <Remove />
          </IconButton>
        </div>

        <div className="price">${item.price}</div>

        <Button
        onClick={() => {
          dispatch(deleteProduct(item))
        }}
        sx={{display:{xs:"none" , md:"inline-flex"}}} variant="text" color="error">
          delete
        </Button>
        <IconButton 
        onClick={() => {
          dispatch(deleteProduct(item))
        }}
        sx={{color:"red" ,  display:{md:"none" , xs:"inline-flex"}}} >
          <Delete />
        </IconButton>
      </Paper>
        )
      })}
      <Paper sx={{width:"250px" , mx:"auto"}}>
        <Typography align="center" variant="h6" p={2}>
          Cart Summary
        </Typography>
        <Divider />
        <Stack sx={{justifyContent:"space-between" , p:1.2}} direction={"row"} >
          <Typography variant="body1" >
            Subtotal
          </Typography>
          <Typography variant="body1">
            $100
          </Typography>
        </Stack>
        <Divider />
        <Button fullWidth variant="contained" color="primary">
          CHECKOUT
        </Button>
      </Paper>
    </Box>
  );
};

export default Cart;
