import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=" ;

class Info extends React.Component{

componentDidMount(){
return axios.get(queryURLBase);
}

displayArticles(){
	return axios.get(queryURLBase)
	.then(function(response){
    console.log(response);
  });
}

contructor(){
	super();
	this.state = { 
		term: "",
	}
  }

  // This function will respond to the user input
  handleChange(event){
    // Here we create syntax to capture any change in text to the query terms (pre-search).
    // See this Stack Overflow answer for more details:
    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(){
    // preventing the form from trying to submit itself
    event.preventDefault();
    // Set the parent to have the search term
    this.props.setTerm(this.state.term);

    // Clearing the input field after submitting
    this.setState({ term: "" });
  }


render(){
return (
	<div>
		<div className="row">
			<div className="col-md-12">
			<div className="jumbotron">
			<h1 className="title">BBC World News</h1>
			</div>
			</div>
		</div>

<div className="container">
		<div className="row">
		<div className="col-md-12">
		<form>
		<h3>Search Parameters</h3>
			<div className="form-group">
				<label>Search Term</label><br />
				<input type="text" className="form-control" placeholder="Search term"></input><br />
			
				<label>Number of Records to Retrieve:</label><br />
				<input type="text" className="form-control" placeholder="Records"></input><br />

				<label>Start Year (Optional):</label><br />
				<input type="text" className="form-control" placeholder="Start Year"></input><br />

				<label>End Year (Optional):</label><br />
				<input type="text" className="form-control" placeholder="End Year"></input><br />
			</div>
			 <button onClick={this.displayArticles} type="submit" className="btn btn-primary">{this.state.isEnabled ? 'on' : 'off'}Submit</button>
			 <button type="submit" className="btn btn-primary">Clear Search</button>
		</form>
		</div>
		</div>
		

		<div className="row">
			<div className="panel panel-default">
				<div className="panel-heading">
				Current World News
				</div>
				<div className="panel-body">

				</div>
			</div>
		</div>

		<div className="row">
			<div className="col-md-12 insert" id="articles">
			{}
			</div>
		</div>
	</div>
	</div>
	);
}
}

module.exports = Info;