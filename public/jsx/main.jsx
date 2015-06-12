var React = require('react');
var Menu = require('./menu.jsx');
var Examples = require('./examplePage.jsx');
var examplesData = require('../javascripts/examples');

require('../stylesheets/sass/examplePage.scss');

var PageWrap = React.createClass({
    getInitialState: function () {
        return {displayExample: this.props.data['welcome']}
    },
    goToExample: function (key) {
        console.log('go to ', key);
      this.setState({displayExample: this.props.data[key]})
    },
    render: function () {
        return (
            <div className="components-wrap">
                <Menu goToExample={this.goToExample} data={this.props.data} active={this.state.displayExample.id}/>
                <Examples data={this.state.displayExample}/>
            </div>

        )
    }
});

React.render(<PageWrap data={examplesData}/>, document.getElementById('react-container'));