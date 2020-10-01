import React from 'react'
import { Component } from 'react'
import { fetchRepos } from '../api'

export default class Popular extends Component {
  constructor() {
    super()

    this.state = {
      selectedCohort: '',
      // repos initially null. isLoading method will display a "loading screen text" while
      // we wait for fetch request.
      repos: null,
    }

    this.updateCohortColor = this.updateCohortColor.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  // when you refresh page or enter page for first time, we get blank loading screen
  // b/c when component first mounts we are not fetching anything. The fix:
  // componentDidMount() {
  //   this.updateCohortColor(this.state.selectedCohort)
  // }

  //changes button color when when cohort button is clicked
  updateCohortColor(selectedCohort) {
    this.setState({
      selectedCohort,
      repos: null,
    })
    fetchRepos()
      .then((repos) =>
        // console.log(data)
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
    const cohortsList = ['Cohort 20', 'Cohort 21']
    const { repos } = this.state
    return (
      <div>
        <ul className="flex-center">
          {cohortsList.map((cohort) => (
            <li key={cohort}>
              <button
                className="btn-clear nav-link"
                style={
                  cohort === this.state.selectedCohort
                    ? { color: 'rgb(30, 215, 96)' }
                    : null
                }
                onClick={() => this.updateCohortColor(cohort)}
              >
                {cohort}
              </button>
            </li>
          ))}
        </ul>

        <pre> {JSON.stringify(repos, null, 2)}</pre>
      </div>
    )
  }
}

// {/* {this.isLoading() && <p>Loading...may take a few seconds</p>} */}
