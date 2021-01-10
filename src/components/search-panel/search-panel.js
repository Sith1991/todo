import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    onSearchChange = (e) => {
        this.props.termSetup(e.target.value)
    }

    render () {
        return (
            <div className={'search-panel'}>
                <input type={'text'}
                       className={'form-control search-input'}
                       placeholder={'search'}
                       onChange={this.onSearchChange}
                />
            </div>
        )
    }
};
