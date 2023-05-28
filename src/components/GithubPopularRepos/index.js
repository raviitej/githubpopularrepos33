import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusViewList = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
// Write your code here
class GithubPopularRepos extends Component {
  state = {
    filter: languageFiltersData[0].id,
    repositoryList: [],
    statusView: statusViewList.initial,
  }

  componentDidMount() {
    this.gettingResults()
  }

  gettingResults = async () => {
    const {filter} = this.state
    this.setState({statusView: statusViewList.loading})
    const url = `https://apis.ccbp.in/popular-repos?language=${filter}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const filterData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
        forksCount: each.forks_count,
        avatarUrl: each.avatar_url,
      }))
      console.log(filterData)
      this.setState({
        repositoryList: filterData,
        statusView: statusViewList.success,
      })
    } else {
      this.setState({statusView: statusViewList.failure})
    }
  }

  changeLanguage = id => {
    this.setState({filter: id}, this.gettingResults)
  }

  loadingData = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  failureData = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failureImage"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  repositoryData = () => {
    const {repositoryList} = this.state
    return (
      <ul className="language-container">
        {repositoryList.map(card => (
          <RepositoryItem imageCard={card} key={card.id} />
        ))}
      </ul>
    )
  }

  finalReturnList = () => {
    const {statusView} = this.state
    switch (statusView) {
      case statusViewList.success:
        return this.repositoryData()
      case statusViewList.failure:
        return this.failureData()
      case statusViewList.loading:
        return this.loadingData()
      default:
        return null
    }
  }

  render() {
    const {filter} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        <ul className="language-container">
          {languageFiltersData.map(eachOne => (
            <LanguageFilterItem
              eachLanguage={eachOne}
              isActive={filter === eachOne.id}
              key={eachOne.id}
              changeLanguage={this.changeLanguage}
            />
          ))}
        </ul>
        {this.finalReturnList()}
      </div>
    )
  }
}

export default GithubPopularRepos
