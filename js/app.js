var React = require('react');

var Test = React.createClass({
  handleChange: function(event) {
    console.log('handleChange');
    var v = event.target.value;
    this.setState({date: v});
    var params = getRoute();
    params['date'] = v;
    $.uriAnchor.setAnchor(params);
  },
  componentWillReceiveProps: function(nextProps) {
    console.log('componentWillReceiveProps');
    if (nextProps.route.date !== this.props.route.date) {
      this.props.selectChange(nextProps.route.date);
      this.setState({date: nextProps.route.date});
    }
  },
  getInitialState: function() {
      return {date: this.props.route.date};
  },
  render: function() {
    return (
      <select value={this.state.date} onChange={this.handleChange}>
         <option value='2015-07-26'>2015-07-26</option>
         <option value='2015-07-27'>2015-07-27</option>
         <option value='2015-07-28'>2015-07-28</option>
      </select>
    );
  }
});

function getRoute() {
  var route = {};
  window.location.hash.substr(2).split('&').reduce(function(init, cur) {
    var t = cur.split('=');
    route[t[0]]=t[1];
    return route;
  }, route);
  return route;
}

function render() {
  selectChange = function(v) {
    console.log(v + 'is selected, in selectChange');
  };
  var params = getRoute();
  console.log('render');
  React.render(<Test route={params} selectChange={this.selectChange} />, document.getElementById('test'));
}

window.addEventListener('hashchange', render);
render();
