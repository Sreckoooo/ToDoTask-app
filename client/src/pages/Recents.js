import React, { useState } from "react";
import "../styles/Tasks.css";
import { useQueryClient, useMutation, useQuery } from "react-query";
import axios from "axios";
import { EditTodoForm } from "../helpers/EditTodoForm";


const Recents = () => {
    const queryClient = useQueryClient()
    const [editId, setEditid] = useState("");


    const updatetask = useMutation({
        mutationFn: (Update) =>
            axios.put('/api/task/' + Update.id, Update),
        onSuccess: () => {
            setEditid("")
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    })


    const { isLoading, data } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            return axios.get('/api/task')
        }
    })


    return (
        <div className="tasks-container">
            <h1 className="tasks-title">Recents</h1>
            {!isLoading && data && <>

                <ul className="tasks-list">
                    {data.data.data.map((todo) => {
                        if (todo._id === editId) {
                            return <EditTodoForm key={todo._id} task={todo} onCancel={() => setEditid("")} onSubmit={(taskText, taskDate) => {
                                updatetask.mutate({ ...todo, id: todo._id, task: taskText,  dueDate: taskDate })

                            }} />
                        }
                        return <li key={todo._id} className="tasks-item">
                            <div>{todo.task}</div>
                            <div className="due-date">{new Date(todo.dueDate).toLocaleDateString()}</div>
                            
                        </li>
                    }
                    )}
                </ul>
            </>}
        </div>

    );
};


export default Recents;

