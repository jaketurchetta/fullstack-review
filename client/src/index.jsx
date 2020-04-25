import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos:[]
    }

  }

  componentDidMount() {
    $.ajax({
      url: '/repos',
      method: 'GET',
      contentType: 'application/json',
      success: (data) => {
        this.setState({
          repos: data
        })
      },
      error: (err) => {
        console.log('Failed GET request! Error: ', err)
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    let obj = {username: term};
    // TODO
    $.ajax({
      url: '/repos',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(obj),
      success: (data) => {
        $.ajax({
          url: '/repos',
          method: 'GET',
          contentType: 'application/json',
          data: JSON.stringify(obj),
          success: (data) => {
            this.setState({
              repos: data
            })
          },
          error: (err) => {
            console.log('Failed GET request! Error: ', err)
          }
        })
      },
      error: (err) => {
        console.log('Failed POST request! Error: ', err)
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));