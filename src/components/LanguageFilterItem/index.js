// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, changeLanguage, isActive} = props
  const {id, language} = eachLanguage

  const getLanguage = () => {
    changeLanguage(id)
  }
  const btnclassName = isActive ? 'btn1 btn' : 'btn'
  return (
    <li>
      <button type="button" className={btnclassName} onClick={getLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
