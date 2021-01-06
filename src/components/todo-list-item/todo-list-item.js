import React, {Component} from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {

    state = {
        done: false,
    }

    onClickLabel = () => {
        this.setState({
            done: true
        })
    }

    render() {
        const {label, important = false} = this.props;

        const style = {
            color: important ? 'tomato' : 'black',
            fontWeight: important ? 'bold' : 'normal'
        }

        let nameOfClass = "todo-list-item";
        const { done } = this.state;
        if (done) {
            nameOfClass += " done"
        }

        return (
            <span className={nameOfClass}>
            <span className="todo-list-item-label"
                  style={style}
                  onClick={this.onClickLabel}>{label}</span>
            <button type={"button"}
                    className={"btn btn-outline-success btn-sm float-right"}>
                <i className="fa fa-exclamation"/></button>
            <button type="button"
                    className={"btn btn-outline-danger btn-sm float-right"}>
                <i className="fa fa-trash-o"/></button>
        </span>
        )
    }
};