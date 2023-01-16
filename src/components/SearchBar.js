import React from "react";
import SearchArray from "./SearchArray";

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            searchTerm: ''
        }
    }

    render(){
        return(
            <>
            <form onSubmit={ e => {
                e.preventDefault();
                this.props.setFilteredList([]);
                this.props.setFilteredList(SearchArray(this.props.recipeList, this.state.searchTerm));
                this.props.setIsFiltered(true);
                }}>
                <input
                  name="search"
                  type="text"
                  value={this.state.searchTerm}
                  onChange={e => this.setState({searchTerm: e.target.value})}
                  className="searchBar"
                  placeholder="Search for a recipe..."
                />
                <input className="searchBtn" type="submit" value="search"></input>
              </form>
              <button className="resetBtn" onClick={() => {this.props.setIsFiltered(false); this.setState({ searchTerm: '' });}}>reset search</button>
        </>
        )
    }
}

export default SearchBar;

