var React = require('react');

var Menu = module.exports = React.createClass({
    render: function () {
        var titles = Object.keys(this.props.data).map(function (key) {
            var active = this.props.active === this.props.data[key].id;
            return <MenuItem active={active} goToExample={this.props.goToExample} title={this.props.data[key].menuTitle} themeKey={key}/>
        }.bind(this));
        return (
            <div className="menu">
            {titles}
            </div>
        )
    }
});


var MenuItem = React.createClass({
render: function () {
    var clsName = this.props.active ? 'active' : 'not-active';
    return (
        <div className={clsName} onClick={this.props.goToExample.bind(null, this.props.themeKey)}>- {this.props.title}</div>
    )
}
});