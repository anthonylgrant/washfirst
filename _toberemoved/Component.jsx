var React = require('react');
module.exports = React.createClass({
  _handleClick: function() {
    alert();
  },
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel='stylesheet' href='/style.css' />
        </head>
        <body>
          <h1>{this.props.heading}</h1>
          <button onClick={this._handleClick}>Click Me</button>
          <script dangerouslySetInnerHTML={{
            __html: 'window.PROPS=' + JSON.stringify(this.props)
          }} />
          <script src='/bundle.js' />
        </body>
      </html>

    )
  }
});
