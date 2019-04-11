import React, { Component } from "react";
import axios from "axios";
import { addmenu } from "../userfunction";
import Swal from "sweetalert2";
import MenuSearch from "./MenuSearch";
import Nomenu from "./Nomenu";
import Spinner from "../common/Spinner";
import './restaurantMenu.css'
import {
  url
} from "../../config/constants"
import '../../App.css'


import {
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  RedditIcon,
  LinkedinIcon
} from 'react-share';

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  RedditShareButton,
  LinkedinShareButton
} from 'react-share'


export default class RestaurantMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qty: 1,
      restaurant: "",
      isLoaded: false,
      order: "",
      searchfield: ""
    };
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .post(url + '/OMF/restaurant', {
        id: params.details
      })
      .then(res => {
        this.setState({
          restaurant: res.data.body.data,
          isLoaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  onclick = e => {
    this.props.history.push("/cart");
  };

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { restaurant, searchfield } = this.state;
    const restaurantDetails = restaurant.resMenu;
    const shareUrl = window.location.href;
    if (!this.state.isLoaded) {
      return <div><Spinner /></div>
    } else {
      const filteredresitem = restaurantDetails.filter(eachitem => {
        return eachitem.resItem
          .toLowerCase()
          .includes(searchfield.toLowerCase());
      });

      if (filteredresitem.length != 0) {
        return (
          <div className="resData">
            <div id="jumbo" className="jumbotron">
              <h1 className="mt-5">{restaurant.resName}</h1>

              <h3 className="mt-3">Phone No: {restaurant.resContact}</h3>

              <div style={{ marginTop: 20 + `px` }}>
                <TwitterShareButton
                  style={{ border: `none` }}
                  url={shareUrl}
                  className="button shareButton"
                >
                  <TwitterIcon
                    size={45}
                    round={false} />
                </TwitterShareButton>
              </div>

              <div style={{ marginTop: 20 + `px` }}>
                <FacebookShareButton
                  style={{ border: `none` }}
                  id="fb_button"
                  url={shareUrl}
                  className="button shareButton"
                >
                  <FacebookIcon
                    size={45}
                    round={false} />
                </FacebookShareButton>

              </div>
              < div style={{ marginTop: 20 + `px` }}>
                <RedditShareButton
                  style={{ border: `none` }}
                  url={shareUrl}
                  className="button shareButton"
                >
                  <RedditIcon
                    size={45}
                    round={false} />
                </RedditShareButton>
              </div>

              < div style={{ marginTop: 20 + `px` }}>
                <LinkedinShareButton
                  style={{ border: `none` }}
                  url={shareUrl}
                  className="button shareButton"
                >
                  <LinkedinIcon
                    size={45}
                    round={false} />
                </LinkedinShareButton>
              </div>


              <div className="iconStyle">

                <a href="#section2" className="mt-3"><i id="section1" class="fa-3x fa fa-angle-double-down text-white"></i></a>
              </div>
            </div>
            <div className="row" id="row1">

              <div className="col-sm-4 col-md col-12 imgg2">
              </div>
              <div className="col-sm-4 col-md col-12 imgg3">
              </div>
              <div className="col-sm-4 col-md col-12 imgg4">
              </div>
              {/* <div className="col-sm-3 imgg5">
            </div> */}

            </div>
            <div id="section2">
              <MenuSearch menuChange={this.onSearchChange} />
            </div>
            <h1>
              {filteredresitem.map((eachitem, i) => {
                return (
                  <div id="cartOrder" >

                    <div className="card cardmenu col-sm-6 col-md-6 col-12" id={i}>
                      <h2 className="menu_items_name">{eachitem.resItem}</h2>
                      <h4 className="menu_items_price">
                        Price: {eachitem.resPrice}
                      </h4>
                      {eachitem.resqty}{" "}
                      <i
                        class="fas fa-shopping-cart"
                        id="add-to-cart"
                        onClick={e => {
                          var data = localStorage.getItem('email')
                          const newUser = {
                            userEmail: data,
                            resName: restaurant.resName,
                            resPrice: eachitem.resPrice,
                            resItem: eachitem.resItem,
                            resqty: 1
                          };

                          addmenu(newUser);
                          Swal.fire({
                            type: "success",
                            title: "Yay!",
                            text: "Item added to cart!"
                          });
                        }}
                      >
                        Add to Cart
                    </i>
                      <br />
                    </div>
                  </div>
                );
              })}
            </h1>
            <button id="viewCartBtn" className="button" onClick={this.onclick}>
              Go To Cart
            </button>
          </div >
        );
      }
      else {
        return (
          // <div>
          //   <div>
          //     <h1 className="mt-5">{restaurant.resName}</h1>
          //     <h3 className="mt-3">Phone No: {restaurant.resContact}</h3>
          //   </div>
          //   <MenuSearch menuChange={this.onSearchChange} />
          //   <Nomenu />
          // </div>

          <div className="resData">
            <div id="jumbo" className="jumbotron">
              <h1 className="mt-5">{restaurant.resName}</h1>
              <h3 className="mt-3">Phone No: {restaurant.resContact}</h3>
              <div className="iconStyle">

                <a href="#section2" className="mt-3"><i id="section1" class="fa-5x fa fa-angle-double-down"></i></a>
              </div>
            </div>


            <div className="row" id="row1">

              <div className="col-sm-4 col-md col-12 imgg2">
              </div>
              <div className="col-sm-4 col-md col-12 imgg3">
              </div>
              <div className="col-sm-4 col-md col-12 imgg4">
              </div>
              {/* <div className="col-sm-3 imgg5">
  </div> */}

            </div>


            <div id="section2">
              <MenuSearch menuChange={this.onSearchChange} />
            </div>


            {/* <h1>
    {filteredresitem.map((eachitem, i) => {
      return (
        <div  id="cartOrder" >
            
        <div className="card cardmenu col-sm-6 col-md-6 col-12" id={i}>
          <h2 className="menu_items_name">{eachitem.resItem}</h2>
          <h4 className="menu_items_price">
            Price: {eachitem.resPrice}
          </h4>
          {eachitem.resqty}{" "}
          <i
            class="fas fa-shopping-cart"
            id="add-to-cart"
            onClick={e => {
              const newUser = {
                resName: restaurant.resName,
                resPrice: eachitem.resPrice,
                resItem: eachitem.resItem,
                resqty: 1
              };

              addmenu(newUser);
              Swal.fire({
                type: "success",
                title: "Yay!",
                text: "Item added to cart!"
              });
            }}
          >
          Add to Cart
          </i>
          <br />
        </div>
            </div>
      );
    })}
  </h1>   */}

            <Nomenu />

          </div>
        );

      }
    }
  }
}
