import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment/moment'
import { v4 } from 'uuid'
import { PRIORITY } from '../../constants'

const initialState = {
    selectionSection: null,
    selectedTask: null,
    sections: [
        {
            label: 'Todo',
            id: "1"
        },
        {
            label: 'Doing',
            id: "2"
        },
        {
            label: 'Done',
            id: "3"
        }
    ],
    tasks: [
        {
            section: "1",
            name: "Todo 1",
            id: v4(),
            assignee: "Person 1",
            dueDate: moment(),
            priority: PRIORITY.MEDIUM,
            isDone: true
        },
        {
            section: "1",
            name: "Todo 2",
            id: v4(),
            assignee: "Person 1",
            dueDate: moment(),
            priority: PRIORITY.LOW,
            isDone: false
        },
        {
            section: "2",
            name: "Todo 3",
            id: v4(),
            assignee: "Person 1",
            dueDate: moment(),
            priority: PRIORITY.LOW,
            isDone: false
        },
        {
            section: "3",
            name: "Todo 4",
            id: v4(),
            assignee: "Person 1",
            dueDate: moment(),
            priority: PRIORITY.LOW,
            isDone: false
        }
    ]
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks = [...state.tasks, { ...action.payload, id: v4() }]
        },
        addSection: (state, action) => {
            state.sections = [...state.sections, { ...action.payload, id: String(state.sections.length + 1) }]
        },
        setSelectionSection: (state, action) => {
            state.selectionSection = action.payload
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload
        },
        toggleTaskStatus: (state, action) => {
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload) {
                    task.isDone = !task.isDone
                }
                return task
            })
        }

    },
})


export const { addTask, setSelectionSection, toggleTaskStatus, setSelectedTask , addSection} = taskSlice.actions

export default taskSlice.reducer