import React from 'react'
import { Component } from 'react'
import { fetchRepos } from '../api'
import { fetchCodesmith } from '../codesmithapi'

export default class Popular extends Component {
  constructor() {
    super()

    this.state = {
      selectedLanguage: '',
      // repos initially null. isLoading method will display a "loading screen text" while
      // we wait for fetch request.
      repos: null,
    }

    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  // when you refresh the page or user enters site for first time, we still get the loading screen message.
  // We don't want to fetch any data when the component first mounts, it should only display loading message
  // when user clicks on one of the buttons to fetch data.
  //  The fix:
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  //changes button color when when Javascript/Java button is clicked
  updateLanguage(selectedLanguage) {
    if (selectedLanguage === 'Codesmith Repos: Hall of Fame') {
      this.setState({
        selectedLanguage,
        repos: null,
      })
      fetchCodesmith()
        .then((repos) =>
          this.setState({
            repos,
            error: null,
          })
        )
        .catch(() => {
          console.warn('Error fetching our repos with fetchRepos method', error)
        })
    } else {
      this.setState({
        selectedLanguage,
        repos: null,
      })
      fetchRepos(selectedLanguage)
        .then((repos) =>
          this.setState({
            repos,
            error: null,
          })
        )
        .catch(() => {
          console.warn('Error fetching our repos with fetchRepos method', error)
        })
    }
  }

  isLoading() {
    return this.state.repos === null
  }
  render() {
    const languageList = ['Javascript', 'Java', 'Codesmith Repos: Hall of Fame']
    const { repos } = this.state

    // careful ternary set to empty array b/c when page renders fetch has not gotten back repos data yet.
    const cards = repos
      ? repos.map((repo) => (
          <div>
            <img src={repo.owner.avatar_url} />
            <p>{repo.name}</p>
            <p>
              <span>stars: {repo.stargazers_count}⭐️ </span>
              <p></p>
              <span>forks: {repo.forks_count}🍴</span>
            </p>
          </div>
        ))
      : []

    return (
      <div>
        <ul className="flex-center">
          {languageList.map((language) => (
            <li key={language}>
              <button
                className="btn-clear nav-link"
                style={
                  language === this.state.selectedLanguage
                    ? { color: 'rgb(30, 215, 96)' }
                    : null
                }
                onClick={() => this.updateLanguage(language)}
              >
                {language}
              </button>
            </li>
          ))}
        </ul>
        {this.isLoading() && <p>Loading...this will take a few seconds</p>}
        {repos && cards}
      </div>
    )
  }
}

// {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
