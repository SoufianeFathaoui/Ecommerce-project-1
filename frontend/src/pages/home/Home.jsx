import { Box } from "@mui/system";
import "./Home.css";
import {
  Typography,
  Button,
  Stack,
  CircularProgress,
  IconButton,
  Badge,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useGetproductsByNameQuery } from "../../Redux/productsApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "Redux/cartSlice";
import { Add, Remove } from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
  
  },
}));
const Home = () => {
  // @ts-ignore
  const { selectedProducts , selectedProductsID } = useSelector((state) => state.cart);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetproductsByNameQuery();
  
  const productQuantity = (itemAPI) => {
    const myProduct = selectedProducts.find((itemUser) => {
      return itemUser.id === itemAPI.id;
    });

    return myProduct.Quantity;
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" color="error">
          {" "}
          ERROR{" "}
        </Typography>
      </Box>
    );
  }
  if (data) {
    return (
      <Stack
        direction={"row"}
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((item , index) => {
          return (
            <Card
              className="card"
              key={item.id}
              sx={{ maxWidth: 277, mb: 6, mx: 2 }}
            >
              <CardMedia
                component="img"
                height="277"
                image={item.imageLink}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between" }}
                disableSpacing
              >
                {selectedProductsID.includes(item.id) ? (
                  <div style={{ direction:"rtl", display: "flex", alignItems: "center" }}>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        dispatch(increaseQuantity(item));
                      }}
                      sx={{ ml: "10px" }}
                    >
                      <Add />
                    </IconButton>

                    <StyledBadge
                      badgeContent={productQuantity(item)}
                      color="primary"
                    />

                    <IconButton
                      color="primary"
                      onClick={() => {
                        dispatch(decreaseQuantity(item));
                      }}
                      sx={{ mr: "10px" }}
                    >
                      <Remove />
                    </IconButton>
                  </div>
                ) :  <Button
                sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(addToCart(item))
                }}
              >
                Add to cart
              </Button>  }
                <Typography
                  mr={1}
                  variant="body1"
                  color={theme.palette.error.light}
                >
                  ${item.price}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
};

export default Home;
