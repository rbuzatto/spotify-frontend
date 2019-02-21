import React from 'react'
import { connect } from 'react-redux'
import { setSearchType, setSearchField, getData } from '../actionCreators/index'

import { types } from '../constants/index'

const Form = ({handleChange, checkedValue, filter, handleSeachField, handleSubmit}) => {

    const passProps = () => ({ query: filter, type: checkedValue })

    return (
    <form action="" onSubmit={(e) => handleSubmit(e, passProps())}>
        <input type="text" onChange={handleSeachField} />
            <div className='search__group'>
                {
                    types.map((op, idx) => (
                        <div key={idx}>
                            <input type="radio" className='search__input' id={op} value={op} name="type" checked={op === checkedValue} onChange={handleChange} />
                            <label htmlFor={op} className='search__option' >{op}</label>
                        </div>
                    ))
                }
            </div>
        <button type="submit">Submit</button>
    </form>
    )
}

const mapStateToProps = ({filter}) => ({
    checkedValue: filter.type,
    filter: filter.name
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleChange : e => dispatch(setSearchType(e.target.value)),
    handleSeachField: e => dispatch(setSearchField(e.target.value)),
    handleSubmit:(e, query) => {
        e.preventDefault()
        dispatch(getData(query))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)