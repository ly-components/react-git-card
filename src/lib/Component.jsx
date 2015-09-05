import React from 'react';
import Icon from './Icon';

export default class Component extends React.Component {
  static propTypes = {
    user: React.PropTypes.string
  }
  static defaultProps = {
    user: ''
  }
  constructor() {
    super();
    this.state = {
      data: {}
    };
    this._fetchUserInfo = this._fetchUserInfo.bind(this);
  }
  componentDidMount() {
    this._fetchUserInfo(this.props.user)
  }
  componentWillReceiveProps(props) {
    if (props.user && props.user !== this.props.user)
      this._fetchUserInfo(props.user)
  }
  _fetchUserInfo(user) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/users/' + user);
    xhr.onreadystatechange = () => {
      let status;
      if (xhr.readyState === xhr.DONE) {
        status = xhr.status;
        if ((status >= 200 && status < 300) || status === 304 || status === 0) {
          this.setState({
            data: JSON.parse(xhr.response || xhr.responseText)
          });
        }
      }
    };
    xhr.send();
  }
  render() {
    var data = this.state.data;
		var user = this.props.user;
    return (
      <div className="react-git-card">
        <a href={data.html_url}>
					{
						data.avatar_url ? <img alt="avatar" className="react-git-card-avatar" src={data.avatar_url}></img> : <span className="react-git-card-avatar"></span>
					}
        </a>
        <h1 className="react-git-card-name">{data.name}</h1>
        <p className="react-git-card-desc">{data.login}</p>
        <div className="react-git-card-social">
          <a className="react-git-card-item followers" href={`https://github.com/${user}/followers`}>
            <span className="react-git-card-icon">
            	<Icon type="followers" />
            </span>
            {data.followers}
          </a>
          <a className="react-git-card-item repos" href={`https://github.com/${user}?tab=repositories`}>
						<span className="react-git-card-icon">
            	<Icon type="repos" />
            </span>
						{data.public_repos}
					</a>
          <a className="react-git-card-item following" href={`https://github.com/${user}/following`}>
						<span className="react-git-card-icon">
            	<Icon type="following" />
            </span>
						{data.following}
					</a>
        </div>
      </div>
    );
  }
}
