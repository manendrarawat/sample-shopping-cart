import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, InputNumber, Select, Input } from "antd";
import { addProductsToCart, removeProductFromCart } from './actions/cart';
import "./App.css";
import productResponse from './response';

const { Option } = Select;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedProduct: {},
      selectedProductSize: '',
      selectedProductQuantity: ''
    }
  }

  showModal = (product) => {
    this.setState({
      visible: true,
      selectedProduct: product
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  removeSelecedProduct = (selectedProductId) => {

    let updatedProducts = this.props.cart.filter((product) => {
      return product.p_id !== selectedProductId;
    });
   this.props.removeProductFromCart(updatedProducts);
  }


  handleProductSizeChange = (selectedSize) => {
    this.setState({
      selectedProductSize : selectedSize
    })

  }

  handleProductQuantity = (selectedQuantity) => {
    this.setState({
      selectedProductQuantity : selectedQuantity
    })

  }

  editProductHandler = () => {
      const myProducts = [ ...this.props.cart ];
      myProducts.map((product) => {
          if(product.p_id === this.state.selectedProduct.p_id){
            product.p_selected_size.name = this.state.selectedProductSize;
            product.p_selected_size.code = this.state.selectedProductSize.charAt(0);
            product.p_quantity = this.state.selectedProductQuantity;
          }
      })
      
      this.props.removeProductFromCart(myProducts);
      this.setState({
        visible: false
      })
 }

  render() {
   
    let estimatedTotal = this.props.cart && this.props.cart.reduce((totalAmount, product) => {
          return totalAmount + product.p_price;
    }, 0);

    console.log('estimatedTotal :>> ', estimatedTotal);

    return (
      <div className="parentContainer">
        <div className="content">
          <div className="heading">
            <h3>YOUR SHOPPING CART</h3>
            <span>If the cart is completely empty</span>
          </div>
          <br />
          <ul className="container-heading">
            <li className="item">{this.props.cart.length} ITEMS</li>
            <li className="item2">SIZE</li>
            <li className="item2">QTY</li>
            <li className="item2">PRICE</li>
          </ul>

          {
            this.props.cart && this.props.cart.length === 0 && (
              <div style={{ marginBottom : '20px'}}>No Product available</div>
            )
          }

          { this.props.cart && this.props.cart.map((product, index) => {
            index = index + 1;
            return (
              <ul className="container">
                <li className="item">
                  <div className="productContent">
                    <div className="productContent-item">
                      <img src={`.${product.p_image}`} width="100px" />
                    </div>
                    <div className="productContent-item">
                      <ul className="productListStyle">
                        <li>{product.p_name.toUpperCase()}</li>
                        <li>{product.p_style}</li>
                        <li>Color:{product.p_selected_color.name}</li>
                      </ul>
                      <ul className="productOptions">
                        <li
                          className="productOptionsItms"
                          onClick={ () => { this.showModal(product) }}
                        >
                          EDIT
                        </li>
                        <li className="productOptionsItms" onClick={ () => { this.removeSelecedProduct(product.p_id)}}>X REMOVE</li>
                        <li className="productOptionsItms">SAVE FOR LATER</li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="item2" style={{ fontWeight: "bold" }}>
                  {product.p_selected_size.code.toUpperCase()}{" "}
                </li>
                <li className="item2">{product.p_quantity}</li>
                <li className="item2" style={{ fontWeight: "bold" }}>
                  ${parseFloat(product.p_price).toFixed(2)}
                </li>
              </ul>
            );
          })}

          <div>
          <ul className="productBottom">
              <li style={{ width: '40%'}}>
                <footer>Need help or have questions?</footer>
                <h6>Call Customer Service at</h6>
                <span>1-800-555-555</span>
                <h6>
                  <a href="">Chat with one of our stylist</a>
                </h6>
                <h6>
                  <a href="">See return or exchange policy</a>
                </h6>
              </li>
              <li style={{ width: '60%'}}>
              <ul>
                <li class="flex-container subTotalEstimate">
                  <h6>ENTER PRAMOTION CODE OR GIFT CARD</h6>
                  <Input style={{ width: "150px", marginRight: "5px" }} 
                    value = 'Not Applied'
                    disabled = {true}
                  />
                  <Button type="default"  disabled = {true}>APPLY</Button>
                </li>
                <hr />

                <li class="flex-container subTotalList">
                  <h6>SUB TOTAL</h6>
                  <h6>${parseFloat(estimatedTotal).toFixed(2)}</h6>
                </li>

                <li class="flex-container subTotalList">
                  <h6>PRAMOTION CODE AJ10 APPLIED</h6>
                  <h6>NA</h6>
                </li>
                <li class="flex-container subTotalList">
                  <h6>ESTIMATED SHIPPING</h6>
                  <h6>FREE</h6>
                </li>
                <li class="flex-container subTotalList">
                  <h6>ESTIMATED TOTAL</h6>
                  <h6>${}</h6>
                </li>
                <li class="flex-container subTotalList">
                  <h6>CONTINUE SHOPPING</h6>
                  <Button type="primary" style={{ marginleft: "5px" }}>
                    Checkout
                  </Button>
                </li>
              </ul>
              </li>
              
            </ul>

            
          </div>

          <Modal
              visible={this.state.visible}
              footer={false}
              visible={this.state.visible}
              onCancel={this.handleCancel}
            >
              <ul className="productBottom">
                <li>
                  <ul style={{ listStyle: "none" }} className="modelBox">
                    <li>{ this.state.selectedProduct.p_name}</li>
                    <li style={{ fontWeight: "bold" }}>
                        ${parseFloat(this.state.selectedProduct.p_price).toFixed(2)}
                    </li>
                    <li>{ this.state.selectedProduct.p_style }</li>
                    {/* {backgroundColor: this.state.selectedProduct && this.state.selectedProduct.p_selected_color && this.state.selectedProduct.p_selected_color.hexcode} */}
                    <li>
                      <div style={{ display : 'flex', alignItems: 'center'}}>
                        {
                          this.state.selectedProduct 
                          && this.state.selectedProduct.p_available_options
                          && this.state.selectedProduct.p_available_options.colors
                          && this.state.selectedProduct.p_available_options.colors.map((productColor) => {
                            return (
                              <div style={{ 
                                marginRight: '.5rem', 
                                width: (productColor.name !== this.state.selectedProduct.p_selected_color.name) ? '50px' : '70px',
                                height: (productColor.name !== this.state.selectedProduct.p_selected_color.name) ? '20px' : '40px',
                                backgroundColor: productColor.hexcode,
                                }}></div>
                            )
                          })
                        }
                         
                      </div>
                    </li>
                    <li>Color:blue</li>
                    <li>
                      <Select
                        defaultValue="small"
                        style={{ width: "100px", marginRight: "50px", marginBottom: '25px' }}
                        onChange={ (event) => { this.handleProductSizeChange(event) }  }
                      >
                        {
                          this.state.selectedProduct 
                          && this.state.selectedProduct.p_available_options
                          && this.state.selectedProduct.p_available_options.sizes
                          && this.state.selectedProduct.p_available_options.sizes.map((productSize) => {
                            return (
                              <Option value={productSize.name}>{productSize.name}</Option>
                            )
                          })
                        }
                      </Select>
                      <InputNumber
                        min={1}
                        defaultValue={1}
                        size="small"
                        style={{ width: "50px" }}
                        onChange={ (event) => { this.handleProductQuantity(event)}}
                      />
                    </li>
                    <li style={{ marginBottom: '10px'}}>
                      <Button
                        type="primary"
                        style={{ backgroundColor: "#1169BD", width: '100px' }}
                        onClick={ this.editProductHandler}
                      >
                        EDIT
                      </Button>
                    </li>
                    <li>
                      <a href="#">check product details</a>
                    </li>
                  </ul>
                </li>
                <li>{<img src={`.${this.state.selectedProduct.p_image}`} width="150px" />}</li>
              </ul>
            </Modal>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.addToCart(productResponse)
  }

}

const mapDispachToProps = dispatch => {
  return {
    addToCart: (products) => {
      dispatch(addProductsToCart(products));
    },
    removeProductFromCart: (updatedProduct) => {
      dispatch(removeProductFromCart(updatedProduct));
    },
  };
};

const mapStateToProps = state => {
  return {
    cart: state.cart.products
  };
};

export default connect(mapStateToProps, mapDispachToProps)(App);
