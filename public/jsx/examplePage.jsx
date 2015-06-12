var React = require('react');
var marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: true,
    sanitize: true,
    smartLists: true,
    smartypants: true
});
module.exports = React.createClass({
    componentDidUpdate: function () {
        this.props.data.initialize(document.getElementById('cube-container'))

    },
    componentDidMount: function () {
        this.props.data.initialize(document.getElementById('cube-container'))
    },
    componentWillUpdate: function () {
        this.props.data.exit(document.getElementById('cube-container'))
    },
    render: function () {

        return (
            <div className="examples-container">
                <h2>{this.props.data.title}</h2>
                <content>
                    <div className="explanation" dangerouslySetInnerHTML={{__html: marked(this.props.data.explanation)}}></div>
                    <div id="cube-container"></div>
                    <div className="bottomText" dangerouslySetInnerHTML={{__html: marked(this.props.data.bottomText)}}></div>

                </content>

            </div>
        )
    }
});
