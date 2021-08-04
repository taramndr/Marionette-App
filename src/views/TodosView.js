import { View, CollectionView } from 'backbone.marionette';
import { Model, Collection } from 'backbone';
import _ from 'underscore';
import TodoView from './TodoView';
import TodoModel from '../models/todo';

const TodoCollection = Collection.extend({
    url: 'http://localhost:3000/todos',
    model: TodoModel,
});

var todos;

var initializeTodos = function () {
    /* todos = new TodoCollection([
      { id: 1, title: 'My Todo 1', info: 'Todo Info' }
     ]);*/
            todos = new TodoCollection();
        todos.fetch();
    };

    var API = {
        getTodoEntities() {
            if (todos === undefined) {
                initializeTodos();
            }
            todos.fetch();
            return todos;
        }
    }

const TodosView = CollectionView.extend({
        tagName: 'ul',
        childView: TodoView,
        collection: API.getTodoEntities(),
});

export default TodosView;
