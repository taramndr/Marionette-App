import { View, CollectionView } from 'backbone.marionette';
import { Model, Collection } from 'backbone';
import _ from 'underscore';

const TodoModel = Model.extend({});

const TodoCollection = Collection.extend({});

const TodoView = View.extend({
    tagName: 'li',
    template: _.template('<p><%= todo%></p>'),

    templateContext() {
        return {
            todo: this.model.get("name")
        }
    },
});

const todoCollection = new TodoCollection([
    new TodoModel({ id: 1, name: 'My Todo 1' }),
    new TodoModel({ id: 2, name: 'My Todo 2' }),
]);

export const TodosView = CollectionView.extend({
    tagName: 'ul',
    childView: TodoView,
    collection: todoCollection
});

