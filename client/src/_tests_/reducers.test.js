import { reducer } from '../utils/reducers';

//import actions
import {
    UPDATE_PRODUCTS,
    UPDATE_CURRENT_CATEGORY,
    UPDATE_CATEGORIES
} from '../utils/actions';

//this is a sample of what the global state looks like
const firstState = {
    products: [],
    categories: [{ name: 'Food' }],
    currentCategory: '1',
};

test('UPDATE_PRODUCTS', () => {
    let newState = reducer(firstState, {
        type: UPDATE_PRODUCTS,
        products: [{}, {}]
    });

    expect(newState.products.length).toBe(2);
    expect(firstState.products.length).toBe(0);
});

test('UPDATE_CATEGORIES', () => {
    let newState = reducer(firstState, {
        type: UPDATE_CATEGORIES,
        categories: [{}, {}]
    });
    
    expect(newState.categories.length).toBe(2);
    expect(firstState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: '2'
    });

    expect(newState.currentCategory).toBe('2');
    expect(firstState.currentCategory).toBe('1');
})