import React from 'react';
import FilterArray from './FilterArray';

class FormFilter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allergens: [],
            caloriesMin: 0,
            caloriesMax: 1500,
            cost: 'all',
            difficulty: 'all',
            prepTimeMin: 0,
            prepTimeMax: 60,
            totalTimeMin: 0,
            totalTimeMax: 60,
            vegan: []
        }
        
    }

    

    handleCheckboxChange = (event) => {
        let x = [];
        let name = event.target.name;
        if(event.target.name === 'allergens'){
            x = this.state.allergens;
        }
        if(event.target.name === 'vegan'){
            x = this.state.vegan;
        }
        let index;

        if (event.target.checked) {
            // remove the value from the checked checkbox from the array
            index = x.indexOf(event.target.value);
            x.splice(index, 1);
          } else {
            // add the value of the unchecked checkbox to array
            x.push(event.target.value);
          }
        this.setState({ [name]: x });
    }    

    handleSelectChange = (event) => {
        if(event.target.id === 'difficulty'){
            this.setState({ difficulty: event.target.value });
        }
        if(event.target.id === 'cost'){
            this.setState({ cost: event.target.value });
        }
        //console.log(event.target.value);
    }

    handleRangeChange = (event) => {
        let id = event.target.id;
        let value = parseInt(event.target.value);
        this.setState({ [id]: value });

    }

    handleReset = () => {
        this.setState({
        allergens: [],
        caloriesMin: 0,
        caloriesMax: 1500,
        cost: 'all',
        difficulty: 'all',
        prepTimeMin: 0,
        prepTimeMax: 60,
        totalTimeMin: 0,
        totalTimeMax: 60,
        vegan: []});
        this.props.setIsFiltered(false);

    }

    handleSubmit = (event) =>{
        event.preventDefault();
        //console.log(this.props);
        this.props.setFilteredList(FilterArray(this.state, this.props));
        this.props.setIsFiltered(true);

    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div id='allergens'>
                    <input type='checkbox' name='allergens' defaultChecked onChange={this.handleCheckboxChange} value='egg'/>
                        <label>Egg</label>
                    <input type='checkbox' name='allergens' defaultChecked onChange={this.handleCheckboxChange} value='fish'/>
                        <label>Fish</label>
                    <input type='checkbox' name='allergens' defaultChecked onChange={this.handleCheckboxChange} value='milk'/>
                        <label>Milk</label>
                    <input type='checkbox' name='allergens' defaultChecked onChange={this.handleCheckboxChange} value='mustard'/>
                        <label>Mustard</label>
                    <input type='checkbox' name='allergens' defaultChecked onChange={this.handleCheckboxChange} value='peanuts'/>
                        <label>Peanuts</label>
                    <input type='checkbox' name='allergens' defaultChecked onChange={this.handleCheckboxChange} value='seafood'/>
                        <label>Seafood</label>
                    <input type='checkbox' name='allergens' defaultChecked onChange={this.handleCheckboxChange} value='sesame'/>
                        <label>Sesame</label>
                    <input type='checkbox' name='allergens' defaultChecked onChange={this.handleCheckboxChange} value='soy'/>
                        <label>Soy</label>
                    <input type='checkbox' name='allergens' defaultChecked onChange={this.handleCheckboxChange} value='sulphites'/>
                        <label>Sulphites</label>
                    <input type='checkbox' name='allergens' defaultChecked onChange={this.handleCheckboxChange} value='wheat'/>
                        <label>Wheat</label>
                </div>

                <label>Cost:</label>
                <select name='cost' id='cost' onChange={this.handleSelectChange}>
                    <option value='all'>All</option>
                    <option value='low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='high'>High</option>
                </select>

                <label>Difficulty:</label>
                <select name='difficulty' id='difficulty' onChange={this.handleSelectChange}>
                    <option value='all'>All</option>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select>

                <div id='vegan'>
                    <input type='checkbox' value='yes' name='vegan' defaultChecked onChange={this.handleCheckboxChange}/>
                        <label>Vegan</label>
                    <input type='checkbox' value='no' name='vegan' defaultChecked onChange={this.handleCheckboxChange}/>
                        <label>Not Vegan</label>
                </div>

                <div id='prepTime'>
                    <input type='range' id='prepTimeMin' defaultValue='0' min='0' max='60' onChange={this.handleRangeChange}/>
                        <label>Prep Time Minimum (in Minutes)</label>
                        <label>{this.state.prepTimeMin}</label>
                    <input type='range' id='prepTimeMax' defaultValue='60' min='0' max='60' onChange={this.handleRangeChange}/>
                        <label>Prep Time Maximum (in Minutes)</label>
                        <label>{this.state.prepTimeMax}</label>
                </div>

                <div id='totalTime'>
                    <input type='range' id='totalTimeMin' defaultValue='0' min='0' max='60' onChange={this.handleRangeChange}/>
                        <label>Total Time Minimum (in Minutes)</label>
                        <label>{this.state.totalTimeMin}</label>
                    <input type='range' id='totalTimeMax' defaultValue='60' min='0' max='60' onChange={this.handleRangeChange}/>
                        <label>Total Time Maximum (in Minutes)</label>
                        <label>{this.state.totalTimeMax}</label>
                </div>

                <div id='caloriesPerServing'>
                    <input type='range' id='caloriesMin' defaultValue='0' step='50' min='0' max='1500' onChange={this.handleRangeChange}/>
                        <label>Minimum Calories</label>
                        <label>{this.state.caloriesMin}</label>
                    <input type='range' id='caloriesMax' defaultValue='1500' step='50' min='0' max='1500' onChange={this.handleRangeChange}/>
                        <label>Maximum Calories</label>
                        <label>{this.state.caloriesMax}</label>
                </div>
                <input type='reset' onClick={this.handleReset}/>
                <input type='submit'></input>

            </form>
        )
    }
}

export default FormFilter;