// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {imageCard} = props

  const {name, issuesCount, starsCount, avatarUrl, forksCount} = imageCard

  return (
    <li className="imageItemContainer">
      <img src={avatarUrl} alt={name} className="bgImage" />
      <div className="smallContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="samllImage"
        />
        <p>{`${starsCount} stars`}</p>
      </div>
      <div className="smallContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="samllImage"
        />
        <p>{`${forksCount} forks`}</p>
      </div>
      <div className="smallContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="samllImage"
        />
        <p>{`${issuesCount} open issues`}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
