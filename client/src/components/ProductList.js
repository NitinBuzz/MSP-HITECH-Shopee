import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row, Col, Button } from "reactstrap";
import { getProduct, addToCart, deleteFromCart } from "../actions";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      normalisedData: false,
      openModal: false,
      datum: [],
      split: false
    };
  }
  componentDidMount() {
    this.props.actions.getProduct();
    setTimeout(() => {
      // this.props.actions.addToCart(0);
      // this.props.actions.addToCart(1);
      // this.props.actions.addToCart(2);
      // this.props.actions.addToCart(3);
      // this.props.actions.addToCart(4);
      // this.props.actions.addToCart(5);
      // this.props.actions.addToCart(6);
      // this.props.actions.addToCart(7);
      // this.props.actions.addToCart(8);
    }, 1000);
  }

  normalizeData = () => {
    let rowsEx = [];
    if (this.props.products != undefined) {
      this.props.products.forEach((item, index) => {
        if (item != null) {
          const { name, price, weight } = item;
          rowsEx.push({ index, name, price, weight });
        }
      });
      this.setState({ rows: rowsEx }, () => {
        this.setState({ normalizeData: true });
      });
    } else {
      <p>Loading...</p>;
    }
  };

  tweakToCart = (checked, index) => {
    if (checked) {
      this.props.actions.addToCart(index);
    } else {
      this.props.actions.deleteFromCart(index);
    }
  };

  totalCostex = arr => {
    let totalCost = 0;
    if (arr != undefined) {
      arr.forEach(item => {
        totalCost = totalCost + parseInt(item["price"]);
      });
    }
    return totalCost;
  };

  totalWeightex = arr => {
    let totalWeight = 0;
    if (arr != undefined) {
      arr.forEach(item => {
        totalWeight = totalWeight + parseInt(item["weight"]);
      });
    }
    return totalWeight;
  };

  calCourierCharge = weight => {
    let charge = 0;
    if (parseInt(weight) > 0 && parseInt(weight) < 201) {
      charge = 5;
    } else if (parseInt(weight) > 201 && parseInt(weight) < 501) {
      charge = 10;
    } else if (parseInt(weight) > 501 && parseInt(weight) < 1001) {
      charge = 15;
    } else if (parseInt(weight) > 1001 && parseInt(weight) < 5001) {
      charge = 20;
    }
    return charge;
  };

  courierCostMex = items => {
    return this.calCourierCharge(this.totalWeightex(items));
  };

  handlePlaceOrder = () => {
    let totalCost = 0,
      totalWeight = 0;
    this.props.cart.forEach(({ price }) => {
      totalCost = totalCost + parseInt(price);
    });
    if (totalCost > 250) {
      this.setState({ split: true });
      //Split the Packages
      this.props.cart.forEach(({ weight }) => {
        totalWeight = totalWeight + parseInt(weight);
      });
      let possibleSlpits = Math.ceil(totalCost / 250);
      let avgWeight = this.totalWeightex(this.props.cart) / possibleSlpits;
      let packages = [],
        cols = possibleSlpits;

      //init the 2d packages
      for (var i = 0; i < cols; i++) {
        packages[i] = [];
      }
      let counter = 0;

      let sortedCart = this.props.cart.sort((a, b) => {
        return parseInt(b.weight) - parseInt(a.weight);
      });

      this.props.cart
        .sort((a, b) => {
          return parseInt(b.weight) - parseInt(a.weight);
        })
        .forEach((item, index) => {
          let done = false;
          if (!done) {
            for (i = 0; i < possibleSlpits; i++) {
              if (!done) {
                if (
                  this.totalCostex(packages[i]) + parseInt(item.price) <
                  251
                ) {
                  if (
                    this.totalWeightex(packages[i]) + parseInt(item.weight) <
                    avgWeight + avgWeight * 0.1
                  ) {
                    packages[i].push(item);
                    done = true;
                  }
                }
              } else {
                if (!done) {
                  if (i === possibleSlpits - 1) {
                    console.log(` big buuuurrrrrrp`);
                  }
                }
              }
            }
          }
        });
      this.setState({ datum: packages }, () => {
        this.setState({ openModal: true });
      });
    } else {
      //No Split
      let packages = [];
      this.props.cart.forEach((item, index) => {
        packages.push(item);
      });
      this.setState({ datum: packages }, () => {
        this.setState({ openModal: true });
      });
    }
  };

  renderProducts = () => {
    let toReturn = [];
    this.state.rows.forEach(({ index, name, price, weight }) => {
      toReturn.push(
        <Col xs={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
          <div style={{}}>
            <div
              style={{
                display: "flex",
                padding: "10px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "10px",
                  border: "2px solid #333333"
                }}
              >
                <div
                  style={{
                    border: "2px solid #333333"
                  }}
                >
                  <img
                    src="./resources/blurred.jpg"
                    alt="Smiley face"
                    width="60px"
                    height="100%"
                  />
                </div>
                <div style={{ paddingTop: "0px", paddingLeft: "5px" }}>
                  <div>Name - {name}</div>
                  <div>Price - {price}</div>
                  <div
                    style={{
                      marginBottom: "0px"
                    }}
                  >
                    Weight - {weight}
                  </div>
                </div>
                <div className="selector">
                  <input
                    onClick={e =>
                      this.tweakToCart(e.target.checked, e.target.value)
                    }
                    type="checkbox"
                    name="product"
                    value={index}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
      );
    });
    return toReturn;
  };

  renderModalContents = () => {
    if (this.state.split) {
      let allPackages = [];
      this.state.datum.forEach((item, index) => {
        let packageEx = `Package${index + 1}`;
        let items = [];
        let totalCostM = 0;
        let totalWeightM = 0;
        let courierCostM = 0;
        totalCostM = this.totalCostex(item);
        totalWeightM = this.totalWeightex(item);
        courierCostM = this.courierCostMex(item);
        item.forEach(i => {
          items.push(i.name);
        });
        allPackages.push({
          totalCostM: totalCostM,
          totalWeightM: totalWeightM,
          courierCostM: courierCostM,
          items: items,
          name: packageEx
        });
      });
      return allPackages.map(packaz => {
        return (
          <div className="multi-package">
            <div style={{ marginBottom: "7px" }}>{packaz.name}</div>
            <div className="itemsModal">
              <p className="itemModal"> Items - </p>
              {packaz.items.map((element, index) => {
                if (index != packaz.items.length - 1) {
                  return <p className="itemModal">{element} ,</p>;
                } else {
                  return <p className="itemModal">{element}</p>;
                }
              })}
            </div>
            <div>Total weight - {packaz.totalWeightM}g</div>
            <div>Total price - ${packaz.totalCostM}</div>
            <div>Courier price - ${packaz.courierCostM}</div>
          </div>
        );
      });
    } else {
      let items = [];
      let totalCostM = this.totalCostex(this.state.datum);
      let totalWeightM = this.totalWeightex(this.state.datum);
      let courierCostM = this.courierCostMex(this.state.datum);
      this.state.datum.forEach(item => {
        if (item.length) {
          //
        } else {
          items.push(item.name);
        }
      });

      console.log(`thisss18 --- ${totalCostM}`);
      return (
        <div>
          <div style={{ marginBottom: "7px" }}>Package 1</div>
          <div className="itemsModal">
            <p className="itemModal"> Items - </p>
            {items.map((element, index) => {
              if (index != items.length - 1) {
                return <p className="itemModal">{element} ,</p>;
              } else {
                return <p className="itemModal">{element}</p>;
              }
            })}
          </div>
          <div>Total weight - {totalCostM}g</div>
          <div>Total price - ${totalWeightM}</div>
          <div>Courier price - ${courierCostM}</div>
        </div>
      );
    }
  };

  renderModal = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              this.setState({ openModal: false });
            }}
          >
            &times;
          </span>
          <div style={{ color: "black" }}>
            <p>This order has following packages:</p>
            {this.renderModalContents()}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div
        style={{
          padding: "20px",
          color: "white"
        }}
      >
        {!this.state.normalizeData && this.props.products != undefined
          ? this.normalizeData()
          : null}
        <div>{this.state.openModal ? this.renderModal() : null}</div>
        <div className="header">
          <div>
            <Button outline color="info">
              MSP HITECH Shopee
            </Button>
          </div>
          <div>
            <Button
              onClick={e => {
                this.handlePlaceOrder();
              }}
              className="checkout"
              color="success"
            >
              Place Order
            </Button>
          </div>
        </div>
        <Container fluid>
          <Row>{this.renderProducts()}</Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { products: state.shoppe.products, cart: state.shoppe.cart };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { getProduct, addToCart, deleteFromCart },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
