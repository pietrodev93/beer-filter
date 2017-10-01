import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      data: [],
      filterData: []
    };
    this.changeAbv = this.changeAbv.bind(this);
    this.changeIbu = this.changeIbu.bind(this);
  }
  componentWillMount() {
    $.getJSON(
      "https://api.punkapi.com/v2/beers",
      function(result) {
        console.log("json received");
        this.setState({ data: result });
      }.bind(this)
    );
  }
  changeAbv(e) {
    this.setState({
      searchString: e.target.value,
      data: this.filterAbv(e.target.value)
    });
  }
  changeIbu(e) {
    this.setState({
      searchString: e.target.value,
      data: this.filterIbu(e.target.value)
    });
  }
  filterIbu(val) {
    if (val) {
      return this.state.data.filter(item => item.ibu == val);
    }
    return this.state.data;
  }
  filterAbv(val) {
    if (val) {
      return this.state.data.filter(item => item.abv == val);
    }
    return this.state.data;
  }

  render() {
    let listAbv = this.state.data.map(beer =>
      <option value={beer.abv}>
        {beer.abv}
      </option>
    );
    let listIbu = this.state.data.map(beer =>
      <option value={beer.ibu}>
        {beer.ibu}
      </option>
    );

    const styleList = {
      listStyle: "none"
    };
    const name = {
      textAlign: "left",
      display: "block",
      fontSize: 32
    };

    const abv = {
      display: "inline-block"
    };
    return (
      <div className="page-header">
        <h1>
          {this.props.text}
        </h1>
        <p>Filter ABV or IBU</p>
        <select onChange={this.changeAbv}>
          {listAbv}
        </select>
        <select onChange={this.changeIbu}>
          {listIbu}
        </select>
        <div className="container">
          <div className="row">
            <ul className="col-lg-12">
              {this.state.data.map(beer =>
                <li style={styleList}>
                  <h1 style={name}>
                    Nome: {beer.name}
                  </h1>
                  <br />
                  <p className="col-lg-12">
                    {beer.description}
                  </p>
                  <p style={abv} className="col-sm-6">
                    ABV: {beer.abv}
                  </p>
                  <p style={abv} className="col-sm-6">
                    IBU: {beer.ibu}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
