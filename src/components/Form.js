import React from 'react'
import { connect } from 'react-redux'
import { setSearchType, setSearchField } from '../actionCreators/index'

import { types } from '../constants/index'

const Form = ({handleChange, checkedValue, handleSeachField}) => {

    return (
    <form action="">
        <input type="text" onChange={handleSeachField} />
        {
            types.map((op, idx) => (
                <input key={idx} type="radio" id={op} value={op} name="type" checked={op === checkedValue} onChange={handleChange} />
            ))
        }
    </form>
    )
}

const mapStateToProps = state => ({
    checkedValue: state.type,
    filter: state.name
})

const mapDispatchToProps = dispatch => ({
    handleChange : e => dispatch(setSearchType(e.target.value)),
    handleSeachField: e => dispatch(setSearchField(e.target.value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)