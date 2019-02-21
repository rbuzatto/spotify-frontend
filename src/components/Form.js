import React from 'react'
import { connect } from 'react-redux'
import { setSearchType, setSearchField, getData } from '../actionCreators/index'

import { types } from '../constants/index'

const Form = ({handleChange, checkedValue, filter, handleSeachField, handleSubmit}) => {

    const passProps = () => ({ query: filter, type: checkedValue })

    return (
    <form action="" onSubmit={(e) => handleSubmit(e, passProps())}>
        <input type="text" onChange={handleSeachField} />
        {
            types.map((op, idx) => (
                <input key={idx} type="radio" id={op} value={op} name="type" checked={op === checkedValue} onChange={handleChange} />
            ))
        }
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