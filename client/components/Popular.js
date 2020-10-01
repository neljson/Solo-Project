import React from 'react'
import { Component } from 'react'
import { fetchRepos } from '../api'

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

  isLoading() {
    return this.state.repos === null
  }
  render() {
    const languageList = ['Javascript', 'Java']
    const { repos } = this.state
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
        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </div>
    )
  }
}
