import React, {Component} from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {

    state = {
        done: false,
        important: false
    }

    onClickLabel = () => {
        this.setState({
            done: true
        })
    }

    importantLabel = () => {
        this.setState({
            important: true
        })
    }

    render() {
        const {label} = this.props;

        let nameOfClass = "todo-list-item";
        const { done, important } = this.state;
        if (done) {
            nameOfClass += " done"
        }

        if (important) {
            nameOfClass += " important"
        }

        return (
            <span className={nameOfClass}>
            <span className="todo-list-item-label"
                  onClick={this.onClickLabel}>{label}</span>
            <button type={"button"}
                    className={"btn btn-outline-success btn-sm float-right"}
            onClick={this.importantLabel}>
                <i className="fa fa-exclamation"/></button>
            <button type="button"
                    className={"btn btn-outline-danger btn-sm float-right"}>
                <i className="fa fa-trash-o"/></button>
        </span>
        )
    }
};