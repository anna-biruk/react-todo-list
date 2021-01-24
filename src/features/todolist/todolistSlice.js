import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {uuid} from 'uuidv4';


export const getTodolistItems = createAsyncThunk(
    'todolist/getTodolistItems',
    async ({limit = 5, page}, thunkAPI) => {
        const {todolist: {searchString}} = thunkAPI.getState();
        const response = await fetch(`http://localhost:8080/items?q=${searchString}&_limit=${limit}&_page=${page}`);
        const totalCount = response.headers.get('X-Total-Count');
        const items = await response.json();
        return {items, totalCount}
    }
);

export const createTodolistItems = createAsyncThunk(
    'todolist/createTodolistItems',
    async () => {
        let newId = uuid();
        const response = await fetch(`http://localhost:8080/items/`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            body: (JSON.stringify({
                id: newId,
                name: '',
                isLoading: false,
                isEditing: true,
                isChecked: false,
                createdAt: new Date().toISOString(),
                importance: 2
            })) // body data type must match "Content-Type" header
        });
        const items = await response.json();
        return items;
    }
);
export const updateTodolistItems = createAsyncThunk(
    'todolist/updateTodolistItems',
    async (data) => {
        const response = await fetch(`http://localhost:8080/items/${data.id}`, {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const items = await response.json();
        return items;
    }
);

export const deleteTodolistItem = createAsyncThunk(
    'todolist/deleteTodolistItem',
    async (data) => {
        const response = await fetch(`http://localhost:8080/items/${data.id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        await response.json();
        return data;
    }
);

export const getCheckedItems = createAsyncThunk(
    'todolist/getCheckedItems',
    async (data, thunkAPI) => {
        const {todolist: {searchString}} = thunkAPI.getState();
        const response = await fetch(`http://localhost:8080/items?q=${searchString}&isChecked=true&_limit=0`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const checkedCount = response.headers.get('X-Total-Count');
        return {checkedCount};

    }
);


export const todolistSlice = createSlice({
    name: 'todolist',
    initialState: {
        items: [],
        value: 0,
        searchString: '',
        isEditing: false,
        isLoading: false,
        checkedCount: null,
        totalCount: null,
    },
    reducers: {
        setSearchString: (state, action) => {
            state.searchString = action.payload.searchString;
        },
        toggleItemEditing: (state, action) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload) {
                    item.isEditing = !item.isEditing
                }
                return item;
            })
        },
        handleToggle: (state, action) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload) {
                    item.isChecked = !item.isChecked;
                }
                return item;
            })
        },
    },
    extraReducers: {
        [getTodolistItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getTodolistItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.totalCount = action.payload.totalCount;
            state.items = action.payload.items;
        },
        [getTodolistItems.rejected]: (state) => {
            state.isLoading = true;
        },
        [createTodolistItems.fulfilled]: (state, action) => {
            state.items.push(action.payload);
        },
        [updateTodolistItems.fulfilled]: (state, action) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload.id) {
                    item.name = action.payload.name;
                    item.isChecked = action.payload.isChecked;
                    item.importance = action.payload.importance;
                }
                return item;
            });
        },
        [deleteTodolistItem.fulfilled]: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id
            )
        },
        [getCheckedItems.fulfilled]: (state, action) => {
            state.checkedCount = action.payload.checkedCount;
        }
    }
});

export const {setSearchString, toggleItemEditing, handleToggle} = todolistSlice.actions;
export const selectItems = state => state.todolist.items;

export const selectPageCount = state => {
    if (state.todolist.totalCount / 4 === 0) {
        return state.todolist.totalCount / 4;
    }
    return Number.parseInt(state.todolist.totalCount / 4 + 1)
};
export const selectCheckedCount = (state) => {
    return state.todolist.checkedCount;
};

export const selectUncompletedCount = (state) => {
    if (!state.todolist.totalCount) {
        return null;
    }
    return state.todolist.totalCount - state.todolist.checkedCount;
};
export const selectOverallCount = (state) => {
    return state.todolist.totalCount;
};


export default todolistSlice.reducer