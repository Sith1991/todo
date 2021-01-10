import React, {Component} from 'react';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import './app.css';


export default class App extends Component {

    maxId = 100;

    state = {
        todoData:
            [
                this.creatItemState('Drink Coffee'),
                this.creatItemState('Make Awesome App'),
                this.creatItemState('Have a lunch'),
            ],
        term: '',
        filter: 'all',
    }

    creatItemState (label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newData = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ]
            return {
                todoData: newData
            }
        })
    }

    addItem = (text) => {
        const newItem = this.creatItemState(text);
        this.setState(({todoData}) => {
            const newArr = [...todoData, newItem];
            return {
                todoData: newArr
            }
        })
    }

    toggleProperty = (arr, id, propName) => {
            const idx = arr.findIndex((el) => el.id === id);
            const oldItm = arr[idx];
            const newItm = {...oldItm, [propName]: !oldItm[propName]};
        return [
            ...arr.slice(0, idx),
            newItm,
            ...arr.slice(idx + 1)
        ]
    }

    onToggleDone = (id) => {
    this.setState( ({todoData}) => {
        return {
            todoData: this.toggleProperty(todoData, id, 'done')
        }
    })
    }

    onToggleImportant = (id) => {
        this.setState( ({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }

    searchItems = (arr, term) => {
        if (term.length === 0) {
            return arr;
        }

        const findedItems = arr.filter( (el) =>
        el.label.toLowerCase().indexOf(term.toLowerCase()) > -1 )
        return findedItems;
    }

    termSetup = (term) => {
        this.setState({
            term
    })
    }

    onFilterChanged = (filter) => {
        this.setState({
            filter
        })
    }

    filteredItems = (arr, filter) => {
        switch (filter) {
            case 'all':
                return arr;
            case 'active':
                return arr.filter( (el) => !el.done );
            case 'done':
                return arr.filter( (el) => el.done );
            default:
                return arr;
        }
    }

    render() {

        const { todoData, term, filter } = this.state;

        const visibleItems = this.filteredItems(this.searchItems(todoData, term), filter);

        const doneCount = todoData.filter( (el) => el.done).length;

        const toDoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={toDoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel termSetup={this.termSetup} />
                    <ItemStatusFilter filter={filter}
                        onFilterChanged={this.onFilterChanged} />
                </div>
                <TodoList todos={visibleItems}
                          onDeleted={this.deleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}/>
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        )
    }
};