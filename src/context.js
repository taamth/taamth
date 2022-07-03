import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            }
        default:
            return state;
    }
}
export class Provider extends Component {
    state = {
        contacts: [
            {
                id: '1',
                name: "test1",
                email: "test1@gamil.com",
                phone: "+84 333 5555"
            },
            {
                id: '2',
                name: "test2",
                email: "test2@gamil.com",
                phone: "+84 444 5555"
            },
            {
                id: '3',
                name: "test3",
                email: "test3@gamil.com",
                phone: "+84 555 5555"
            },
        ],
        dispatch: action => {
            this.setState(state => reducer(state, action))
        }
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;